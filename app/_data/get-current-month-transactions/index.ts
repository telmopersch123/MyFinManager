import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";

export const getCurrentMonthTransactions = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  return db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  });
};
