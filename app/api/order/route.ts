import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await req.json();
  
  const { cart, productId, quantite } = body;

  if (!cart && (!productId || !quantite)) {
    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 }
    );
  }

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
    let totalAmount = 0;
    const orderItems = [];

    if (cart) {
      for (const item of cart) {
        const { productId, quantity } = item;

        const article = await db.article.findUnique({
          where: { id: productId },
        });

        if (!article) {
          return NextResponse.json({ error: `Product with ID ${productId} not found` }, { status: 404 });
        }
        if (article?.userId === userId) {
          return NextResponse.json(
            { error: "Tu ne peux pas encore payer ton propre produit" },
            { status: 400 }
          );
        }
        if (article.quantite < quantity) {
          return NextResponse.json(
            { error: `Pas assez de stock pour ${article.nom}` },
            { status: 400 }
          );
        }

        await db.article.update({
          where: { id: productId },
          data: { quantite: article.quantite - quantity },
        });

        totalAmount += article.prix * quantity;

        orderItems.push({
          productId: article.id,
          quantity: quantity,
          price: article.prix,
          nom: article.nom,
          image: article.image?.[0],
        });
      }
    } else {
      const article = await db.article.findUnique({
        where: { id: productId },
      });

      if (!article) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      if (article?.userId === userId) {
        return NextResponse.json(
          { error: "Tu ne peux pas encore payer ton propre produit" },
          { status: 400 }
        );
      }
      if (article.quantite < quantite) {
        return NextResponse.json(
          { error: "Pas assez de stock" },
          { status: 400 }
        );
      }

      await db.article.update({
        where: { id: productId },
        data: { quantite: article.quantite - quantite },
      });

      totalAmount = article.prix * quantite;

      orderItems.push({
        productId: article.id,
        quantity: quantite,
        price: article.prix,
        nom: article.nom,
        image: article.image?.[0],
      });
    }

    const order = await db.order.create({
      data: {
        userId,
        totalAmount,
        items: orderItems,
        status: "payer",
      },
      include: {
        User: true,
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
