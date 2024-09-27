import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentRole, currentUserId } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = await currentRole();
  if (role !== UserRole.AGENT) {
    return NextResponse.json(
      { error: "You're not allowed to be here!" },
      { status: 403 }
    );
  }

  const agentId = await currentUserId();

  try {
    const [articles, livraisons] = await Promise.all([
      db.article.findMany({
        where: {
          status: "ATTENTE",
          isDeleted: false,
          quantite: { gt: 0 },
          isRecu: false,
        },
        orderBy: {
          createdAt: "asc",
        },
        include: { User: true, categories: true },
      }),
      db.article.findMany({
        where: { agentId },
        include: { User: true, categories: true },
      }),
    ]);

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
      isRecu: article.isRecu,
      description: article.description,
      prix: article.prix,
      quantite: article.quantite,
      categorieNom: article.categories.nom,
      userEmail: article.User?.email || null,
    }));

    const plainLivraisons = livraisons.map((livraison) => ({
      id: livraison.id,
      description: livraison.description,
      prix: livraison.prix,
      status: livraison.status,
      isRecu: livraison.isRecu,
      quantite: livraison.quantite,
      categorieNom: livraison.categories.nom,
      userEmail: livraison.User?.email || null,
      Articlenom: livraison.nom,
      usernom: livraison.User.name || null,
      adresse: livraison.User.adresse || null,
      contact: livraison.User.numTel,
      image: livraison.image,
      userId: livraison.userId,
      agentId: livraison.agentId,
    }));

    return NextResponse.json(
      {
        articles: plainArticles,
        livraisons: plainLivraisons,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
