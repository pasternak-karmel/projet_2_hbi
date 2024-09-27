import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { FedaPay, Transaction } from "fedapay";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await req.json();

  const { cart, transactionId, productId, quantite, payment } = body;

  if (!cart && (!productId || !quantite || !payment))
    return NextResponse.json(
      { error: "Invalid query parameters" },
      { status: 400 }
    );

  FedaPay.setApiKey(process.env.FEDA_SECRET as string);
  FedaPay.setEnvironment("sandbox");

  let transactionStatus;

  if (!cart && payment !== "COD") {
    console.log(transactionId);
    const transaction = await Transaction.retrieve(transactionId);
    transactionStatus = transaction.status;
  }

  try {
    const isRempli = await db.user.findFirst({
      where: { id: userId },
    });

    if (!isRempli?.numTel || !isRempli?.adresse) {
      return NextResponse.json(
        { error: "Veuillez remplir votre profil avant de continuer" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        succes: false,
        message: "Veuillez completer votre profil avant de continuer",
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
          return NextResponse.json(
            { error: `Product with ID ${productId} not found` },
            { status: 404 }
          );
        }
        if (article.userId === userId) {
          return NextResponse.json(
            { error: "Tu ne peux pas payer ton propre produit" },
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
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      if (article.userId === userId) {
        return NextResponse.json(
          { error: "Tu ne peux pas payer ton propre produit" },
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

    if (payment === "COD") {
      transactionStatus = "attente";
    } else {
      const transaction = await Transaction.retrieve(transactionId);
      transactionStatus = transaction.status;

      // if (transactionStatus !== "approved") {
      //   return NextResponse.json(
      //     { error: "Payment not approved" },
      //     { status: 400 }
      //   );
      // }
    }

    const order = await db.order.create({
      data: {
        userId,
        items: orderItems,
        totalAmount: totalAmount,
        status: payment === "COD" ? "attente" : "payer",
        transactionId: transactionId || null,
      },
    });

    console.log("status: " + transactionStatus);
    return NextResponse.json(
      { order: order, type: transactionStatus },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement" },
      { status: 500 }
    );
  }
}
