"use client";
import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import ProductImages from "@/components/ProductImages";
import Add from "@/components/Add";
import { useCurrentRole } from "@/hooks/use-current-role";
import { produit } from "@/actions/my_api";
import LoaderState from "@/components/Loader";

export default function ProductSpecificPage({
  params,
}: {
  params: { id: string };
}) {
  const role = useCurrentRole();

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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/All-Products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.nom}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ProductImages items={product.image} />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.nom}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        <h2 className="font-medium text-2xl">{product.prix} XOF</h2>
        <p className="mt-2 text-gray-500">
          <span className="font-bold underline-offset-2 text-black">Condition: </span>
          {product.usage
            ? "Ce produit a été déjà utilisé au moins une fois"
            : "Nouveau, jamais utilisé"}
        </p>
        <div className="h-[2px] bg-gray-100" />
        {role === "ADMIN" ? (
          <div className="flex flex-col">
            <p>Quantité restante: {product.quantite}</p>
            <p>Action</p>
            <div className="grid grid-cols-2 gap-6">
              <Button>vendu déjà</Button>
              <Button>Contacter le vendeur</Button>
            </div>
          </div>
        ) : (
          <Add stockNumber={product.quantite} productId={product.id!} />
        )}
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm" key={product.nom}>
          <h4 className="font-medium mb-4">{product.nom}</h4>
          <p>
            Le systeme s&apos;assure de le livrason et de la qualitée des
            produits et une vitesse de livraison sans pareil
          </p>
        </div>
        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        {role !== "ADMIN" && (
          <div>
            <h1 className="text-2xl">User Reviews</h1>
            <Suspense fallback="Loading...">
              {/* <Reviews productId={product.id!} /> */}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
