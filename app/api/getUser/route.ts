import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request){
  const values= await req.json();
  const {userId} = values;

try {
  const berenger = await prisma.user.findFirst({
    where: {id: userId}
  })

  if (!berenger){
    return NextResponse.json({error: "utilisateur non trouvé"}, {status: 400})

  }

  return NextResponse.json({user: berenger})
} catch (error) {
  return NextResponse.json({error: "utilisateur non trouvé"}, {status: 500})
}

}