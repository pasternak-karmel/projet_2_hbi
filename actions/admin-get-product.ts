"use server";

import { db } from "@/lib/db";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const AdminGetProduct = async () => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { error: "Allowed Server Action!" };
  }

  const articleAttente = await db.article.findMany({
    select: {
      id: true,
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
    where: { status: "ATTENTE" },
  });

  return articleAttente;
};
