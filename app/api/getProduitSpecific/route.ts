import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const articles = await prisma.article.findMany({
      where: { userId },
      include: {
        categories: true,
      },
    });

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving articles:", error);
    return NextResponse.json(
      { error: "Failed to retrieve articles" },
      { status: 500 }
    );
  }
}
