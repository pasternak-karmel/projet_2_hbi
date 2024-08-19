"use client"
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
    <div className="group flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <Link
        href={`/All-Products/${product.id}`}
        className="relative w-full h-60 overflow-hidden rounded-lg bg-gray-200"
      >
        <Image
          src={product.image || "/product.png"}
          alt={product.nom}
          fill
          sizes="(min-width: 640px) 25vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-lg"></div>
        <span className="absolute bottom-4 left-4 text-white text-sm font-medium z-10">
          Vendor name
        </span>
      </Link>
      <div className="flex flex-col gap-2">
        <span className="text-lg font-medium">{product.nom}</span>
        <span className="text-xl font-semibold text-gray-800">
          {product.prix} XOF
        </span>
      </div>
      <Button className="self-start mt-auto py-2 px-4 bg-black text-white rounded-full text-xs transition-colors duration-300 hover:bg-gray-800">
        Ajouter au panier
      </Button>
    </div>
  );
}
