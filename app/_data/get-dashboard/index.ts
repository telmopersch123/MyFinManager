"use server";
import { getMonthDateRange } from "@/app/(home)/_components/getmonthDateRange";
import { db } from "@/app/_lib/prisma";

import { TotalExpenseCategory, TransactionPercentageType } from "./type";

import { auth } from "@clerk/nextjs/server";
import { TransactionType } from "@prisma/client";
import { cache } from "react";

export const getDashBoard = cache(
  async (month: string, type: TransactionType = "DEPOSIT") => {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const date = new Date();
    const { start, end } = getMonthDateRange(date.getFullYear(), Number(month));
    const where = {
      userId,
      date: {
        gte: start,
        lt: end,
      },
    };
    const depositsTotal = Number(
      (
        await db.transaction.aggregate({
          where: { ...where, type: "DEPOSIT" },
          _sum: { amount: true },
        })
      )?._sum?.amount,
    );

    const investmentsTotal = Number(
      (
        await db.transaction.aggregate({
          where: { ...where, type: "INVESTMENT" },
          _sum: { amount: true },
        })
      )?._sum?.amount,
    );

    const expensesTotal = Number(
      (
        await db.transaction.aggregate({
          where: { ...where, type: "EXPENSE" },
          _sum: { amount: true },
        })
      )?._sum?.amount,
    );

    const balance = depositsTotal - investmentsTotal - expensesTotal;

    const transactionsTotal = Number(
      (
        await db.transaction.aggregate({
          where,
          _sum: { amount: true },
        })
      )._sum.amount,
    );

    const typesPercentage: TransactionPercentageType = {
      [TransactionType.DEPOSIT]:
        (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
      [TransactionType.EXPENSE]:
        (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
      [TransactionType.INVESTMENT]:
        (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    };

    const totalForType = Number(
      (
        await db.transaction.aggregate({
          where: { ...where, type: type },
          _sum: { amount: true },
        })
      )?._sum?.amount || 0,
    );

    const totalExpensePerCategory: TotalExpenseCategory[] = (
      await db.transaction.groupBy({
        by: ["category"],
        where: {
          ...where,
          type: type,
        },
        _sum: {
          amount: true,
        },
      })
    ).map((category) => ({
      category: category.category,
      totalAmount: Number(category._sum.amount || 0),
      percentageOfTotal:
        (Number(category._sum.amount || 0) / Number(totalForType)) * 100,
    }));

    const lastTransaction = (
      await db.transaction.findMany({
        where,
        orderBy: { date: "desc" },
        // take: 15,
      })
    ).map((transaction) => ({
      ...transaction,
      amount: parseFloat(transaction.amount.toFixed(2)),
    }));
    return {
      depositsTotal,
      investmentsTotal,
      expensesTotal,
      balance,
      typesPercentage,
      totalExpensePerCategory,
      lastTransaction,
    };
  },
);
