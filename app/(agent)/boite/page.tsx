"use client";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import Livraison_components from "../_components/livraison_components";
import { Article } from "@prisma/client";
import { useRouter } from "next/navigation"; // Importer le useRouter

export default function Boite() {
  const router = useRouter(); // Initialiser useRouter
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
          Ma Boîte de Livraison
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((produit: Article) => (
            <Livraison_components key={produit.id} produit={produit} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full ring-4 ring-indigo-300 hover:bg-gradient-to-l hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 shadow-lg transform hover:scale-105"
            onClick={() => router.push("/contact")} // Redirection vers la page contact
          >
            Signaler un problème / Maladie
          </button>
        </div>
      </div>
    </main>
  );
}
