import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { formula, result } = await request.json();
    if (!formula || !result) {
      return NextResponse.json(
        { error: "Fórmula e resultado são obrigatórios" },
        { status: 400 },
      );
    }

    // Salvar cálculo no banco
    const calculation = await db.calculation.create({
      data: {
        formula,
        result,
        userId,
      },
    });

    return NextResponse.json(calculation, { status: 201 });
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
    const calculations = await db.calculation.findMany({
      where: {
        userId,
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

    const calculations = await db.calculation.deleteMany({
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
