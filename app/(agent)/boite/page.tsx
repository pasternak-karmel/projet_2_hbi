"use client";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import Livraison_components from "../_components/livraison_components";
import { Article } from "@prisma/client";

export default function Boite() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["maBoite"],
    queryFn: () => fetch(`/api/getLivreur/moi`).then((res) => res.json()),
  });

  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="min-h-screen p-6 bg-gradient-to-r from-gray-50 to-gray-200 pt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
          Ma boite de livraison
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((produit: Article) => (
            <Livraison_components produit={produit} />
          ))}
        </div>
      </div>
      <button
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg ring-2 ring-yellow-400 hover:bg-yellow-600 hover:text-black transition justify-center"
          >
            Signaler un problème / Maladie
          </button>
    </main>
  );
}
