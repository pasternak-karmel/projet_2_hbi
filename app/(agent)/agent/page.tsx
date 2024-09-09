"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoaderState from "@/components/Loader";
import Livraison_components from "@/app/(agent)/_components/livraison_components";

export default function LivreurDashboard() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["agentPage"],
    queryFn: () => fetch("/api/getLivreur").then((res) => res.json()),
  });

  if (isLoading) return <LoaderState />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="min-h-screen p-6 bg-gradient-to-r from-gray-50 to-gray-200 pt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
          Dashboard des Livreurs
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.articles.map((produit: any) => (
            <Livraison_components key={produit.id} produit={produit} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg ring-2 ring-yellow-400 hover:bg-yellow-600 hover:text-black transition">
            Signaler un problème / Maladie
          </button>
        </div>
      </div>
    </main>
  );
}
