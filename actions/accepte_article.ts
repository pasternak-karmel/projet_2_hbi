"use server";

import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { AttribueProduct } from "@/lib/mail";
import { UserRole } from "@prisma/client";

export const accepte_article = async (
  articleIds: string[],
  agentId: string
) => {
  if (!articleIds.length) return { error: "No articles selected." };

  const result = await db.article.updateMany({
    where: { id: { in: articleIds } },
    data: { status: "ACCEPTE", agentId },
  });

  if (result.count > 0) {
    return { success: "Articles marked as accepted successfully" };
  } else {
    return { error: "An error occurred while updating the articles." };
  }
};

export const article_accepte = async (article: string, agentId?: string) => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== UserRole.AGENT)
    return { error: "user non autorisé" };

  const isAlreadyAccepted = await db.article.findFirst({
    where: { id: article },
    // data: { status: "ACCEPTE", agentId: session.user.id },
  });

  if (
    !isAlreadyAccepted ||
    isAlreadyAccepted?.agentId !== null ||
    isAlreadyAccepted?.isDeleted === true
  ) {
    return {
      error: "Produit non trouvée ou déja accepter ou supprimer par le vendeur",
    };
  }

  const result = await db.article.update({
    where: { id: article },
    data: { status: "ACCEPTE", agentId: session.user.id },
  });

  if (result) {
    const get = await db.article.findFirst({
      where: { id: article },
      include: {
        User: true,
      },
    });
    if (get?.agentId === null) {
      return { error: "Agent Id isn't updated." };
    }
    const agent = await getUserById(session.user.id);
    if (!agent?.email || !get?.User.email) {
      return { error: "An email isn't found" };
    }
    await AttribueProduct(session.user.email, get?.User.email, get.nom);
    return { success: "Article accepter avec succes" };
  } else {
    return { error: "An error occurred while updating the articles." };
  }
};

export const ConfirmRecuArticle = async (
  produitId: string,
  confirm: string
) => {
  let values;

  if (confirm === "yes") {
    values = true;
  } else if (confirm === "no") {
    values = false;
  } else return { error: "values received aren't conforme as expected " };

  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== UserRole.AGENT)
      return { error: "user non autorisé" };

    const get = await db.article.findFirst({
      where: { id: produitId, agentId: session.user.id },
    });

    if (!get)
      return { error: "Ce produit n'est plus trouvé ou a été supprimer" };

    if (get?.isRecu === values) {
      return { error: `Ce produit a été deja marquer comme ${confirm}` };
    } else {
      if (values === false) {
        await db.article.update({
          where: { id: produitId, agentId: session.user.id },
          data: { isRecu: values, status: "REFUS" },
        });
      } else {
        await db.article.update({
          where: { id: produitId, agentId: session.user.id },
          data: { isRecu: values },
        });
      }
    }
    return { succes: true, message: "Produit marquer comme reçu avec succes" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
