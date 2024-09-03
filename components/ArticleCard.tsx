import React from "react";
import Image from "next/image";
import { Article } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const isDisabled = article.status === "REFUS";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-md bg-white",
        "transition-transform transform hover:scale-105 hover:shadow-lg",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="relative w-full h-48">
        <Image
          src={article.image?.[0]}
          alt={article.nom}
          fill
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {article.nom}
        </h3>
        <p className="text-sm text-gray-500 truncate mb-2">
          {article.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="text-lg font-bold text-blue-600">
            {article.prix.toFixed(2)} XOF
          </div>

          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              article.status === "ACCEPTE"
                ? "bg-green-100 text-green-800"
                : article.status === "ATTENTE"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {article.status === "ACCEPTE" && "Accepté"}
            {article.status === "ATTENTE" && "En attente"}
            {article.status === "REFUS" && "Refusé"}
          </span>
        </div>
      </div>

      {!isDisabled && (
        <Link
          href={`http://localhost:3000/produit/vosproduits/${article.id}`}
          className="absolute inset-0 z-10"
        >
          <span className="sr-only">View Article</span>
        </Link>
      )}
    </div>
  );
};

export default ArticleCard;
