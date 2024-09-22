"use server";

import { db } from "@/lib/db";

export const GetCategories = async () => {
  const categories = await db.categories.findMany({
    include: {
      articles: true,
    },
  });

  const shuffledArticles = categories.sort(() => 0.5 - Math.random());

  const featuredArticles = shuffledArticles.slice(0, 4);

  return featuredArticles;
};
