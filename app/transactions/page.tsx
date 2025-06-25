import { auth, clerkClient } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

import Navbar from "../_components/navbar";
import { TransactionsClient } from "./_components/transactions-client";

export default async function TransactionsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";

  return (
    <>
      <Navbar />
      <TransactionsClient hasPremiumPlan={hasPremiumPlan} />
    </>
  );
}
