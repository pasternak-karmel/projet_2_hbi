"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductImages from "@/components/ProductImages";
import Add from "@/components/Add";
import SelectAgent from "../../_components/select-agent";
import LoaderState from "@/components/Loader";
import { produit } from "@/actions/my_api";

export default function ArticlesSpecifiquePage({
  params,
}: {
  params: { id: string };
}) {
  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => produit(params.id),
  });

  if (isLoading) return <LoaderState />;
  if (error) return <div>Error: {error.message}</div>;

  if (!product) {
    return (
      <div className="container mx-auto my-8 p-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Product not found.
        </h2>
        <p className="mt-4 text-gray-600">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link href="/All-Products">
          <Button className="mt-6 bg-blue-500 text-white">
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.image} />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.nom}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        <h2 className="font-medium text-2xl">{product.prix} XOF</h2>
        <p className="mt-2 text-gray-500">
          Condition:{" "}
          {product.usage
            ? "Ce produit a été déjà utilisé au moins une fois"
            : "Nouveau, jamais utilisé"}
        </p>
        <div className="h-[2px] bg-gray-100" />
        <Add stockNumber={product.quantite} productId={product.id!} />
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm" key={product.nom}>
          <h4 className="font-medium mb-4">{product.nom}</h4>
          <p>
            Le systeme s&apos;assure de le livrason et de la qualitée des
            produits et une vitesse de livraison sans pareil
          </p>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading...">
          {product.agentId !== null ? (
            <div className="p-7">Ce produit est déjà attribué a un agent</div>
          ) : (
            <SelectAgent article={params.id} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
