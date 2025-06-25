import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "./get-current-month-transactions";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentMonthTransactions = await getCurrentMonthTransactions();

  try {
    const user = await clerkClient().users.getUser(userId);

    if (user.publicMetadata?.subscriptionPlan === "premium") {
      return true;
    }

    return currentMonthTransactions < 30;
  } catch (error) {
    console.error("Error fetching user from Clerk:", {
      userId,
      error: error instanceof Error ? error.message : String(error),
    });

    return currentMonthTransactions < 30;
  }
};
