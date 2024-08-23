import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

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

    const updatedProduct = await prisma.user.update({
      where: { id: id },
      data: {
        numTel: data.num,
        adresse: data.adresse,
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
