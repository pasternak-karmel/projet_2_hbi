import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = await currentRole();

  if (role !== UserRole.AGENT) {
    return NextResponse.json(
      { error: "You're not allowed to be here!" },
      { status: 401 }
    );
  }

  const agentId = session.user.id;

  try {
    const article = await db.article.findMany({
      where: { agentId: agentId },
      include: {
        User: true,
        categories: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("Error retrieving article:", error);
    return NextResponse.json(
      { error: "Failed to retrieve article" },
      { status: 500 }
    );
  }
}
