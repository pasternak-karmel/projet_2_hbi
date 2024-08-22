import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const article = await prisma.article.findUnique({
        where: { id },
        include: {
          categories: true,
        },
      });

      if (!article) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(article, { status: 200 });
    } catch (error) {
      console.error("Error retrieving articles:", error);
      return NextResponse.json(
        { error: "Failed to retrieve articles" },
        { status: 500 }
      );
    }
  } else {
    try {
      const articles = await prisma.article.findMany({
        where: { idDeleted: false },
        include: {
          categories: true,
        },
      });

      const plainArticles = articles.map((article) => ({
        id: article.id,
        nom: article.nom,
        prix: article.prix,
        image: article.image,
        categories: article.categories,
        userid: article.userId
      }));

      return NextResponse.json({ articles: plainArticles }, { status: 200 });
    } catch (error) {
      console.error("Error retrieving articles:", error);
      return NextResponse.json(
        { error: "Failed to retrieve articles" },
        { status: 500 }
      );
    }
  }
}
