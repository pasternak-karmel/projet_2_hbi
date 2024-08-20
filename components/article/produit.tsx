"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProduitProps {
  product: {
    id: string;
    nom: string;
    prix: number;
    image: string | null;
  };
}

export default function Produit({ product }: ProduitProps) {
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
            Vendor name
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
