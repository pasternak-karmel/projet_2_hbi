"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { RadioGroupForm } from "../../_components/radio-agent";

const ProductConfirmationPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { isLoading, error, data } = useQuery({
    queryKey: ["confirmationPage"],
    queryFn: () => fetch(`/api/getProduit/${params.id}`).then((res) => res.json()),
  });

  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  const handleConfirm = () => {
    if (window.confirm("Êtes-vous sûr de vouloir valider ce produit ?")) {
      router.push("/agent");
    }
  };

  const handleReject = () => {
    if (window.confirm("Êtes-vous sûr de vouloir rejeter ce produit ?")) {
      router.push("/agent");
    }
  };


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
          {/* <p className="text-gray-600 mb-2">Identifiant du produit : {data.product.id}</p>
          <p className="text-gray-600 mb-2">Description : {data.product.description}</p>
          <p className="text-gray-600 mb-4">Prix : {data.product.price} €</p> */}

          <h2 className="text-xl font-semibold text-teal-600 mb-4">
            Détails du Vendeur
          </h2>
          <p className="text-gray-600 mb-2">Nom du vendeur : {data.nom}</p>
          {/* <p className="text-gray-600 mb-2">Identifiant du vendeur : {data.seller.id}</p>
          <p className="text-gray-600 mb-2">Lieu de résidence : {data.seller.address}</p>
          <p className="text-gray-600 mb-4">Contact : {data.seller.phone}</p> */}

          {/* {isConfirmed ? (
            <p className="text-green-600 text-lg">Produit confirmé !</p>
          ) : (
            <button
              className="bg-teal-500 text-white px-6 py-3 rounded-lg ring-2 ring-teal-400 hover:bg-teal-600 hover:text-black transition"
              onClick={handleSystemConfirmation}
            >
              Confirmer manuellement
            </button>
          )} */}
        </div>

        {/* <div className="text-center space-x-4">
          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-6 py-3 rounded-lg ring-2 ring-red-400 hover:bg-red-600 transition"
          >
            Rejeter
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white px-6 py-3 rounded-lg ring-2 ring-green-400 hover:bg-green-600 transition"
          >
            Valider
          </button>
        </div> */}
        <RadioGroupForm />
      </div>
    </main>
  );
};

export default ProductConfirmationPage;
