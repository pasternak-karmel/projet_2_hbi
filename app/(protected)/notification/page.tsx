"use client"
import React, { useState } from "react";

interface Commande {
  id: number;
  client: string;
  produit: string;
}

export default function NotificationPage() {
  const [commandes, setCommandes] = useState<Commande[]>([
    { id: 12345, client: "Jean Dupont", produit: "Ordinateur Portable XYZ" },
    { id: 67890, client: "Marie Durand", produit: "Smartphone ABC" },
  ]);

  const addCommande = () => {
    const newCommande: Commande = {
      id: Math.floor(Math.random() * 100000), 
      client: "Nouveau Client",
      produit: "Nouveau Produit",
    };
    setCommandes([...commandes, newCommande]);
  };

  const editCommande = (id: number) => {
    alert(`Édition de la commande ${id}`);
  };

  const confirmCommande = (id: number) => {
    alert(`Commande ${id} confirmée`);
  };

  const rejectCommande = (id: number) => {
    alert(`Commande ${id} refusée`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6">
      <button
        onClick={() => window.history.back()}
        className="text-teal-600 font-semibold underline mb-4"
      >
        Retour
      </button>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Notifications des Commandes</h1>

      <div className="mb-6 text-center">
        <button
          onClick={addCommande}
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
        >
          Ajouter une commande
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {commandes.map((commande) => (
          <div key={commande.id} className="bg-white shadow-md rounded-md p-4 mx-auto w-full max-w-xs">
            <h2 className="text-lg font-semibold mb-2">Commande #{commande.id}</h2>
            <p className="mb-2">Client: {commande.client}</p>
            <p className="mb-4">Produit: {commande.produit}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => confirmCommande(commande.id)}
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
              >
                Confirmer
              </button>
              <button
                onClick={() => rejectCommande(commande.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Refuser
              </button>
              <button
                onClick={() => editCommande(commande.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Éditer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
