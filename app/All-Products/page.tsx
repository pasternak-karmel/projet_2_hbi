"use client";
import ProduitCard from "@/components/produitcard";
import { produitItems } from "@/types";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AllProduct() {
  return (
    <>
      <div className="w-auto">
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 pb-4 mb-2 ">
            {produitItems.map((produit) => (
              <ProduitCard
                key={produit.id}
                // album={album}
                image={produit.image}
                nom={produit.nom}
                id={produit.id}
                description={produit.description}
                usage={produit.usage}
                prix={produit.prix}
                categories={produit.categories}
                // className="w-full"
                // aspectRatio="portrait"
                // width={250}
                // height={330}
              />
            ))}
          </div>
        </div>
        <Pagination className="mb-5">
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
