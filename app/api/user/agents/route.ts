import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  //   req: NextRequest,
  //   { params }: { params: { id: string } }
  try {
    const agents = await db.user.findMany({
      where: { role: "AGENT" },
      select: { id: true, email: true, name: true },
    });

    if (!agents) {
      return NextResponse.json(
        { message: "Pas d'agent trouvé." },
        { status: 404 }
      );
    }

    if (agents.length === 0) {
      return NextResponse.json(
        { message: "Pas encore d'agent créer" },
        { status: 404 }
      );
    }

    return NextResponse.json(agents);
  } catch (error) {
    console.error("Error retrieving agents:", error);
    return NextResponse.json(
      { error: "Failed to retrieve agents" },
      { status: 500 }
    );
  }
}
