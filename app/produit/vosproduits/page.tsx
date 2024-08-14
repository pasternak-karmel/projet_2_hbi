"use client";
import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";

const ArticlePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("/api/getProduit");
      const data = await response.json();
      setArticles(data.articles);
    };

    fetchArticles();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Articles</h1>
      <ArticleCard articles={articles} />
    </div>
  );
};

export default ArticlePage;
