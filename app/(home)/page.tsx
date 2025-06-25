import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import ClientDashboard from "./_components/client-dashboard";

export default async function Home({
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
    redirect(`/?month=${currentMonth.toString().padStart(2, "0")}`);
  }

  return (
    <>
      <Navbar />
      <ClientDashboard month={month} />
    </>
  );
}
