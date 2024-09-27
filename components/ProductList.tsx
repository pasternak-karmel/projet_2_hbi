"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useAddToCart } from "@/function/ajouter-panier";
import { useState } from "react";
import LoaderState from "@/components/Loader";

export default function ProductList() {
  const { handleAddToCart } = useAddToCart();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["Acceuilproduit"],
    queryFn: () => fetch(`/api/article/getnewproduct`).then((res) => res.json()),
  });

  if (isLoading) return <LoaderState />;
  if (error) return <div>Une erreur s&apos;est produite: {error.message}</div>;

  if (data.articles.length === 0) {
    return <div>Aucun produit disponible pour le moment.</div>;
  }

  const handleSubmit = async (product: string) => {
    setLoadingProductId(product);
    await handleAddToCart(product, 1);
    setLoadingProductId(null);
  };

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-start flex-wrap">
      {data.articles.map((product: any) => (
        <div
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product.id}
        >
          <Link href={"/All-Products/" + product.id}>
            <div className="relative w-full h-80">
              <Image
                src={product.image?.[0] || "/product.png"}
                alt={product.nom}
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
              />
              {product.image && (
                <Image
                  src={product.image?.[0] || "/product.png"}
                  alt={product.nom}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>
          </Link>
          <span className="absolute bottom-4 left-4 text-white text-sm font-medium z-20">
            <div className="flex text-center ">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={
                    data.image ?? "https://source.boringavatars.com/marble/120"
                  }
                  alt={data.image ?? ""}
                />
              </Avatar>
              {data ? data.name : "Vendeur inconnue"}
            </div>
          </span>
          <div className="flex justify-between">
            <span className="font-medium">{product.nom}</span>
            <span className="font-semibold">{product.prix} XOF</span>
          </div>
          <button
            className={`rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs transition-all duration-200 ease-in-out 
              ${
                loadingProductId === product.id
                  ? "bg-gray-500 text-white"
                  : "hover:bg-black hover:text-white"
              }`}
            onClick={() => handleSubmit(product.id)}
            disabled={loadingProductId === product.id}
          >
            {loadingProductId === product.id ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Ajouter au panier"
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
