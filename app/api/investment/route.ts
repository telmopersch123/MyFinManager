export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/daily/BTC-BRL/360",
    );
    if (!response.ok) {
      return new Response("Failed to fetch data", { status: response.status });
    }
    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(
      JSON.stringify({ error: "Falha ao buscar dados da API" }),
      { status: 500 },
    );
  }
}
