import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const article = await db.article.findUnique({
      where: { id },
      include: {
        categories: true,
        User: true,
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
