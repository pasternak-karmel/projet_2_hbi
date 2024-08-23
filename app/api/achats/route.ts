import { auth } from "@/auth";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
    });

    if (!orders || orders.length === 0) {
      return NextResponse.json({ error: "No purchases found" }, { status: 404 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch purchases:", error);
    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 }
    );
  }
}
