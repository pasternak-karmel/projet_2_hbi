"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { AttribueProduct } from "@/lib/mail";

export const accepte_article = async (
  articleIds: string[],
  agentId: string
) => {
  if (!articleIds.length) return { error: "No articles selected." };

  const result = await db.article.updateMany({
    where: { id: { in: articleIds } },
    data: { status: "ACCEPTE", agentId },
    // data: { status: "ACCEPTE", agentId: "66cefe6c3f91b7963ef0f2b6" },
  });

  if (result.count > 0) {
    return { success: "Articles marked as accepted successfully" };
  } else {
    return { error: "An error occurred while updating the articles." };
  }
};

export const article_accepte = async (article: string, agentId: string) => {
  const result = await db.article.updateMany({
    where: { id: article },
    data: { status: "ACCEPTE", agentId },
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
    const agent = await getUserById(agentId);
    if (!agent?.email || !get?.User.email) {
      return { error: "An email isn't found" };
    }
    await AttribueProduct(agent?.email, get?.User.email, get.nom);
    return { success: "Article accepter avec succes" };
  } else {
    return { error: "An error occurred while updating the articles." };
  }
};
