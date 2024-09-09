"use client";

import { article_accepte } from "@/actions/accepte_article";
import { useQuery } from "@tanstack/react-query";
import LoaderState from "@/components/Loader";

export default function Confirm({ params }: { params: { id: string } }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["agent"],
    queryFn: () =>
      fetch(`/api/getLivraison/${params.id}`).then((res) => res.json()),
  });

  if (isLoading) return <LoaderState />;

  if (error) return "An error has occurred: " + error.message;

  const Confirm = async () => {
    await article_accepte(data.id);
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
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                onClick={Confirm}
              >
                Je me charge de récupérer le produit
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
