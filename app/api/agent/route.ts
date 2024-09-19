import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {  currentRole, currentUserId } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { auth } from "@/auth";

export async function GET() {
  // Authenticate the user
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if the user has the AGENT role
  const role = await currentRole();
  if (role !== UserRole.AGENT) {
    return NextResponse.json(
      { error: "You're not allowed to be here!" },
      { status: 403 }
    );
  }

  // Get the current agent's ID
  const agentId = await currentUserId();

  try {
    // Fetch articles and deliveries in parallel
    const [articles, livraisons] = await Promise.all([
      db.article.findMany({
        where: {
          status: "ATTENTE",
          isDeleted: false,
          quantite: { gt: 0 },
        },
        include: { User: true },
      }),
      db.article.findMany({
        where: { agentId },
        include: { User: true, categories: true },
      }),
    ]);

    // Map articles to a simplified structure
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

    // Map livraisons to a simplified structure
    const plainLivraisons = livraisons.map((livraison) => ({
      id: livraison.id,
      nom: livraison.nom,
      description: livraison.description,
      prix: livraison.prix,
      quantite: livraison.quantite,
      categorieNom: livraison.categories.nom,
      userName: livraison.User?.name || null,
      userEmail: livraison.User?.email || null,
    }));

    // Return both articles and livraisons in the response
    return NextResponse.json({
      articles: plainArticles,
      livraisons: plainLivraisons,
    }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
