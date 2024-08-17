"use client";
import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";

const ArticlePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("/api/getProduitSpecific");
      const data = await response.json();
      setArticles(data.articles);
    };

    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center mb-10">Articles</h1>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground">
          Vous n'avez pas d'article en vente.
        </p>
      )}
    </div>
  );
};

export default ArticlePage;
