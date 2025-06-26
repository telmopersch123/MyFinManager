export const dynamic = "force-dynamic";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Excluir cálculo
    const calculation = await db.calculation.delete({
      where: {
        id: params.id,
        userId,
      },
    });

    return NextResponse.json(calculation, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir cálculo. ID:", params.id, "Erro:", error);
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
