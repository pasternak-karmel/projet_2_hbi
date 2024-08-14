import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  nom: string;
  description: string;
  prix: number;
  usage: boolean;
  image: string;
  categories: {
    id: string;
    nom: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ArticleCardProps {
  articles: Article[];
}

const ArticleCard: React.FC<ArticleCardProps> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {articles.map((article) => (
        <div
          key={article.id}
          className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="relative h-56">
            <Image
              src={article.image}
              alt={article.nom}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
            {/* <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
              {article.categories.nom}
            </Badge> */}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {article.nom}
            </h2>
            <p className="text-gray-600 mt-2">{article.description}</p>
            <p className="text-lg font-bold text-gray-800 mt-4">
              {article.prix} XOF
            </p>
          </div>
          <Button className="flex flex-col items-center justify-center">
            Voir les détails
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ArticleCard;
