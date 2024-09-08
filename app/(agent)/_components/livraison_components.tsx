"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface LivraisonProps {
  produit: any;
}
export default function Livraison_components({ produit }: LivraisonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleViewDetails = (produitId: number) => {
    let redirection;
    if (pathname === "/boite") {
      redirection = "boite";
    } else {
      redirection = "agent";
    }
    router.push(`/${redirection}/${produitId}`);
  };
  const handleQRCodeScan = (produitId: number) => {
    sessionStorage.setItem("scannedproduitId", produitId.toString());
    router.push(`/scan/${produitId}`);
  };
  return (
    <div
      key={produit.id}
      className="bg-white shadow-lg rounded-lg p-6 transition transform hover:-translate-y-1 hover:shadow-2xl"
    >
      <h2 className="text-xl font-semibold mb-2 text-teal-600">
        Produits: {produit.Articlenom}
      </h2>
      <p className="text-gray-600 mb-2">
        Nom du Vendeur : <span className="font-medium">{produit.usernom}</span>
      </p>
      <p className="text-gray-600 mb-2">
        Lieu de Résidence :{" "}
        <span className="font-medium">{produit.adresse}</span>
      </p>
      <p className="text-gray-600 mb-2">
        Contact : <span className="font-medium">{produit.contact}</span>
      </p>
      <p className="text-gray-600 mb-4">
        Statut :{" "}
        <span
          className={`font-medium ${
            produit.status === "ATTENTE" ? "text-yellow-600" : "text-green-600"
          }`}
        >
          {produit.status}
        </span>
      </p>
      <div className="flex space-x-3">
        {/* <Link
          href={`/agent/${produit.id}`}
          className="flex-1 bg-indigo-600 text-white text-center px-4 py-2 rounded-lg hover:bg-indigo-900 transition text-sm"
        > */}
          <button
            className="flex-1 bg-indigo-600 text-white text-center px-4 py-2 rounded-lg hover:bg-indigo-900 transition text-sm"
            onClick={() => handleViewDetails(produit.id)}
          >
            Détails
          </button>
        {/* </Link> */}
        {pathname === "/boite" && (
          <button
            className="flex-1 bg-neutral-700 ring-2 ring-slate-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition"
            onClick={() => handleQRCodeScan(produit.id)}
          >
            Scanner QR Code
          </button>
        )}
      </div>
    </div>
  );
}
