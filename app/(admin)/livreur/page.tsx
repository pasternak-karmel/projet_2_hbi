"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LiveurSample from "@/app/(protected)/_components/livreur-sample";
import AddLivreur from "@/app/(protected)/_components/livreur";

export default function LivreurPage() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Livreurs</h1>

      <div className="mb-4 w-full flex items-center justify-between">
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

      <div className="flex flex-wrap gap-x-8 gap-y-16 justify-start">
        <LiveurSample />
      </div>
    </div>
  );
}
