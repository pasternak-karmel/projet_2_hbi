"use client"

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { Avatar, AvatarImage } from "./ui/avatar";

const PRODUCT_PER_PAGE = 4;

export default function ProductList({
  // categoryId,
  // limit = PRODUCT_PER_PAGE,
  // searchParams,
}: {
  // categoryId: string;
  // limit?: number;
  // searchParams?: any;
}) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["Acceuilproduit"],
    queryFn: () =>
      fetch(`/api/getnewproduct`).then((res) => res.json()),
      // fetch(`/api/getnewproduct?categoryId=${categoryId}&limit=${limit}`).then((res) => res.json()),
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Une erreur s'est produite: {error.message}</div>;

  if (data.articles.length === 0) {
    return <div>Aucun produit disponible pour le moment.</div>;
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {data.articles.map((product: any) => (
        <Link
          href={"/All-Products/" + product.id}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product.id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.image || "/product.png"}
              alt={product.nom}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
            />
            {product.image && (
              <Image
                src={product.image || "/product.png"}
                alt={product.nom}
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
              
            )}
          </div>
          <span className="absolute bottom-4 left-4 text-white text-sm font-medium z-20">
          <div className="flex text-center ">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={
                  data.image ?? "https://source.boringavatars.com/marble/120"
                }
                alt={data.image ?? ""}
              />
            </Avatar>
            {data ? data.name : "Vendeur inconnue"}
          </div>
        </span>
          <div className="flex justify-between">
            <span className="font-medium">{product.nom}</span>
            <span className="font-semibold">{product.prix} XOF</span>
          </div>
          <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-black hover:text-white">
            Ajouter au panier
          </button>
        </Link>
      ))}
    </div>
  );
}
