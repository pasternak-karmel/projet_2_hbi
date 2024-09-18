"use client";

import { article_accepte } from "@/actions/accepte_article";
import { useQuery } from "@tanstack/react-query";
import LoaderState from "@/components/Loader";
import { useState } from "react";
import { ToastRessuable } from "@/function/notification-toast";

export default function Confirm({ params }: { params: { id: string } }) {
  const [loadingCOD, setLoadingCOD] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["agent"],
    queryFn: () =>
      fetch(`/api/getLivraison/${params.id}`).then((res) => res.json()),
  });

  if (isLoading) return <LoaderState />;

  if (error) return "An error has occurred: " + error.message;

  const Confirm = async () => {
    setLoadingCOD(true);
    const res = await article_accepte(data.id);
    if (res.error) {
      ToastRessuable({
        titre: "Erreur",
        description: res.error,
      });
    } else {
      ToastRessuable({
        titre: "Succès",
        description: res.success || "",
      });
    }
    setLoadingCOD(false);
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-r from-teal-50 to-teal-100 pt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Détails de la Tâche
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-teal-600">
            {data.nom}
          </h2>
          <p className="text-gray-600 mb-2">
            Nom du Vendeur :{" "}
            <span className="font-medium">{data.User.name}</span>
          </p>
          <p className="text-gray-600 mb-2">
            Lieu de Résidence :{" "}
            <span className="font-medium">{data.User.adresse}</span>
          </p>
          <p className="text-gray-600 mb-2">
            Contact : <span className="font-medium">{data.User.numTel}</span>
          </p>
          <p className="text-gray-600 mb-4">
            Statut :{" "}
            <span
              className={`font-medium ${
                data.status === "ATTENTE" ? "text-yellow-600" : "text-green-600"
              }`}
            >
              {data.status}
            </span>
          </p>
          {/* <Image
            src={data.image?.[0] || "/product.png"}
            alt={data.nom}
            fill
            sizes="25vw"
            className="absolute object-cover rounded-lg"
          /> */}
          {data.agentId !== null ? (
            <div>
              <p>
                Opps le produit n&apos;est plus disponible ou un autre livreur
                vient de le réclamer
              </p>
            </div>
          ) : (
            <div>
              <button
                className={`bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition ${
                  loadingCOD ? "cursor-not-allowed opacity-70" : ""
                }`}
                onClick={Confirm}
                disabled={loadingCOD}
              >
                {loadingCOD ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Je me charge de récupérer le produit"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
