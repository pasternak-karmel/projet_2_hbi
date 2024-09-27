import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CreateProduct } from "@/lib/mail";

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Veuillez vous connecter avant de pourvoir continuer",
      },
      { status: 401 }
    );
  }
  const userId = session.user.id;

  try {
    const userProfile = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userProfile?.numTel || !userProfile?.adresse) {
      return NextResponse.json(
        {
          success: false,
          message: "Veuillez remplir votre profil avant de pourvoir continuer",
        },
        { status: 400 }
      );
    }

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
        { success: false, message: "Le prix ne peut être inférieur à 0 XOF" },
        { status: 400 }
      );
    }

    try {
      quantite = parseInt(values.quantite, 10);
      if (isNaN(quantite)) {
        throw new Error("La quantité doit être un nombre valide");
      }
    } catch (error) {
      throw new Error("La quantité doit être un nombre");
    }

    if (quantite < 1) {
      return NextResponse.json(
        { success: false, message: "La quantité ne peut être inférieure à 1" },
        { status: 400 }
      );
    }

    const getCategories = await db.categories.findFirst({
      where: {
        nom: categories,
      },
    });

    const createdCategories =
      getCategories ||
      (await db.categories.create({
        data: { nom: categories },
      }));

    const article = await db.article.create({
      data: {
        nom,
        description,
        usage,
        prix,
        quantite,
        userId,
        image,
        categoriesId: createdCategories.id,
      },
    });

    if (!article) {
      console.log("here article not created");
      return NextResponse.json(
        { success: false, message: "Erreur lors de l'ajout de l'article" },
        { status: 400 }
      );
    }

    await CreateProduct(session.user.email, nom, article.id);

    return NextResponse.json(
      { success: true, message: `L'article ${nom} a été mis en vente` },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: "Une erreur s'est produite" },
      { status: 500 }
    );
  }
}
