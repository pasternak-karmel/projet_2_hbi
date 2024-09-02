"use client"
import React, { useState } from 'react';

const LivreurDashboard = () => {}
    const [tasks, setTasks] = useState([
      { id: 1, name: 'Livraison à 10 rue des Fleurs', timeLeft: '30 minutes', status: 'En cours' },
      { id: 2, name: 'Livraison à 25 avenue des Champs', timeLeft: '1 heure', status: 'En attente' },
    ]);

    const [problemReported, setProblemReported] = useState(false);
  
    const handleReportProblem = () => {
      setProblemReported(true);
      alert("Problème signalé à l'administration.");
    };

  
    const handlePostpone = (taskId: number) => {
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: 'Reporté à demain' } : task
      ));
    };
  
    const handleQRCodeScan = () => {
      // Simulate scanning and confirmation
      alert('Livraison confirmée.');
      // Send confirmation to admin logic here
    };

export default function livreur_client() {
                return(
                <main
                    className={` min-h-screen p-4 `}
                >
                <div className="container mx-auto p-4">
                <h1 className="text-xl font-bold mb-4">Tâches Assignées</h1>
                <ul className="space-y-4">
                    {tasks.map(task => (
                    <li key={task.id} className="bg-white shadow p-4 rounded-md">
                        <h2 className="text-lg font-semibold">{task.name}</h2>
                        <p className="text-gray-600">Temps restant : {task.timeLeft}</p>
                        <p className="text-gray-600">Statut : {task.status}</p>
                        <div className="mt-4 flex space-x-2">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => handlePostpone(task.id)}
                        >
                            Reporter à demain
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleQRCodeScan}
                        >
                            Scanner QR Code
                        </button>
                        </div>
                    </li>
                    ))}
                </ul>
                <div className="mt-8">
                    <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={handleReportProblem}
                    >
                    Signaler un problème / Maladie
                    </button>
                </div>
                {problemReported && (
                    <p className="mt-4 text-red-500">
                    Problème signalé. L'administration a été informée.
                    </p>
                )}
                </div>
                </main>
)}

