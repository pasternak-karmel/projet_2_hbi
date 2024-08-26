"use server";

import { db } from "@/lib/db";

export const accepte_article = async (articleIds: string[]) => {
  if (!articleIds.length) return { error: "No articles selected." };

  const result = await db.article.updateMany({
    where: { id: { in: articleIds } },
    data: { status: "ACCEPTE" },
  });

  if (result.count > 0) {
    return { success: "Articles marked as accepted successfully" };
  } else {
    return { error: "An error occurred while updating the articles." };
  }
};
