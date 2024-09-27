import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email requis." },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findFirst({
      where: { email },
    });

    if (existingUser && existingUser.isSuscribed) {
      return NextResponse.json({
        success: false,
        message: "Vous êtes déjà abonné.",
      });
    }

    if (existingUser) {
      await db.user.update({
        where: { email },
        data: { isSuscribed: true },
      });
    } else {
      await db.user.create({
        data: {
          email,
          isSuscribed: true,
        },
      });
    }

    return NextResponse.json({ success: true, message: "Abonnement réussi !" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur." },
      { status: 500 }
    );
  }
}
