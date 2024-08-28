import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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

    const userId = article.userId;

    const messages = await db.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: {
        sentAt: "asc",
      },
    });

    if (messages.length === 0) {
      return NextResponse.json(
        { message: "No messages found for this article's user." },
        { status: 404 }
      );
    }

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve messages" },
      { status: 500 }
    );
  }
}
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { content } = await req.json();
  console.log(content);

  try {
    const article = await db.article.findUnique({
      where: { id },
      include: {
        User: true,
      },
    });

    if (!article) {
      console.log("no article found");
      return NextResponse.json(
        { message: "Article not found." },
        { status: 404 }
      );
    }

    if (article.agentId === null) {
      console.log("agent id is null");
      return NextResponse.json(
        { message: "AgentId isn't found." },
        { status: 404 }
      );
    }

    const senderId = article.userId;
    const receiverId = article.agentId;

    const newMessage = await db.message.create({
      data: {
        content,
        senderId,
        receiverId,
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
