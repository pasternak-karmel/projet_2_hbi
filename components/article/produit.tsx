"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import { Avatar, AvatarImage } from "../ui/avatar";

interface ProduitProps {
  product: {
    id: string;
    nom: string;
    prix: number;
    userId: string;
    image: string | null;
  };
}

export default function Produit({ product }: ProduitProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getProduitVendor", product.userId],
    queryFn: () =>
      fetch(`/api/getUser?userId=${product.userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => data.user),
  });
  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <Link
      href={`/All-Products/${product.id}`}
      className="group w-full sm:w-[45%] lg:w-[22%] flex flex-col gap-4"
      key={product.id}
    >
      <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-105">
        <Image
          src={product.image || "/product.png"}
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
            {data ? data.name : "Vendeur inconnue"}
          </div>
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-lg">{product.nom}</span>
        <span className="font-semibold text-xl">{product.prix} XOF</span>
      </div>
      <div className="flex justify-between">
        <button className="rounded-full border border-black text-black w-max py-2 px-6 text-xs transition-colors duration-300 hover:bg-black hover:text-white">
          Ajouter au panier
        </button>
      </div>
    </Link>
  );
}
