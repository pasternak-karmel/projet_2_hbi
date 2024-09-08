"use client";

import Image from "next/image";
import Link from "next/link";
import { CategoriesProp } from "@/types";
import Collection from "../_components/collection";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { AllCategorie } from "@/actions/my_api";
import LoaderState from "@/components/Loader";

export default function Categories() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["AllCategorie"],
    queryFn: () => AllCategorie(),
  });

  if (isLoading) return <LoaderState />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col  w-full">
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-12 ">
        {data.categories.map((category: CategoriesProp) => (
          <div
            key={category.id}
            className="flex-none w-full bg-white rounded-lg  text-center text-sm "
          >
            <h2 className="text-lg font-bold py-4  text-left ">
              {category.nom}
            </h2>
            <div className="flex gap-6 mt-12  flex-wrap gap-x-8 gap-y-16 ">
              {category.articles.map((item) => (
                <Link
                  href={"/All-Products/" + item.id}
                  key={item.id}
                  className="block"
                >
                  <div className="relative w-80 h-80 mb-4 ">
                    <Image
                      src={item.image?.[0] || "/product.png"}
                      alt={item.nom || "Image de produit"}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="absolute object-cover rounded-lg  to-black shadow-lg transition-transform duration-500 group-hover:scale-105 sm:w-[45%] lg:w-[22%]"
                    />
                  </div>
                  <button className="mt-4 rounded-2xl ring-1 ring-lama text-lama py-2 px-4 text-xs hover:bg-black hover:text-white text-left">
                    Acheter
                  </button>
                  <button className="py-2 px-4 text-bold  text-right w-64">
                    {item.nom} {item.prix} XOF
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 w-full">
        <Collection />
      </div>
    </div>
  );
}
