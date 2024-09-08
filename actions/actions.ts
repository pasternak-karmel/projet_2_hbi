"use server";

import { auth } from "@/auth";
import { ToastRessuable } from "@/function/notification-toast";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function CreateCart(productId: string, quantity: number) {
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: "You must be connected before to add to cart",
      status: 401,
    };
  }

  if (!productId || quantity <= 0) {
    return { error: "Invalid product ID or quantity", status: 400 };
  }

  try {
    const product = await db.article.findFirst({
      where: { id: productId },
      include: {
        categories: true,
      },
    });

    if (!product) {
      return { error: "Product not found", status: 404 };
    }

    let cart = session.user.cart || [];

    const existingProductIndex = cart.findIndex(
      (item) => item.productId === productId
    );

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        nom: product.nom,
        prix: product.prix,
        image: product.image?.[0],
        quantity,
      });
    }

    session.user.cart = cart;

    const updatedSession = {
      ...session,
      user: {
        ...session.user,
        cart,
      },
    };
    if (!updatedSession) {
      return { error: "Session not updated", status: 403 };
    }

    return { succes: true, sessionU: updatedSession, status: 200 };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { error: "Failed to add to cart", status: 500 };
  }
}


