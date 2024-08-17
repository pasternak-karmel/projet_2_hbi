import { auth } from "@/auth";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { succes: false, message: "User not authenticated" },
      { status: 401 }
    );
  }
  try {
    const values = await req.json();
    const { nom, description, usage, categories, image } = values;
    let prix;

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

    // const userId = "66ba12bc2ac1d22de85c617b";
    const userId = session.user.id;

    const isExist = await prisma.article.findFirst({
      where: { userId, nom },
    });

    if (isExist) {
      return NextResponse.json(
        { succes: false, message: "Article déjà existant" },
        { status: 400 }
      );
    }

    const articles = await prisma.article.create({
      data: {
        nom,
        description,
        usage,
        prix,
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
