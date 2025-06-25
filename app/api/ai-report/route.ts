import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { messages, signal } = await request.json();

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free",
          messages,
        }),
        signal, // O signal será passado pelo cliente
      },
    );

    if (!response.ok) {
      console.error("Erro na API do OpenRouter:", await response.text());
      return NextResponse.json(
        { error: "Erro ao gerar relatório com IA" },
        { status: response.status },
      );
    }

    const aiResult = await response.json();
    const report =
      aiResult.choices[0]?.message?.content ??
      "Não foi possível gerar o relatório.";
    return NextResponse.json({ report });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Requisição cancelada" },
        { status: 499 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao gerar relatório com IA" },
      { status: 500 },
    );
  }
}
