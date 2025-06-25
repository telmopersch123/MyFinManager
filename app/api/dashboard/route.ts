import { getDashboardData } from "@/app/_components/get-dashboard-data";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month") ?? "";
  const type = searchParams.get("type") ?? "DEPOSIT";
  try {
    const data = await getDashboardData(month, type);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro na API de dashboard:", error);
    return new NextResponse("Erro ao obter dados do dashboard", {
      status: 500,
    });
  }
}
