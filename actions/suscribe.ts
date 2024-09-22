"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const Suscribe = async () => {
  const session = await auth();

  const categories = await db.categories.findMany({
    include: {
      articles: true,
    },
  });

  return categories;
};
