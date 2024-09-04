"use server";
import { db } from "@/lib/db";

const decodeBase64 = (input: string) => {
  return atob(input);
};

export const scan_produit = async (produitId: string, userScan: string) => {
  // const decodedString = decodeBase64(userScan);
  // if (decodedString !== produitId) return;


  const produitIsDisponible = await db.article.findFirst({
    where: { id: produitId },
    include: {
      User: true,
    },
  });
  if (!produitIsDisponible || produitIsDisponible.isDeleted === true) {
    return { error: "produit non trouver ou deja supprimer " };
  }

  return { produitIsDisponible };
};
