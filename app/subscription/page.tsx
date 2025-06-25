import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SubscriptionClient from "./_components/subscription-page";

export default async function SubscriptionPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";

  return (
    <>
      <Navbar />
      <SubscriptionClient hasPremiumPlan={hasPremiumPlan} />
    </>
  );
}
