"use client";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchSoldArticles = async () => {
  const res = await fetch(`/api/vendus`);
  if (!res.ok) {
    throw new Error("Failed to fetch sold articles");
  }
  return res.json();
};

export default function ArticleVendus() {
  const {
    isLoading,
    error,
    data: soldArticles,
  } = useQuery({
    queryKey: ["vendus"],
    queryFn: () => fetchSoldArticles(),
  });

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="text-red-500 text-center">
        Error loading sold articles
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Sold Articles
      </h1>
      {soldArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {soldArticles.map((article: any) => (
            <div
              key={article.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow transform hover:-translate-y-1"
            >
              <img
                src={article.image?.[0]}
                alt={article.nom}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {article.nom}
                </h2>
                <p className="text-gray-600 mb-2">
                  Price: <span className="font-medium">{article.prix} XOF</span>
                </p>
                <p className="text-gray-600 mb-2">
                  Total Sold:{" "}
                  <span className="font-medium">{article.soldQuantity}</span>
                </p>
                <p className="text-gray-600">
                  Votre stock restant:{" "}
                  <span className="font-medium">
                    {article.remainingQuantity}
                  </span>
                </p>
                {article.remainingQuantity === 0 && (
                  <p>Votre article n'est plus disponible sur le marché</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Pas d'article vendu pour vous. Priez Dieu vous allez vendre
        </div>
      )}
    </div>
  );
}
