"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

const decodeBase64 = (input: string) => {
  return atob(input);
  // const decodedString = decodeBase64(userScan);
  // if (decodedString !== produitId) return;
};

export const scan_produit = async (produitId: string, userScan: string) => {
  const session = await auth();

  if (!session || !session.user) return { error: "Non autorisé" };

  if (session.user.role !== UserRole.AGENT) return { error: "Unautorized" };

  if (produitId !== userScan) {
    return { error: "Vous n'avez pas scanné le bon produit." };
  }

  const produitIsDisponible = await db.article.findFirst({
    where: { id: userScan },
    include: {
      User: true,
    },
  });

  if (!produitIsDisponible) {
    return { error: "Produit non trouvé." };
  }

  if (produitIsDisponible.agentId !== session.user.id) {
    return { error: "Accès non accorder. Vous pouvez pas scanner ce produit" };
  }

  if (produitIsDisponible.isDeleted) {
    return { error: "Produit supprimé." };
  }

  // if (produitIsDisponible.quantite < 0) {
  //   return { error: "La quantité ne peut être 0" };
  // }

  return { produitIsDisponible };
};
