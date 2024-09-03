// app/livreur/history.tsx
"use client";

import React, { useState } from "react";
import { format } from "date-fns";

interface Delivery {
  id: number;
  product: string;
  date: Date;
  details: string;
}

const LivreurHistory = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 1,
      product: "Produit 1",
      date: new Date(),
      details: "Livré à 10 rue des Fleurs, Paris.",
    },
    {
      id: 2,
      product: "Produit 2",
      date: new Date(),
      details: "Livré à 25 avenue des Champs, Paris.",
    },
    // Ajouter d'autres livraisons ici
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id: number) => {
    setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
  };

  const handleClick = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
  };

  const filteredDeliveries = deliveries.filter((delivery) =>
    delivery.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen p-6 bg-gray-50 pt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Historique des Livraisons</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-white shadow-lg rounded-lg p-6 transition transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
              onClick={() => handleClick(delivery)}
            >
              <h2 className="text-xl font-semibold mb-2 text-teal-600">
                {delivery.product}
              </h2>
              <p className="text-gray-600 mb-2">
                Date :{" "}
                <span className="font-medium">
                  {format(delivery.date, "dd/MM/yyyy HH:mm")}
                </span>
              </p>
              <button
                // onClick={() => handleDelete(delivery.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Datails
              </button>
            </div>
          ))}
        </div>
        {selectedDelivery && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h2 className="text-2xl font-bold mb-4">{selectedDelivery.product}</h2>
              <p className="mb-4">{selectedDelivery.details}</p>
              <button
                onClick={() => setSelectedDelivery(null)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default LivreurHistory;
