"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoaderState from "@/components/Loader";

export default function UserPurchases() {
  const {
    isLoading,
    error,
    data: purchases,
  } = useQuery({
    queryKey: ["achats"],
    queryFn: () => fetch(`/api/achats`).then((res) => res.json()),
  });

  if (isLoading) return <LoaderState />;

  if (error)
    return (
      <div className="text-red-500 text-center">
        Une erreur est subvenue lors de la récupération de vos achats
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Mes Achats
      </h1>
      {purchases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {purchases.map((order: any) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow transform hover:-translate-y-1"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Order ID: {order.id}
                </h2>
                <p className="text-gray-600 mb-2">
                  Total Amount:{" "}
                  <span className="font-medium">{order.totalAmount} XOF</span>
                </p>
                <p className="text-gray-600">
                  Status: <span className="font-medium">{order.status}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Vous n&apos;avez pas encore effectué d&apos;achats. Allez-y et
          choisissez votre prochain coup de coeur
        </div>
      )}
    </div>
  );
}
