"use client";

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
        Produits: {produit.Articlenom || produit.nom}
      </h2>
      <p className="text-gray-600 mb-2">
        Nom du Vendeur :{" "}
        <span className="font-medium">
          {produit.usernom || produit.userName}
        </span>
      </p>
      <p className="text-gray-600 mb-2">
        Lieu de Résidence :{" "}
        <span className="font-medium">
          {produit.adresse || produit.userAdresse}
        </span>
      </p>
      <p className="text-gray-600 mb-2">
        Contact :{" "}
        <span className="font-medium">
          {produit.contact || produit.userNum}
        </span>
      </p>
      <p className="text-gray-600 mb-4">
        Statut :{" "}
        <span
          className={`font-medium ${
            produit.status === "REFUS" ? "text-red-700" : "text-green-600"
          }`}
        >
          {produit.status}
        </span>
      </p>
      <div className="flex space-x-3">
        <button
          className="flex-1 bg-indigo-600 text-white text-center px-4 py-2 rounded-lg hover:bg-indigo-900 transition text-sm"
          onClick={() => handleViewDetails(produit.id)}
        >
          Détails
        </button>
        {pathname === "/boite" &&
          (produit.status === "REFUS" || !produit.isRecu) && (
            <button
              className={`flex-1 bg-neutral-700 ring-2 ring-slate-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition ${
                produit.status === "REFUS" ? "hover:cursor-not-allowed" : ""
              }`}
              disabled={produit.status === "REFUS"}
              onClick={() => handleQRCodeScan(produit.id)}
            >
              Scanner QR Code
            </button>
          )}
      </div>
    </div>
  );
}
