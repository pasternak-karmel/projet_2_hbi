import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

interface ProduitProps {
  id: any;
  nom: string;
  description?: string;
  usage: boolean;
  prix: number;
  image: string;
  categories: string;
}

const ProduitCard: React.FC<ProduitProps> = ({
  id,
  nom,
  description,
  usage,
  prix,
  image,
  categories,
}) => {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
      <Image
        width={200}
        height={200}
        src={image}
        alt={nom}
        className="w-40 h-40 object-contain rounded-md"
      />
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{nom}</h2>
        <p className="text-gray-500 mt-2">{description}</p>
        <p className="mt-2 text-green-600 font-bold text-lg">Prix: {prix}€</p>
      </div>
      <Link href={`/All-Products/${id}`} passHref>
        <Button className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
          Voir Détails
        </Button>
      </Link>
    </div>
  );
};

export default ProduitCard;
