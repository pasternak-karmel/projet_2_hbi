"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importez le hook useRouter

const LivreurDashboard = () => {
  const router = useRouter(); // Initialisez le hook useRouter
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Livraison à 10 rue des Fleurs', timeLeft: '30 minutes', status: 'En cours' },
    { id: 2, name: 'Livraison à 25 avenue des Champs', timeLeft: '1 heure', status: 'En attente' },
    { id: 3, name: 'Livraison à 50 boulevard de la Liberté', timeLeft: '45 minutes', status: 'En attente' },
  ]);

  const [problemReported, setProblemReported] = useState(false);

  useEffect(() => {
    const scannedTaskId = sessionStorage.getItem('scannedTaskId');
    if (scannedTaskId) {
      setTasks(tasks.map(task =>
        task.id === parseInt(scannedTaskId) ? { ...task, status: 'Fait' } : task
      ));
      sessionStorage.removeItem('scannedTaskId');
    }
  }, [tasks]);

  const handleReportProblem = () => {
    setProblemReported(true);
    alert("Problème signalé à l'administration.");
  };

  const handlePostpone = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: 'Reporté à demain' } : task
    ));
  };

  const handleQRCodeScan = (taskId: number) => {
    sessionStorage.setItem('scannedTaskId', taskId.toString());
    router.push(`/scan/scan?taskId=${taskId}`); // Redirigez vers la page de scan avec l'ID de la tâche
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 pt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard du Livreur</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <div key={task.id} className="bg-white shadow-lg rounded-lg p-6 transition transform hover:-translate-y-1 hover:shadow-2xl">
              <h2 className="text-xl font-semibold mb-2 text-teal-600">{task.name}</h2>
              <p className="text-gray-600 mb-2">Temps restant : <span className="font-medium">{task.timeLeft}</span></p>
              <p className="text-gray-600 mb-4">Statut : <span className={`font-medium ${task.status === 'En cours' ? 'text-green-600' : 'text-yellow-600'}`}>{task.status}</span></p>
              <div className="flex space-x-3">
                <button
                  className="flex-1 ring-2 ring-slate-800 px-4 py-2 rounded-md hover:bg-neutral-700 hover:text-white transition text-sm"
                  onClick={() => handlePostpone(task.id)}
                >
                  Reporter à demain
                </button>
                <button
                  className="flex-1 bg-neutral-700 ring-2 ring-slate-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition"
                  onClick={() => handleQRCodeScan(task.id)}
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
            onClick={handleReportProblem}
          >
            Signaler un problème / Maladie
          </button>
          {problemReported && (
            <p className="mt-4 text-red-500 text-lg">
              Problème signalé. L'administration a été informée.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default LivreurDashboard;
