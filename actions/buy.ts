"use server";

import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const CalculateAmount = async (productId: string, quantite: number) => {
  try {
    const article = await db.article.findUnique({
      where: { id: productId },
    });

    if (!article) {
      return { error: "Product not found" };
    }

    const totalAmount = article.prix * quantite;

    return { succes: "Article", totalAmount };
  } catch (error) {
    return { error: "Failed to create order" };
  }
};

export const Buy = async () => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden Server Action!" };
  }

  return { success: "Allowed Server Action!" };
};
