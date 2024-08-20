import React, { useEffect, useState } from "react";

import CategoryCard from "@/components/categories-card";

import { categoriesItems } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Categories = () => {
  return (
    // <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
    //   <div className="flex justify-between">
    //     <h1 className="text-2xl">Shop by Catégories</h1>
    //     <Link href="/categories">
    //       <Button variant="link" className="text-muted-foreground">
    //         Show all
    //       </Button>
    //     </Link>
    //   </div>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    //     {categoriesItems.map((category) => (
    //       <CategoryCard
    //         key={category.id}
    //         image={category.image}
    //         name={category.name}
    //         id={category.id}
    //       />
    //     ))}
    //   </div>
    // </div>

    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {/* {res.items.map((product: products.Product) => ( */}
      {categoriesItems.map((category) => (
        <Link
          href={"/categories" + category.id}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={category.id}
        >
          <div className="relative w-full h-80">
            <Image
              src={category.image || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {category.image && (
              <Image
              // src={product.media?.items[1]?.image?.url || "/product.png"}
              src={category.image || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>
          {/* <div className="flex justify-between">
            <span className="font-medium">{category.nom}</span>
            <span className="font-semibold">${category.prix}</span>
          </div> */}
          {/* {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )} */}
          <button className="rounded-2xl ring-1 ring-lama text-lama  py-2 px-4 text-xs hover:bg-black hover:text-white text-center items-center">
            {category.name} 
          </button>
        </Link>
      ))}
    </div>

  );
};
export default Categories;
