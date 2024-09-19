import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Authenticate the user
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ensure the user has the AGENT role
  const role = await currentRole();

  if (role !== UserRole.AGENT) {
    return NextResponse.json(
      { error: "You're not allowed to be here!" },
      { status: 403 }
    );
  }

  const agentId = session.user.id;

  try {
    // Try to find an article by its ID first
    const articleById = await db.article.findUnique({
      where: { id },
      include: {
        User: true,
        categories: true,
      },
    });

    if (articleById) {
      // If an article is found by its ID, return it
      return NextResponse.json(articleById, { status: 200 });
    }

    // If no article was found by ID, try to find articles by the agentId
    const articlesByAgent = await db.article.findMany({
      where: { agentId },
      include: {
        User: true,
        categories: true,
      },
    });

    if (!articlesByAgent || articlesByAgent.length === 0) {
      return NextResponse.json(
        { error: "No articles found for this agent" },
        { status: 404 }
      );
    }

    // Return the articles assigned to the agent
    return NextResponse.json(articlesByAgent, { status: 200 });
  } catch (error) {
    console.error("Error retrieving article:", error);
    return NextResponse.json(
      { error: "Failed to retrieve articles" },
      { status: 500 }
    );
  }
}
