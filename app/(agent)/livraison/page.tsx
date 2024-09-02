"use client";

import { useQuery } from "@tanstack/react-query";
import { AgentLivraion } from "@/actions/get-agent-livraison";
import Loader from "@/components/Loader";
import * as React from "react";

export default function Livraison() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["AgentLivraison"],
    queryFn: () => fetch("/api/getLivraison").then((res) => res.json()),
  });

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Une erreur est survenue lors de la récupération des produits:{" "}
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-16 justify-center">
        {Array.isArray(data) &&
          data.map((livraison) => (
            <ul key={livraison.id}>
              <li>
                <h3>{livraison.nom}</h3>
                <p>{livraison.description}</p>
                <p>Prix: {livraison.prix}</p>
                <p>Catégorie: {livraison.categorieNom}</p>
                <p>Quantité: {livraison.quantite}</p>
                <a href={`/livraison/${livraison.id}`}>Voir détails</a>
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
}
