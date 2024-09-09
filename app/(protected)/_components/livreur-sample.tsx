"use client";
import { GetLivreur } from "@/actions/create-livreur";
import LoaderState from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";

export function LiveurSample() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["GetAllLivreur"],
    queryFn: async () => await GetLivreur(),
  });

  if (isLoading) return <LoaderState />;
  if (error) return <div>Error: {error.message}</div>;

  if (!data || !data.livreur || data.livreur.length === 0) {
    return <div>No Livreurs available</div>;
  }
  return (
    <div className="">
      {data.livreur.map((livreurs: any) => (
        <div key={livreurs.id} className="p-4 border rounded-lg shadow-md">
          <img
            src="/Jean_Dupont.JPG"
            alt={livreurs.name}
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-center">{livreurs.name}</h2>
          <p className="text-sm text-center mb-2">
            {livreurs.isAvailable ? "Disponible" : "En livraison"}
          </p>
          <p className="text-sm text-center mb-2">
            Localisation: {livreurs.currentLocation}
          </p>
          <p className="text-sm text-center mb-4">
            Estimé: {livreurs.estimatedArrival}
          </p>
          <h3 className="text-sm font-semibold mb-2">Dernières livraisons:</h3>
          <ul className="text-sm list-disc list-inside">
            {/* {livreurs.assignments.map((assignment, index) => (
          <li key={index}>{assignment}</li>
        ))} */}
          </ul>
          <button
            className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg"
            // onClick={() => handleChatOpen(livreur)}
          >
            Envoyer un message
          </button>
        </div>
      ))}
    </div>
  );
}
export default LiveurSample;
// %fe#Da0GI4h2 moi@karmel.com
