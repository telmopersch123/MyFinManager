export const dynamic = "force-dynamic";

import { MonthlyData } from "@/app/_interfaces/interface";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      capitalinicial,
      valorMensal,
      taxajuros,
      taxajurosUnidade,
      tempo,
      tempoUnidade,
      valorInvestido,
      totalganhoemjuros,
      valortotalfinal,
      valoresMensais,
    } = await request.json();
    if (
      !capitalinicial ||
      !taxajuros ||
      !taxajurosUnidade ||
      !tempo ||
      !tempoUnidade ||
      !valorInvestido ||
      !totalganhoemjuros ||
      !valortotalfinal
    ) {
      return NextResponse.json(
        { error: "Fórmula e resultado são obrigatórios" },
        { status: 400 },
      );
    }

    if (
      (valoresMensais && !Array.isArray(valoresMensais)) ||
      valoresMensais.some(
        (data: MonthlyData) =>
          typeof data.mes !== "string" ||
          typeof data.jurosMensal !== "number" ||
          typeof data.totalInvestido !== "number" ||
          typeof data.totalJuros !== "number" ||
          typeof data.valorAcumulado !== "number",
      )
    ) {
      return NextResponse.json(
        {
          error:
            "monthlyData deve ser um array de objetos com month (string), interest, totalInvested, totalInterest e accumulated (números)",
        },
        { status: 400 },
      );
    }

    // Salvar cálculo no banco
    const calculationJuros = await db.juros.create({
      data: {
        capitalinicial,
        valorMensal,
        taxajuros,
        taxajurosUnidade,
        tempo,
        tempoUnidade,
        valorInvestido,
        totalganhoemjuros,
        valortotalfinal,
        userId,
        ...(valoresMensais && valoresMensais.length > 0
          ? {
              valoresMensais: {
                create: valoresMensais.map((data: MonthlyData) => ({
                  mes: data.mes,
                  jurosMensal: data.jurosMensal,
                  totalInvestido: data.totalInvestido,
                  totalJuros: data.totalJuros,
                  valorAcumulado: data.valorAcumulado,
                  userId: userId,
                })),
              },
            }
          : {}),
      },
    });

    return NextResponse.json(calculationJuros, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao salvar cálculo:", error.message);
    } else {
      console.error("Erro ao salvar cálculo:", error);
    }

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const calculationsJuros = await db.juros.findMany({
      where: {
        userId,
      },
      include: {
        valoresMensais: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(calculationsJuros, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar cálculos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const calculationsJuros = await db.juros.deleteMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(calculationsJuros, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar cálculos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
