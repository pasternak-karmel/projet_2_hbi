"use client"
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

type Livreur = {
  id: number;
  name: string;
  profilePicture: string;
  isAvailable: boolean;
  currentLocation: string;
  estimatedArrival: string;
  assignments: string[];
};

const mockLivreurs: Livreur[] = [
  {
    id: 1,
    name: 'Jean Dupont',
    profilePicture: './Jean_Dupont.jpg',
    isAvailable: true,
    currentLocation: '15 Rue de Rivoli, Paris',
    estimatedArrival: '10 min',
    assignments: ['Commande #001', 'Commande #005'],
  },
  {
    id: 2,
    name: 'Marie Claire',
    profilePicture: './Jean_Dupont.jpg',
    isAvailable: false,
    currentLocation: '20 Rue de Lille, Paris',
    estimatedArrival: '25 min',
    assignments: ['Commande #002'],
  }, 
  {
    id: 2,
    name: 'Marie Claire',
    profilePicture: './Jean_Dupont.jpg',
    isAvailable: false,
    currentLocation: '20 Rue de Lille, Paris',
    estimatedArrival: '25 min',
    assignments: ['Commande #002'],
  },
  {
    id: 2,
    name: 'Marie Claire',
    profilePicture: './Jean_Dupont.jpg',
    isAvailable: false,
    currentLocation: '20 Rue de Lille, Paris',
    estimatedArrival: '25 min',
    assignments: ['Commande #002'],
  },
  {
    id: 3,
    name: 'Sommin Berenger',
    profilePicture: './Jean_Dupont.jpg',
    isAvailable: true,
    currentLocation: '20 Rue de Lille, Calavi',
    estimatedArrival: '25 min',
    assignments: ['Commande #002'],
  },
];

export default function LivreurPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLivreurs, setFilteredLivreurs] = useState<Livreur[]>(mockLivreurs);
    const [livreurs, setLivreurs] = useState<Livreur[]>(mockLivreurs);
    const [newLivreur, setNewLivreur] = useState<Partial<Livreur>>({});
    const [search, setSearch] = useState<string>('');
    const [showChat, setShowChat] = useState<boolean>(false);
    const [selectedLivreur, setSelectedLivreur] = useState<Livreur | null>(null);
    // const router = useRouter();

  useEffect(() => {
    const result = mockLivreurs.filter((livreur) =>
      livreur.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLivreurs(result);
  }, [searchQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
    const handleAddLivreur = () => {
        const newId = livreurs.length + 1;
        setLivreurs([...livreurs, { id: newId, ...newLivreur } as Livreur]);
        setNewLivreur({});
    };

    const handleChatOpen = (livreur: Livreur) => {
        setSelectedLivreur(livreur);
        setShowChat(true);
    };

    const handleChatClose = () => {
        setShowChat(false);
    };
    // const handleGoBack = () => {
    //     router.back();
    //   };

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
      {/* <button onClick={handleGoBack} className="p-2 bg-gray-300 text-black rounded">Retour</button> */}
                <input
                    type="text"
                    placeholder="Rechercher un livreur..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-2 py-1 w-full sm:w-4/5"
                />
                <button
                    className="ml-4 bg-teal-600 text-white px-4 py-2 rounded"
                    onClick={handleAddLivreur}
                >
                    Ajouter un livreur
                </button>
            </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredLivreurs.map((livreur) => (
          <div key={livreur.id} className="p-4 border rounded-lg shadow-md">
            <img
              src={livreur.profilePicture}
              alt={livreur.name}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{livreur.name}</h2>
            <p className="text-sm text-center mb-2">
              {livreur.isAvailable ? 'Disponible' : 'En livraison'}
            </p>
            <p className="text-sm text-center mb-2">
              Localisation: {livreur.currentLocation}
            </p>
            <p className="text-sm text-center mb-4">
              Estimé: {livreur.estimatedArrival}
            </p>
            <h3 className="text-sm font-semibold mb-2">Affectations:</h3>
            <ul className="text-sm list-disc list-inside">
              {livreur.assignments.map((assignment, index) => (
                <li key={index}>{assignment}</li>
              ))}
            </ul>
            <button 
            className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg"
            onClick={() => handleChatOpen(livreur)}
            >
              Envoyer un message
            </button>
          </div>
        ))}

         {showChat && selectedLivreur && (
                <div className="fixed bottom-0 right-0 p-4 w-full sm:w-80 bg-white shadow-lg rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold">Discussion avec {selectedLivreur.name}</h2>
                        <button onClick={handleChatClose} className="text-red-600">Fermer</button>
                    </div>
                    <div className="h-64 overflow-y-scroll p-2 border rounded-lg">
                    </div>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            placeholder="Votre message..."
                            className="border rounded-l px-4 py-2 w-full"
                        />
                        <button className="bg-teal-600 text-white px-4 py-2 rounded-r">
                            Envoyer
                        </button>
                    </div>
                </div>
            )}
      </div>
    </div>
  );
}
