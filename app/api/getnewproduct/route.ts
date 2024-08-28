import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
 
  try {
    const allArticles = await db.article.findMany({
      where: {
        status: "ACCEPTE",
        isDeleted: false,
      },
      include: {
        categories: true,
      },
    });

    if (allArticles.length === 0) {
      return NextResponse.json(
        { message: "Aucun produit disponible pour le moment." },
        { status: 200 }
      );
    }

    const shuffledArticles = allArticles.sort(() => 0.5 - Math.random());

    const featuredArticles = shuffledArticles.slice(0, 4);

    return NextResponse.json({ articles: featuredArticles }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving articles:", error);
    return NextResponse.json(
      { error: "Failed to retrieve articles" },
      { status: 500 }
    );
  }
}
