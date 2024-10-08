"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { produit } from "@/actions/my_api";
import LoaderState from "@/components/Loader";

export default function ProductPage({ params }: { params: { id: string } }) {
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
  return (
    <div className="container mx-auto p-8">
      <div className="relative w-full h-96 bg-gray-100 rounded-lg shadow-lg">
        <Image
          src={product.image}
          alt={product.nom}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
          <h1 className="text-3xl font-bold text-white">{product.nom}</h1>
          <p className="text-lg text-white">{product.categories}</p>
          <span
            className={cn(
              "inline-block px-3 py-1 mt-2 rounded-full text-xs font-medium",
              product.usage
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            )}
          >
            {product.usage ? "Used" : "New"}
          </span>
        </div>

        <div className="absolute top-4 right-4 space-y-2">
          <Link href={`/edit/${product.id}`}>Edit Product</Link>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700">
            Delete Product
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700">
            Duplicate Product
          </button>
        </div>
      </div>

      <Tabs defaultValue="account" className="mt-8 w-[700px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Product Overview</h2>
            <p>{product.description}</p>
          </div>
        </TabsContent>

        <TabsContent value="pricing">
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Pricing</h2>
            <p>Current Price: ${product.prix.toFixed(2)}</p>
            <input
              type="number"
              className="mt-2 p-2 border rounded-lg"
              placeholder="Update Price"
            />
          </div>
        </TabsContent>

        <TabsContent value="inventory">
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Inventory</h2>
            <p>Stock:</p>
            <input
              type="number"
              className="mt-2 p-2 border rounded-lg"
              placeholder="Update Stock"
            />
          </div>
        </TabsContent>

        <TabsContent value="images">
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Images</h2>
            <p>Manage product images here.</p>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Settings</h2>
            <p>Manage product visibility and SEO settings here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
