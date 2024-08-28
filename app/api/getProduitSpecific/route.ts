import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const articles = await db.article.findMany({
      where: {
        userId,
        isDeleted: false,
        quantite: {
          gt: 0,
        },
      },
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
