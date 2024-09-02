"use server";

import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const AdminGetProduct = async (startDate?: Date, endDate?: Date) => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { error: "You're not allowed to be here!" };
  }

  const whereClause: any = {
    status: "ATTENTE",
    isDeleted: false,
    quantite: { gt: 0 },
  };

  if (startDate && endDate) {
    whereClause.createdAt = {
      gte: startDate,
      lte: endDate,
    };
  }

  const articleAttente = await db.article.findMany({
    select: {
      id: true,
      userId: true,
      nom: true,
      description: true,
      prix: true,
      usage: true,
      image: true,
      categories: {
        select: {
          nom: true,
        },
      },
      quantite: true,
    },
    where: whereClause,
  });

  if (!articleAttente || articleAttente.length === 0) {
    return { error: "Pas de produit en attente d'approbation" };
  }

  return articleAttente;
};
