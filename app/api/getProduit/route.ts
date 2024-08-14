import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
// import { getSession } from "next-auth/react";

export async function GET(request: Request) {
  //   const session = await getSession();

  //   if (!session || !session.user) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }

  //   const userId = session.user.id;
  const userId = "66ba12bc2ac1d22de85c617b";

  try {
    const articles = await prisma.article.findMany({
      where: { userId },
      include: {
        categories: true,
      },
    });

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving articles:", error);
    return NextResponse.json(
      { error: "Failed to retrieve articles" },
      { status: 500 }
    );
  }
}
