import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ClientDashboard from "./(home)/_components/client-dashboard";
import Loading from "./(home)/_components/loading";
import Navbar from "./_components/navbar";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { month?: string; checkout?: string; session_id?: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const checkout = searchParams.checkout;

  if (
    typeof searchParams.month !== "string" ||
    searchParams.month.trim() === ""
  ) {
    const currentMonth = new Date().getMonth() + 1;
    const monthParam = `month=${currentMonth.toString().padStart(2, "0")}`;

    if (checkout === "success") {
      const checkoutParam = checkout ? `&checkout=${checkout}` : "";
      redirect(`/?${monthParam}${checkoutParam}`);
    } else {
      redirect(`/?${monthParam}`);
    }
  }

  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <Navbar />
        <ClientDashboard month={searchParams.month} />
      </Suspense>
    </>
  );
}
