"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';

// const LivreurDashboard = () => {
//   const router = useRouter();
//   const [tasks, setTasks] = useState([
//     { id: 1, name: 'Livraison à 10 rue des Fleurs', timeLeft: '30 minutes', status: 'En cours' },
//     { id: 2, name: 'Livraison à 25 avenue des Champs', timeLeft: '1 heure', status: 'En attente' },
//     { id: 3, name: 'Livraison à 50 boulevard de la Liberté', timeLeft: '45 minutes', status: 'En attente' },
//   ]);

export default function LivreurDashboard() {
  const router = useRouter();
  const { isLoading, error, data } = useQuery({
    queryKey: ["agent"],
    queryFn: () => fetch("/api/getLivreur").then((res) => res.json()),
  });

  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  const handleQRCodeScan = (produitId: number) => {
        sessionStorage.setItem('scannedproduitId', produitId.toString());
        router.push(`/scan/${produitId}`);
      };
    
      const handleViewDetails = (produitId: number) => {
        router.push(`/agent/${produitId}`);
      };

  return(
    <main className="min-h-screen p-6 bg-gradient-to-r from-gray-50 to-gray-200 pt-20">
           <div className="container mx-auto p-4">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Dashboard du Livreur</h1>
             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             {data.articles.map((produit: any) => (
                <div key={produit.id} className="bg-white shadow-lg rounded-lg p-6 transition transform hover:-translate-y-1 hover:shadow-2xl">
                <h2 className="text-xl font-semibold mb-2 text-teal-600">Produits: {produit.Articlenom}</h2>
                <p className="text-gray-600 mb-2">Nom du Vendeur : <span className="font-medium">{produit.usernom}</span></p>
                <p className="text-gray-600 mb-2">Lieu de Résidence : <span className="font-medium">{produit.adresse}</span></p>
                <p className="text-gray-600 mb-2">Contact : <span className="font-medium">{produit.contact}</span></p>
                {/* <p className="text-gray-600 mb-2">Temps restant : <span className="font-medium">{produit.timeLeft}</span></p> */}
                <p className="text-gray-600 mb-4">Statut : <span className={`font-medium ${produit.status === 'En attente' ? 'text-green-600' : 'text-yellow-600'}`}>En attente</span></p>
                {/* <p className="text-gray-600 mb-4">Statut : <span className={`font-medium ${produit.status === 'En attente' ? 'text-green-600' : 'text-yellow-600'}`}>{produit.status}</span></p> */}
                <div className="flex space-x-3">
                  <button
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
                    onClick={() => handleViewDetails(produit.id)}
                  >
                    Détails
                  </button>
                  <button
                    className="flex-1 bg-neutral-700 ring-2 ring-slate-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition"
                    onClick={() => handleQRCodeScan(produit.id)}
                  >
                    Scanner QR Code
                  </button>
                </div>
              </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg ring-2 ring-yellow-400 hover:bg-yellow-600 hover:text-black transition"
                // onClick={handleReportProblem}
              >
                Signaler un problème / Maladie
              </button>
              {/* {problemReported && (
                <p className="mt-4 text-red-500 text-lg">
                  Problème signalé. L'administration a été informée.
                </p>
              )} */}
            </div>
          </div>
        </main>
  )
}
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const LivreurDashboard = () => {
//   const router = useRouter();
//   const [produits, setproduits] = useState([
//     { id: 1, productName: 'Produit A', sellerId: 'V001', sellerName: 'John Doe', sellerLocation: '10 rue des Fleurs', sellerContact: '123-456-789', timeLeft: '30 minutes', status: 'En cours' },
//     { id: 2, productName: 'Produit B', sellerId: 'V002', sellerName: 'Jane Smith', sellerLocation: '25 avenue des Champs', sellerContact: '987-654-321', timeLeft: '1 heure', status: 'En attente' },
//     { id: 3, productName: 'Produit C', sellerId: 'V003', sellerName: 'Bob Johnson', sellerLocation: '50 boulevard de la Liberté', sellerContact: '555-123-456', timeLeft: '45 minutes', status: 'En attente' },
//   ]);

//   const [problemReported, setProblemReported] = useState(false);

//   useEffect(() => {
//     const scannedproduitId = sessionStorage.getItem('scannedproduitId');
//     if (scannedproduitId) {
//       setproduits(produits.map(produit =>
//         produit.id === parseInt(scannedproduitId) ? { ...produit, status: 'Fait' } : produit
//       ));
//       sessionStorage.removeItem('scannedproduitId');
//     }
//   }, [produits]);

//   const handleReportProblem = () => {
//     setProblemReported(true);
//     alert("Problème signalé à l'administration.");
//   };

//   const handleQRCodeScan = (produitId: number) => {
//     sessionStorage.setItem('scannedproduitId', produitId.toString());
//     router.push(`/scan/${produitId}`);
//   };

//   const handleViewDetails = (produitId: number) => {
//     router.push(`/agent/${produitId}`);
//   };

//   return (
//     <main className="min-h-screen p-6 bg-gradient-to-r from-gray-50 to-gray-200 pt-20">
//       <div className="container mx-auto p-4">
//         <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Dashboard du Livreur</h1>
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {produits.map(produit => (
//             <div key={produit.id} className="bg-white shadow-lg rounded-lg p-6 transition transform hover:-translate-y-1 hover:shadow-2xl">
//               <h2 className="text-xl font-semibold mb-2 text-teal-600">{produit.productName}</h2>
//               <p className="text-gray-600 mb-2">Nom du Vendeur : <span className="font-medium">{produit.sellerName}</span></p>
//               <p className="text-gray-600 mb-2">Lieu de Résidence : <span className="font-medium">{produit.sellerLocation}</span></p>
//               <p className="text-gray-600 mb-2">Contact : <span className="font-medium">{produit.sellerContact}</span></p>
//               <p className="text-gray-600 mb-2">Temps restant : <span className="font-medium">{produit.timeLeft}</span></p>
//               <p className="text-gray-600 mb-4">Statut : <span className={`font-medium ${produit.status === 'En cours' ? 'text-green-600' : 'text-yellow-600'}`}>{produit.status}</span></p>
//               <div className="flex space-x-3">
//                 <button
//                   className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
//                   onClick={() => handleViewDetails(produit.id)}
//                 >
//                   Détails
//                 </button>
//                 <button
//                   className="flex-1 bg-neutral-700 ring-2 ring-slate-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition"
//                   onClick={() => handleQRCodeScan(produit.id)}
//                 >
//                   Scanner QR Code
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-8 text-center">
//           <button
//             className="bg-yellow-500 text-white px-6 py-3 rounded-lg ring-2 ring-yellow-400 hover:bg-yellow-600 hover:text-black transition"
//             onClick={handleReportProblem}
//           >
//             Signaler un problème / Maladie
//           </button>
//           {problemReported && (
//             <p className="mt-4 text-red-500 text-lg">
//               Problème signalé. L'administration a été informée.
//             </p>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default LivreurDashboard;
