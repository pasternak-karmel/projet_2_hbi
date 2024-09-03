"use server"

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";


export const scan_produit = async (produitId: string, userScan: string) => {

    const produitIsDisponible = await db.article.findFirst({
        where: { id: produitId },
        include: {
          User: true,
        },
      });
      if( !produitIsDisponible || produitIsDisponible.isDeleted === true){
        return {error: "produit non trouver ou deja supprimer "};
      }
      
    return { produitIsDisponible};
   
  };