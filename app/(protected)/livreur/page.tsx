"use client";
import React, { useState } from "react";
import AddLivreur from "../_components/livreur";
import { Button } from "@/components/ui/button";
import LiveurSample from "../_components/livreur-sample";

export default function LivreurPage() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Livreurs</h1>

      <div className="mb-4 w-full flex items-center justify-between">
        <button
          onClick={() => window.history.back()}
          className="text-teal-600 font-semibold underline mb-4"
        >
          Retour
        </button>
        <input
          type="text"
          placeholder="Rechercher un livreur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 w-full sm:w-4/5"
        />
        <AddLivreur>
          <Button> Ajouter un livreur</Button>
        </AddLivreur>
      </div>

      <div className="grid grid-flow-col gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <LiveurSample />
      </div>
    </div>
  );
}
