import React, { useEffect, useState } from "react";

import CategoryCard from "@/components/categories-card";

import { categoriesItems } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Categories = () => {
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
  );
};
export default Categories;
