"use server";

import { auth } from "@/auth";
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

    return { succes: "amount calculated", totalAmount };
  } catch (error) {
    return { error: "Failed to calculate total amount" };
  }
};

export const CalculateAmountPanier = async () => {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.cart) {
      return { error: "No cart found" };
    }

    const cart = session.user.cart;

    const totalAmount = cart.reduce((total, item) => {
      return total + item.prix * item.quantity;
    }, 0);

    return { succes: "Cart calculated", totalAmount };
  } catch (error) {
    return { error: "Failed to calculate total amount" };
  }
};
