"use client";
import Produit from "@/components/article/produit";
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
import Filter from "../_components/hero/Filter";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { Article } from "@/types";

export default function AllProduct() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["Allproduit"],
    queryFn: () => fetch("/api/getProduit").then((res) => res.json()),
  });

  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-12">
      <Filter />
      <Separator className="my-4 w-full" />
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.articles.map((product: Article) => (
          <Produit key={product.id} product={product} />
        ))}
      </div>
      <Pagination className="mt-12">
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
  );
}
