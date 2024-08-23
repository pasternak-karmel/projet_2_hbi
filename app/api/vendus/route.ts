import { auth } from "@/auth";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({});
  }

  const userId = session.user.id;

  try {
    const articles = await prisma.article.findMany({
      where: { userId },
    });

    if (!articles || articles.length === 0) {
      return NextResponse.json(
        { error: "pas d'article trouvé pour vous" },
        { status: 404 }
      );
    }

    const orders = await prisma.order.findMany();

    const soldArticles = articles.map((article) => {
      let totalSold = 0;

      orders.forEach((order) => {
        if (typeof order.items === "string") {
          const items = JSON.parse(order.items);
          const item = items.find((i: any) => i.id === article.id);
          if (item) {
            totalSold += item.quantite;
          }
        }
      });

      return {
        ...article,
        soldQuantity: totalSold,
        remainingQuantity: article.quantite - totalSold,
      };
    });

    return NextResponse.json(soldArticles, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch sold articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch sold articles" },
      { status: 500 }
    );
  }
}
