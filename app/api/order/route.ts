import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("id");
  const quantite = Number(searchParams.get("quantite"));

  if (!productId || !quantite) {
    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 }
    );
  }

  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const isRempli = await db.user.findFirst({
      where: { id: userId },
    });

    if (isRempli?.numTel === null || isRempli?.adresse === null) {
      return NextResponse.json(
        { error: "Veuillez remplir votre profil avant de pourvoir continuer" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Veuillez completer profil avant de continuer",
      },
      { status: 400 }
    );
  }

  try {
    const article = await db.article.findUnique({
      where: { id: productId },
    });

    if (!article) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (article.quantite < quantite) {
      return NextResponse.json(
        { error: "Pas assez de stock " },
        { status: 400 }
      );
    }

    await db.article.update({
      where: { id: productId },
      data: { quantite: article.quantite - quantite },
    });

    const totalAmount = article.prix * quantite;

    const order = await db.order.create({
      data: {
        userId,
        totalAmount,
        items: {
          productId: article.id,
          quantity: quantite,
          price: article.prix,
        },
        status: "payed",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
