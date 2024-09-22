"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { GetCategories } from "@/actions/categories";
import { ProduitSkeleton } from "@/components/article/ProduitSkeleton";
import { useRouter } from "next/navigation";

const Categories = () => {
  const router = useRouter();
  const {
    data: categories,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => await GetCategories(),
  });

  if (isFetching) {
    return (
      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-16 justify-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProduitSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Failed to load categories</div>;
  }

  const redirect = (nom: string) => {
    router.push(`/categories?nom=${nom}`);
  };

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {categories?.map((category) => {
        const firstArticle = category.articles[0];
        return (
          <div
            key={category.id}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          >
            <Link href={"/categories"}>
              <div className="relative w-full h-80">
                {firstArticle?.image && (
                  <Image
                    src={firstArticle.image[0] || "/product.png"}
                    alt={firstArticle.nom || "Product Image"}
                    fill
                    sizes="25vw"
                    className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-in-out duration-500"
                  />
                )}
                {!firstArticle?.image && (
                  <Image
                    src="/product.png"
                    alt="Default Image"
                    fill
                    sizes="25vw"
                    className="absolute object-cover rounded-md"
                  />
                )}
              </div>
            </Link>
            <button
              className="rounded-2xl ring-1 ring-lama text-lama py-2 px-4 text-xs hover:bg-black hover:text-white text-center items-center"
              onClick={() => redirect(category.nom)}
            >
              {category.nom}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
