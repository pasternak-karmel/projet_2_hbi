import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const allArticles = await prisma.article.findMany({
      where: {
        // userId,
        idDeleted: false, 
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

    // Mélanger les articles de manière aléatoire
    const shuffledArticles = allArticles.sort(() => 0.5 - Math.random());

    // Sélectionner un maximum de 4 articles
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
