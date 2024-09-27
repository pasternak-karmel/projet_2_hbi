import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  try {
    const whereClause: any = {
      status: "ACCEPTE",
      isDeleted: false,
      quantite: { gt: 0 },
    };

    let orderByClause = {};

    orderByClause = { updatedAt: "desc" };

    const totalProducts = await db.article.count({
      where: whereClause,
    });

    const articles = await db.article.findMany({
      where: whereClause,
      orderBy: orderByClause,
      include: {
        categories: true,
      },
    });

    const plainArticles = articles.map((article) => ({
      id: article.id,
      nom: article.nom,
      prix: article.prix,
      image: article.image,
      categories: article.categories ? article.categories.nom : "Unknown",
      userId: article.userId,
    }));

    return NextResponse.json(
      {
        articles: plainArticles,
        currentPage: page,
        hasMore: page < totalProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving articles:", error);
    return NextResponse.json(
      { error: "Failed to retrieve articles" },
      { status: 500 }
    );
  }
}
