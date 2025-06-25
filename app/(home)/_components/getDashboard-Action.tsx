"use server";
import { getDashBoard } from "@/app/_data/get-dashboard";
import { TransactionType } from "@prisma/client";

export const getDashboardAction = async (
  month: string,
  type: TransactionType = "EXPENSE",
) => {
  try {
    const dashboard = await getDashBoard(month, type);
    return dashboard;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar dados:", {
        message: error.message,
        stack: error.stack,
        month,
        type,
      });
    } else {
      console.error("Erro ao buscar dados:", { error, month, type });
    }
    throw new Error(
      `Falha ao carregar os dados do dashboard: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
    );
  }
};
