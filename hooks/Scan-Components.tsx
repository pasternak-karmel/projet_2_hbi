"use client";
import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter, useSearchParams } from "next/navigation";

interface Scanner {
    produitId : string;
}

const QRScannerPage = ({produitId} : Scanner) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');

  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = (result: string | null) => {
    if (result) {
      setScanResult(result);
    //   sessionStorage.setItem('scannedTaskId', taskId || '');
    //   alert("QR Code scanné avec succès !");
    //   router.push('/agent');
    console.log(result)
    }
  };

  const handleError = (err: any) => {
    setError("Erreur lors de l'accès à la caméra. Veuillez vérifier les permissions.");
    console.error(err);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Scanner QR Code</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <QrReader
          onResult={(result, error) => {
            if (result) handleScan(result.getText());
            if (error) handleError(error);
          }}
          constraints={{ facingMode: "environment" }}
          className="w-full h-64 mb-4"
        />
        {scanResult ? (
          <p className="text-green-500 text-lg font-semibold">Résultat : {scanResult}</p>
        ) : (
          <p className="text-gray-600">Aucun QR Code scanné.</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default QRScannerPage;
