"use client";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/function/ajouter-panier";
import { useState } from "react";
import { ProduitSkeleton } from "./ProduitSkeleton";
import { getProduitVendor } from "@/actions/my_api";

interface ProduitProps {
  product: {
    id: string;
    nom: string;
    prix: number;
    userId: string;
    image: string[] | null;
  };
}

export default function Produit({ product }: ProduitProps) {
  const { handleAddToCart } = useAddToCart();
  const role = useCurrentRole();
  const [loadingProduct, setLoadingProduct] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["getProduitVendor", product.userId],
    queryFn: () => getProduitVendor(product.userId),
    // fetch(`/api/getUser?userId=${product.userId}`)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(`Error: ${res.statusText}`);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => data.user),
  });


  const handleSubmit = async () => {
    setLoadingProduct(true);
    await handleAddToCart(product.id, 1);
    setLoadingProduct(false);
  };

  if (isLoading) return <ProduitSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      className="group w-full sm:w-[45%] lg:w-[22%] flex flex-col gap-4"
      key={product.id}
    >
      <Link href={`/All-Products/${product.id}`}>
        <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-105">
          <Image
            src={product.image?.[0] || "/product.png"}
            alt={product.nom}
            fill
            sizes="25vw"
            className="absolute object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-lg"></div>
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
              {data ? data.name : "Vendeur inconnu"}
            </div>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-lg">{product.nom}</span>
          <span className="font-semibold text-xl">{product.prix} XOF</span>
        </div>
      </Link>

      <div className="flex justify-between">
        {role !== "ADMIN" ? (
          <button
            className={`rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs transition-all duration-200 ease-in-out 
           ${
             loadingProduct
               ? "bg-gray-500 text-white"
               : "hover:bg-black hover:text-white"
           }`}
            onClick={handleSubmit}
            disabled={loadingProduct}
          >
            {loadingProduct ? (
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
        ) : (
          <Button variant="link">Voir le produit</Button>
        )}
      </div>
    </div>
  );
}
