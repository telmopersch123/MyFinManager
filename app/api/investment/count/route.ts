import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { quantidade, resetByPlanChange } = await req.json();
  const today = new Date();

  const user = await clerkClient().users.getUser(userId);
  const isPremium = user?.publicMetadata?.subscriptionPlan === "premium";

  if (quantidade === 0) {
    if (!resetByPlanChange || isPremium) {
      return new NextResponse(JSON.stringify({ message: "Reset ignorado." }), {
        status: 200,
      });
    }
  }

  const record = await db.limitedSimulation.findUnique({
    where: { userId },
  });

  if (record) {
    const lastDate = new Date(record.lastDate);
    const isSameDay = lastDate.toDateString() === today.toDateString();

    const newQuantity = isSameDay ? quantidade : 0;

    await db.limitedSimulation.update({
      where: { userId },
      data: {
        quantidade: newQuantity,
        lastDate: today,
      },
    });
  } else {
    await db.limitedSimulation.create({
      data: {
        quantidade,
        userId,
        lastDate: today,
      },
    });
  }

  return NextResponse.json({ quantidade });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const today = new Date().toDateString();

  const count = await db.limitedSimulation.findUnique({
    where: { userId },
  });

  if (!count) {
    return NextResponse.json({ quantidade: 0 });
  }

  const lastDate = new Date(count.lastDate).toDateString();
  const quantidade = today === lastDate ? count.quantidade : 0;

  return NextResponse.json({ quantidade });
}
