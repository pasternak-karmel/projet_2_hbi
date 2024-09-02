import { currentRole, currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { searchParams } = new URL(req.url);
  // const userId = searchParams.get("userId");
  const userId = await currentUserId();
  const { id } = params;

  if (!userId) {
    return NextResponse.json(
      { message: "UserId not provided." },
      { status: 404 }
    );
  }

  const role = await currentRole();

  try {
    const article = await db.article.findUnique({
      where: { id },
      include: {
        User: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found." },
        { status: 404 }
      );
    }

    if (!article.agentId) {
      return NextResponse.json(
        {
          message:
            "No agent assigned to this article. Please wait until the article is accepted.",
        },
        { status: 404 }
      );
    }

    let agentId = null;
    let actualUserId = null;
    if (role === UserRole.AGENT) {
      agentId = userId;
      actualUserId = article.userId;
    } else if (role === UserRole.USER) {
      agentId = article.agentId;
      actualUserId = userId;
    } else {
      return NextResponse.json(
        { message: "Unauthorized access." },
        { status: 403 }
      );
    }

    const messages = await db.message.findMany({
      where: {
        OR: [
          { senderId: actualUserId, receiverId: agentId },
          { senderId: agentId, receiverId: actualUserId },
        ],
        articleId: id,
      },
      orderBy: {
        sentAt: "asc",
      },
    });

    if (messages.length === 0) {
      return NextResponse.json(
        { message: "No messages exchanged yet." },
        { status: 404 }
      );
    }

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return NextResponse.json(
      { error: "Failed to retrieve messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const role = await currentRole();
    const senderId = await currentUserId();
    // console.log(senderId);

    if (role !== UserRole.AGENT && role !== UserRole.USER) {
      return NextResponse.json(
        { message: "Unauthorized access." },
        { status: 403 }
      );
    }

    const { articleId, content } = await req.json();

    if (!articleId || !content) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const article = await db.article.findUnique({
      where: { id: articleId },
    });
    // console.log(article);

    if (!article) {
      return NextResponse.json(
        { message: "Article not found." },
        { status: 404 }
      );
    }

    if (!article.agentId) {
      return NextResponse.json(
        {
          message:
            "No agent assigned to this article. Please wait until the article is accepted.",
        },
        { status: 404 }
      );
    }
    let receiverId;
    if (role === UserRole.AGENT && senderId === article.agentId) {
      receiverId = article.userId;
    } else if (role === UserRole.USER && senderId === article.userId) {
      receiverId = article.agentId;
    } else {
      return NextResponse.json(
        { message: "Unauthorized to send messages for this article." },
        { status: 403 }
      );
    }

    const message = await db.message.create({
      data: {
        articleId,
        senderId,
        receiverId,
        content,
        sentAt: new Date(),
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
