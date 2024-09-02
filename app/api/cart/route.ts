import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, quantity } = await request.json();
  const id = "c56c01dd-5141-411e-bf21-22ce52c0180f";

  if (!productId || quantity <= 0) {
    return NextResponse.json(
      { error: "Invalid product ID or quantity" },
      { status: 400 }
    );
  }

  try {
    const product = await db.article.findFirst({
      where: { id: id },
      include: {
        categories: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
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
        image: product.image,
        quantity,
      });
    }

    session.user.cart = cart;

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}
