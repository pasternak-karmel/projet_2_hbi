import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!req || !req.body) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    // console.log(data);

    const updatedProduct = await db.article.update({
      where: { id: id },
      data: {
        nom: data.nom,
        prix: data.prix,
        usage: data.usage,
        quantite: data.quantite,
        description: data.description,
        isDeleted: data.delete,
      },
    });

    return NextResponse.json({ updatedProduct }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating product", error },
      { status: 500 }
    );
  }
}
