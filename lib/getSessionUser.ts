"use server";
import { auth } from "@/auth";

export default async function GetUser() {
  const session = await auth();
  if (!session) return;
  return session?.user;
}
