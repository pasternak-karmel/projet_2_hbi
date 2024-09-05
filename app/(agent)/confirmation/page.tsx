"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useQuery } from "react-query"; // Assurez-vous que React Query est installé
import axios from "axios";

const ProductConfirmationPage = ({ params }: { params: { taskId: string } }) => {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Requête pour récupérer les détails du produit et du vendeur
  const { data: taskDetails, isLoading } = useQuery(["taskDetails", params.taskId], async () => {
    const response = await axios.get(`/api/tasks/${params.taskId}`);
    return response.data;
  });

  // Simuler la confirmation automatique après le scan du code QR
  useEffect(() => {
    const scannedTaskId = sessionStorage.getItem("scannedTaskId");
    if (scannedTaskId && scannedTaskId === params.taskId) {
      handleSystemConfirmation();
    }
  }, [params.taskId]);

  // Fonction pour confirmer automatiquement après le scan du QR
  const handleSystemConfirmation = () => {
    if (taskDetails) {
      const productMatchesSeller = taskDetails.product.id === taskDetails.seller.productId;
      if (productMatchesSeller) {
        setIsConfirmed(true);
        alert("Produit confirmé automatiquement.");
      } else {
        alert("Erreur de correspondance entre le produit et le vendeur.");
      }
    }
  };

  if (isLoading) {
    return <div>Chargement des informations...</div>;
  }

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
          <p className="text-gray-600 mb-2">Nom du produit : {taskDetails.product.name}</p>
          <p className="text-gray-600 mb-2">Identifiant du produit : {taskDetails.product.id}</p>
          <p className="text-gray-600 mb-2">Description : {taskDetails.product.description}</p>
          <p className="text-gray-600 mb-4">Prix : {taskDetails.product.price} €</p>

          <h2 className="text-xl font-semibold text-teal-600 mb-4">
            Détails du Vendeur
          </h2>
          <p className="text-gray-600 mb-2">Nom du vendeur : {taskDetails.seller.name}</p>
          <p className="text-gray-600 mb-2">Identifiant du vendeur : {taskDetails.seller.id}</p>
          <p className="text-gray-600 mb-2">Lieu de résidence : {taskDetails.seller.address}</p>
          <p className="text-gray-600 mb-4">Contact : {taskDetails.seller.phone}</p>

          {isConfirmed ? (
            <p className="text-green-600 text-lg">Produit confirmé !</p>
          ) : (
            <button
              className="bg-teal-500 text-white px-6 py-3 rounded-lg ring-2 ring-teal-400 hover:bg-teal-600 hover:text-black transition"
              onClick={handleSystemConfirmation}
            >
              Confirmer manuellement
            </button>
          )}
        </div>

        <div className="text-center">
          <button
            className="bg-gray-700 text-white px-6 py-3 rounded-lg ring-2 ring-gray-500 hover:bg-gray-800 transition"
            onClick={() => router.push("/dashboard")}
          >
            Retourner au Dashboard
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductConfirmationPage;
