import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.categories.findMany({
      take: 4,
      include: {
        articles: true,
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to retrieve categories" },
      { status: 500 }
    );
  }
}
