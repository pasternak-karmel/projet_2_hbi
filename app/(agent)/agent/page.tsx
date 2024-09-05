"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Livraison_components from "@/app/(agent)/_components/livraison_components";

export default function LivreurDashboard() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["agent"],
    queryFn: () => fetch("/api/getLivreur").then((res) => res.json()),
  });

  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="min-h-screen p-6 bg-gradient-to-r from-gray-50 to-gray-200 pt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
          Dashboard du Livreur
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.articles.map((produit: any) => (
            <Livraison_components produit={produit} />
          ))}
        </div>
        <div className="mt-8 text-center">
        </div>
      </div>
    </main>
  );
}
