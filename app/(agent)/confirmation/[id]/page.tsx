"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { RadioGroupForm } from "../../_components/radio-agent";
import LoaderState from "@/components/Loader";

const ProductConfirmationPage = ({ params }: { params: { id: string } }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["confirmationPage"],
    queryFn: () =>
      fetch(`/api/article/getProduit/${params.id}`).then((res) => res.json()),
  });

  if (isLoading) return <LoaderState />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="min-h-screen p-6 bg-gray-50 pt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Confirmation du Produit
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <h2 className="text-xl font-semibold text-teal-600 mb-4">
            Détails du Produit
          </h2>
          <p className="text-gray-600 mb-2">Nom du produit : {data.nom}</p>
          <h2 className="text-xl font-semibold text-teal-600 mb-4">
            Détails du Vendeur
          </h2>
          <p className="text-gray-600 mb-2">Nom du vendeur : {data.nom}</p>
        </div>
        {data.isRecu === true ? (
          <div>Ce produit a été déja reçu</div>
        ) : (
          <RadioGroupForm produit={params.id} />
        )}
      </div>
    </main>
  );
};

export default ProductConfirmationPage;
