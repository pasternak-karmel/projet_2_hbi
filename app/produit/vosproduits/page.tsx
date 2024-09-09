"use client";
import React from "react";
import ArticleCard from "@/components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { Article } from "@/types";
import LoaderState from "@/components/Loader";

const ArticlePage: React.FC = () => {
  const { isLoading, error, data } = useQuery<Article[]>({
    queryKey: ["vosproduits"],
    queryFn: () =>
      fetch("/api/getProduitSpecific")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => data.articles),
  });

  if (isLoading) return <LoaderState />;

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Mes articles en vente
      </h1>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((article: Article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground">
          Vous n&apos;avez pas d&apos;article en vente. Commencer par publier un
          produit
        </p>
      )}
    </div>
  );
};

export default ArticlePage;
