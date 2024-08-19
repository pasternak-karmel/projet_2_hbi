import React from "react";
import Image from "next/image";
import { Article } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={`/articles/${article.id}`}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-lg shadow-md bg-white",
          "transition-transform transform hover:scale-105 hover:shadow-lg"
        )}
      >
        <div className="relative w-full h-48">
          <Image
            src={article.image}
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
              ${article.prix.toFixed(2)}
            </div>

            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                article.usage
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              )}
            >
              {article.usage ? "Used" : "New"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
