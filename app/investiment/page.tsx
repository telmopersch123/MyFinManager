import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GetCalculator from "../_components/calculadora/get-calculadora";
import Navbar from "../_components/navbar";
import InvestimentGeral from "./_components/investmentGeral";

export default async function Page({
  searchParams: { month },
}: {
  searchParams: { month?: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  if (typeof month !== "string" || month.trim() === "") {
    const currentMonth = new Date().getMonth() + 1;
    redirect(`/investiment?month=${currentMonth.toString().padStart(2, "0")}`);
  }

  return (
    <div>
      <Navbar />
      <InvestimentGeral month={month} />
      <GetCalculator />
    </div>
  );
}
