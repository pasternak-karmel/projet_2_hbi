import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");
//   const page = parseInt(searchParams.get("page") || "1");
//   const limit = parseInt(searchParams.get("limit") || "10");

//   try {
//     const skip = (page - 1) * limit;
//     const totalProducts = await db.article.count({
//       where: {
//         status: "ACCEPTE",
//         isDeleted: false,
//         quantite: {
//           gt: 0,
//         },
//       },
//     });
//     const articles = await db.article.findMany({
//       where: {
//         status: "ACCEPTE",
//         isDeleted: false,
//         quantite: {
//           gt: 0,
//         },
//       },
//       skip: skip,
//       take: limit,
//       include: {
//         categories: true,
//       },
//     });

//     const plainArticles = articles.map((article) => ({
//       id: article.id,
//       nom: article.nom,
//       prix: article.prix,
//       image: article.image,
//       categories: article.categories,
//       userId: article.userId,
//     }));

//     return NextResponse.json(
//       {
//         articles: plainArticles,
//         totalPages: Math.ceil(totalProducts / limit),
//         currentPage: page,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error retrieving articles:", error);
//     return NextResponse.json(
//       { error: "Failed to retrieve articles" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const minPrice = searchParams.get("min");
  const maxPrice = searchParams.get("max");
  const category = searchParams.get("cat");
  const sort = searchParams.get("sort");

  try {
    const skip = (page - 1) * limit;

    // Build the filter conditions dynamically
    const whereClause: any = {
      status: "ACCEPTE",
      isDeleted: false,
      quantite: { gt: 0 },
    };

    // Add price filter
    if (minPrice || maxPrice) {
      whereClause.prix = {};
      if (minPrice) whereClause.prix.gte = parseInt(minPrice);
      if (maxPrice) whereClause.prix.lte = parseInt(maxPrice);
    }

    // Add category filter
    if (category) {
      whereClause.categories = {
        nom: category,
      };
    }

    // Define sorting logic
    let orderByClause = {};
    if (sort) {
      const [order, field] = sort.split(" ");
      orderByClause = {
        [field]: order, // e.g., { price: 'asc' }
      };
    } else {
      // Default sorting
      orderByClause = { updatedAt: "desc" };
    }

    const totalProducts = await db.article.count({
      where: whereClause,
    });

    const articles = await db.article.findMany({
      where: whereClause,
      skip: skip,
      take: limit,
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
      categories: article.categories.nom,
      userId: article.userId,
    }));

    return NextResponse.json(
      {
        articles: plainArticles,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
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
