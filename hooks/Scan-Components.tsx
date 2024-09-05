"use client";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter, useSearchParams } from "next/navigation";
import { scan_produit } from "@/actions/scan_qr";
import axios from "axios";

interface Scanner {
  produitId: string;
}

const QRScannerPage = ({ produitId }: Scanner) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  const handleScan = async (result: string | null) => {
    if (result && isScanning) {
      setScanResult(result);
      setIsScanning(false); // Désactiver le scanner après le scan
      try {
        await scan_produit(produitId, result);
        router.push(`/confirmation?taskId=${taskId}`); // Redirection vers la page de confirmation
      } catch (err) {
        setError("Erreur lors de la confirmation du produit.");
        console.error(err);
      }
    }
  };

  const handleError = (err: any) => {
    setError("Erreur lors de l'accès à la caméra. Veuillez vérifier les permissions.");
    console.error(err);
  };

  const handleResetScan = () => {
    setError(null);
    setIsScanning(true); // Réactiver le scanner pour un nouvel essai
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Scanner QR Code</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="relative">
          {isScanning ? (
            <>
              <QrReader
                onResult={(result, error) => {
                  if (result) handleScan(result.getText());
                  if (error) handleError(error);
                }}
                constraints={{ facingMode: "environment" }}
                className="w-full h-64 mb-4 rounded-lg mx-auto" // Bien centrer la caméra
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-transparent border-r-teal-500 border-l-teal-500 animate-pulse"></div>
            </>
          ) : (
            <div className="text-center mb-4">
              {scanResult ? (
                <p className="text-green-500 text-lg font-semibold">
                  Résultat : {scanResult}
                </p>
              ) : (
                <p className="text-gray-600">Aucun QR Code scanné.</p>
              )}
              {error && (
                <div>
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={handleResetScan}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Scanner à nouveau
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScannerPage;
