"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import LoaderState from "@/components/Loader";
import { useState } from "react";
import { MessageriesButton } from "@/components/messageries/messageries";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  nom: string;
  description: string;
  prix: number;
  quantite: number;
  image: string[];
  User: {
    name: string;
    email: string;
    adresse: string;
    numTel: number;
  };
  categories: {
    nom: string;
  };
}

export default function BoiteId({ params }: { params: { id: string } }) {
  const {
    isLoading,
    error,
    data: article,
  } = useQuery({
    queryKey: ["boiteId"],
    queryFn: () =>
      fetch(`/api/user/agent/${params.id}`).then((res) => res.json()),
  });
  if (isLoading) return <LoaderState />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-8">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {article.image.length > 0 ? (
              <div className="space-y-4">
                {article.image.map((imgUrl: string, index: number) => (
                  <Image
                    key={index}
                    src={imgUrl}
                    alt={`Image ${index + 1} of ${article.nom}`}
                    width={400}
                    height={400}
                    className="object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            ) : (
              <p>Pas d&apos;image trouver.</p>
            )}
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{article.nom}</h1>
            <p className="text-lg text-gray-700">{article.description}</p>

            <div className="flex items-center space-x-4">
              <p className="text-2xl font-bold text-green-600">
                {article.prix} XOF
              </p>
              <p className="text-md text-gray-600">
                Quantité: {article.quantite}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Catégorie:</p>
              <p className="font-medium text-indigo-600">
                {article.categories.nom}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Informations sur le vendeur
              </h3>
              <p>
                <strong>Nom: </strong>
                {article.User.name}
              </p>
              <p>
                <strong>Email: </strong>
                {article.User.email}
              </p>
              <p>
                <strong>Adresse: </strong>
                {article.User.adresse}
              </p>
              <p>
                <strong>Téléphone: </strong>
                {article.User.numTel}
              </p>
            </div>

            <div className="flex space-x-4 mt-6">
              <MessageriesButton asChild produit={params.id} mode="redirect">
                <Button>Contacter le vendeur</Button>
              </MessageriesButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
