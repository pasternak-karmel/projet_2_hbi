import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET(request: Request) {
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

  try {
    const articles = await db.article.findMany({
      where: {
        status: "ATTENTE",
        isDeleted: false,
        quantite: {
          gt: 0,
        },
      },
      include: {
        User: true,
      },
    });

    const plainArticles = articles.map((article) => ({
      id: article.id,
      Articlenom: article.nom,
      usernom: article.User.name,
      adresse: article.User.adresse,
      contact: article.User.numTel,
      image: article.image,
      userId: article.userId,
      status: article.status,
      agentId: article.agentId,
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
