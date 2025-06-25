import { auth, clerkClient } from "@clerk/nextjs/server";
import { TransactionType } from "@prisma/client";
import { redirect } from "next/navigation";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { getDashBoard } from "../_data/get-dashboard";

export const getDashboardData = async (month: string, type: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const parsedMonth = Number(month);
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");

  if (!month || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
    redirect(`/?month=${currentMonth}`);
  }

  try {
    const [dashboard, user] = await Promise.all([
      getDashBoard(month, type as TransactionType),
      clerkClient()
        .users.getUser(userId)
        .catch((error) => {
          console.error("Error fetching user from Clerk:", {
            userId,
            error: error instanceof Error ? error.message : "Unknown error",
          });
          return null;
        }),
    ]);

    const userCanAddTransaction = await canUserAddTransaction();

    return {
      dashboard,
      userCanAddTransaction,
      user: user ?? undefined,
    };
  } catch (error) {
    console.error("Error in getDashboardData:", {
      userId,
      month,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new Error("Failed to fetch dashboard data");
  }
};
