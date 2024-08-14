"use client";
import React from "react";
import { useRouter } from "next/router";

import { useSearchParams } from "next/navigation";
import { produitItems } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ProductPage: React.FC = () => {
    const searchParams = useSearchParams()
  const router = useRouter();
  const { id } = router.query;

  const product = produitItems.find((item) => item.id === Number(id));

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="flex flex-col md:flex-row md:items-center bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-center md:w-1/2">
          <Image
            width={400}
            height={400}
            src={product.image}
            alt={product.nom}
            className="w-full h-auto object-contain rounded-md"
          />
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 md:ml-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.nom}
          </h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-4 text-xl text-green-600 font-bold">
            Prix: {product.prix}XOF
          </p>
          <p className="mt-2 text-gray-500">Category: {product.categories}</p>
          <p className="mt-2 text-gray-500">
            Usage: {product.usage ? "Used" : "New"}
          </p>
          <div className="mt-6">
            <Button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
