import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.transaction.delete({
      where: {
        id: params.id,
        userId,
      },
    });

    revalidatePath(`/transactions`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Erro ao deletar", { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);
    return new NextResponse("Erro ao buscar", { status: 500 });
  }
}
