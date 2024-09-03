export default function confirm(){
  return (
    <div className="pt-20">
      test
    </div>
  )
}
// "use client";
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// const ConfirmationPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const taskId = searchParams.get('taskId');

//   const [task, setTask] = useState<any>(null);

//   useEffect(() => {
//     const tasks = [
//       { id: 1, productName: 'Produit A', sellerId: 'V001', sellerName: 'John Doe', sellerLocation: '10 rue des Fleurs', sellerContact: '123-456-789', timeLeft: '30 minutes', status: 'En cours' },
//       { id: 2, productName: 'Produit B', sellerId: 'V002', sellerName: 'Jane Smith', sellerLocation: '25 avenue des Champs', sellerContact: '987-654-321', timeLeft: '1 heure', status: 'En attente' },
//       { id: 3, productName: 'Produit C', sellerId: 'V003', sellerName: 'Bob Johnson', sellerLocation: '50 boulevard de la Liberté', sellerContact: '555-123-456', timeLeft: '45 minutes', status: 'En attente' },
//     ];
//     const selectedTask = tasks.find(t => t.id === parseInt(taskId || ''));
//     setTask(selectedTask);
//   }, [taskId]);

//   const handleConfirm = () => {
//     alert('Livraison confirmée !');
//     router.push('/agent');
//   };

//   return task ? (
//     <main className="min-h-screen p-6 bg-gradient-to-r from-teal-50 to-teal-100 pt-20">
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Détails de la Tâche</h1>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4 text-teal-600">{task.productName}</h2>
//           <p className="text-gray-600 mb-2">Nom du Vendeur : <span className="font-medium">{task.sellerName}</span></p>
//           <p className="text-gray-600 mb-2">Identifiant du Vendeur : <span className="font-medium">{task.sellerId}</span></p>
//           <p className="text-gray-600 mb-2">Lieu de Résidence : <span className="font-medium">{task.sellerLocation}</span></p>
//           <p className="text-gray-600 mb-2">Contact : <span className="font-medium">{task.sellerContact}</span></p>
//           <p className="text-gray-600 mb-2">Temps restant : <span className="font-medium">{task.timeLeft}</span></p>
//           <p className="text-gray-600 mb-4">Statut : <span className={`font-medium ${task.status === 'En cours' ? 'text-green-600' : 'text-yellow-600'}`}>{task.status}</span></p>
//           <button
//             className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
//             onClick={handleConfirm}
//           >
//             Confirmer la livraison
//           </button>
//         </div>
//       </div>
//     </main>
//   ) : (
//     <p>Chargement des détails...</p>
//   );
// };

// export default ConfirmationPage;
