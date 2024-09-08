import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

type CartRequestBody = {
  productId: string;
  quantity: number;
};

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // console.log(session.user.cart);

  const { productId, quantity } = await request.json();

  if (!productId || quantity <= 0) {
    return NextResponse.json(
      { error: "Invalid product ID or quantity" },
      { status: 400 }
    );
  }

  try {
    const product = await db.article.findFirst({
      where: { id: productId },
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
      return NextResponse.json(
        { error: "Session not updated" },
        { status: 403 }
      );
    }
    // console.log(updatedSession);
    // console.log("Updated session:", JSON.stringify(session, null, 2));

    return NextResponse.json(
      { cart: updatedSession.user.cart },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}
