import { auth } from "@/auth";
import { prisma } from "@/utils/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { succes: false, message: "User not authenticated" },
      { status: 401 }
    );
  }
  const userId = session.user.id;

  try {
    const isRempli = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (isRempli?.numTel === null || isRempli?.adresse === null) {
      return NextResponse.json(
        { error: "Veuillez remplir votre profil avant de pourvoir continuer" },
        { status: 400 }
      );
    }
  } catch (error) {}

  try {
    const values = await req.json();
    const { nom, description, usage, categories, image } = values;
    let prix;
    let quantite;

    try {
      prix = parseInt(values.prix, 10);
      if (isNaN(prix)) {
        throw new Error("Le prix doit être un nombre valide");
      }
    } catch (error) {
      throw new Error("Le prix doit être un nombre");
    }
    if (prix < 0) {
      return NextResponse.json(
        { succes: false, message: "Le prix ne peut être inférieur a 0 XOF" },
        { status: 400 }
      );
    }

    try {
      quantite = parseInt(values.quantite, 10);
      if (isNaN(quantite)) {
        throw new Error("La quantite doit être un nombre valide");
      }
    } catch (error) {
      throw new Error("La quantité doit être un nombre");
    }
    if (quantite < 1) {
      return NextResponse.json(
        { succes: false, message: "Le quantite ne peut être inférieur a 1" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // const isExist = await prisma.article.findFirst({
    //   where: { userId, nom },
    // });
    // const isExist = await prisma.article.findFirst({
    //   where: { userId, nom },
    // });

    // if (isExist) {
    //   return NextResponse.json(
    //     { succes: false, message: "Article déjà existant" },
    //     { status: 400 }
    //   );
    // }

    const articles = await prisma.article.create({
      data: {
        nom,
        description,
        usage,
        prix,
        quantite,
        userId,
        image,
        categories: {
          connectOrCreate: {
            where: { nom: categories },
            create: { nom: categories },
          },
        },
      },
    });

    if (!articles) {
      return NextResponse.json(
        { succes: false, message: "Erreur lors de l'ajout de l'article" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { succes: true, message: `L'article ${nom} a été mis en vente` },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { succes: false, message: "Une erreur s'est produite" },
      { status: 500 }
    );
  }
}
