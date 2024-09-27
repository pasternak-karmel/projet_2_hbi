import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  if (!query || query.length < 3) {
    return NextResponse.json([]);
  }

  try {
    const articles = await db.article.findMany({
      where: {
        OR: [
          { nom: { contains: query, mode: "insensitive" } }, // Search by article name
          { description: { contains: query, mode: "insensitive" } }, // Search by description
        ],
      },
      include: {
        User: true, // Include user relation
        categories: true, // Include categories relation
      },
    });

    const categories = await db.categories.findMany({
      where: { nom: { contains: query, mode: "insensitive" } }, // Search by category name
    });

    const users = await db.user.findMany({
      where: { name: { contains: query, mode: "insensitive" } }, // Search by user name
    });

    const results = [
      ...articles.map((article) => ({
        id: article.id,
        name: article.nom,
        type: "Article",
        description: article.description,
        image: article.image[0],
      })),
      ...categories.map((category) => ({
        id: category.id,
        name: category.nom,
        type: "Category",
      })),
      ...users.map((user) => ({
        id: user.id,
        name: user.name,
        type: "User",
      })),
    ];

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching search data:", error);
    return NextResponse.json([], { status: 500 });
  }
}
