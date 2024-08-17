"use client";
import { produitItems } from "@/types";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import Link from "next/link";
import Filter from "../_components/hero/Filter";

export default function AllProduct() {
  return (
    <>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-12">
        <Filter />
        <Separator className="my-4 w-full" />
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-16 justify-center">
          {produitItems.map((product) => (
            <Link
              href={`/All-Products/${product.id}`}
              className="group w-full sm:w-[45%] lg:w-[22%] flex flex-col gap-4"
              key={product.id}
            >
              <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={product.image || "/product.png"}
                  alt={product.nom}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-lg"></div>
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium z-20">
                  Vendor name
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">{product.nom}</span>
                <span className="font-semibold text-xl">${product.prix}</span>
              </div>
              <div className="flex justify-between">
                <button className="rounded-full border border-black text-black w-max py-2 px-6 text-xs transition-colors duration-300 hover:bg-black hover:text-white">
                  Ajouter au panier
                </button>
              </div>
            </Link>
          ))}
        </div>
        <Pagination className="m-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
