import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface CronogramaItem {
  parcela: string;
  dataVencimento: string;
  prestacao: string;
  juros: string;
  amortizacao: string;
  saldo: string;
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      valorDivida,
      parcelas,
      jurosMes,
      primeiroVencimento,
      valorFinanciado,
      parcelasResultado,
      taxaMensal,
      prestacaoMensal,
      totalJuros,
      totalPagar,
      cronogramaItems,
    } = await request.json();

    if (
      !valorDivida ||
      !parcelas ||
      !jurosMes ||
      !primeiroVencimento ||
      !valorFinanciado ||
      !parcelasResultado ||
      !taxaMensal ||
      !prestacaoMensal ||
      !totalJuros ||
      !totalPagar ||
      !cronogramaItems
    ) {
      return NextResponse.json(
        { error: "Fórmula e resultado são obrigatórios" },
        { status: 400 },
      );
    }

    const response = await db.parcelamento.create({
      data: {
        valorDivida,
        parcelas,
        jurosMes,
        primeiroVencimento,
        valorFinanciado,
        parcelasResultado,
        taxaMensal,
        prestacaoMensal,
        totalJuros,
        totalPagar,
        userId,
        cronogramaItems: {
          create: cronogramaItems.map((item: CronogramaItem) => ({
            parcela: item.parcela,
            dataVencimento: item.dataVencimento,
            prestacao: item.prestacao,
            juros: item.juros,
            amortizacao: item.amortizacao,
            saldo: item.saldo,
          })),
        },
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar cálculo:", error);
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

    const calculations = await db.parcelamento.findMany({
      where: {
        userId,
      },
      include: {
        cronogramaItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(calculations, { status: 200 });
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

    const calculations = await db.parcelamento.deleteMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(calculations, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar cálculos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
