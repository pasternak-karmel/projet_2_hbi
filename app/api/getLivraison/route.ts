import { currentRole, currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const role = await currentRole();

  if (role !== UserRole.AGENT) {
    return { error: "You're not allowed to be here!" };
  }

  const agentId = await currentUserId();
  try {
    const livraisons = await db.article.findMany({
      where: { agentId },
      include: {
        User: true,
        categories: true,
      },
    });

    if (!livraisons || livraisons.length === 0) {
      return { error: "Aucune livraison ne vous a été attribuée" };
    }

    const plainLivraisons = livraisons.map((livraison) => ({
      id: livraison.id,
      nom: livraison.nom,
      description: livraison.description,
      prix: livraison.prix,
      quantite: livraison.quantite,
      categorieNom: livraison.categories.nom,
      userName: livraison.User.name,
      userEmail: livraison.User.email,
    }));

    return NextResponse.json(plainLivraisons);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupérations de vos livraisons" },
      { status: 500 }
    );
  }
}
