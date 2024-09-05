"use server";
import { db } from "@/lib/db";

const decodeBase64 = (input: string) => {
  return atob(input);
  // const decodedString = decodeBase64(userScan);
  // if (decodedString !== produitId) return;
};

export const scan_produit = async (produitId: string, userScan: string) => {
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

  if (produitIsDisponible.isDeleted) {
    return { error: "Produit supprimé." };
  }

  return { produitIsDisponible };
};
