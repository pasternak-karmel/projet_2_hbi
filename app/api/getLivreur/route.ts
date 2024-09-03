import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");
    const session = await auth();

    if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    try {
      const articles = await db.article.findMany({
        where: {
          status: "ACCEPTE",
          isDeleted: false,
          quantite: {
            gt: 0,
          },
          agentId: userId
        },
        include:{
          User:true
        }
        
      });

      const plainArticles = articles.map((article) => ({
        id: article.id,
        Articlenom: article.nom,
        usernom: article.User.name,
        adresse: article.User.adresse,
        contact: article.User.numTel,
        image: article.image,
        userId: article.userId,
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
