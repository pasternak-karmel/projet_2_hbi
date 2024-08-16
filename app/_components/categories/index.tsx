import React, { useEffect, useState } from "react";

import CategoryCard from "@/components/categories-card";

import { CategoriesProps, categoriesItems } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Categories = () => {
  // const [categories, setCategories] = useState<CategoriesProps[]>([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const response = await fetch("/api/Categories");
  //     const data = await response.json();
  //     setCategories(data.categories);
  //   };

  //   fetchCategories();
  // }, []);
  return (
    <div className="mt-5 w-full h-auto flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-2xl">Shop by Catégories</h1>
        <Link href="/categories">
          <Button variant="link" className="text-muted-foreground">
            Show all
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoriesItems.map((category) => (
          <CategoryCard
            key={category.id}
            image={category.image}
            name={category.name}
            id={category.id}
          />
        ))}
      </div>

    </div>

    // <div className="container mx-auto my-8">
    //   <h1 className="text-2xl font-bold mb-4">Shop by Categories</h1>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    //     {produitItems.map((category) => (
    //       <CategoryCard
    //         key={category.id}
    //         image={category.image}
    //         name={category.name}
    //       />
    //     ))}
    //   </div>
    //   <div className="flex justify-end mt-4">
    //     <a href="/all-categories" className="text-blue-500 hover:underline">
    //       Show All
    //     </a>
    //   </div>
    // </div>
  );
};
export default Categories;
