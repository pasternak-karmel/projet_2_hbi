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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Article } from "@/types";
import { ProduitSkeleton } from "@/components/article/ProduitSkeleton";
import { useState } from "react";
import { fetchProduitAll } from "@/actions/my_api";
import { useSearchParams } from "next/navigation";

export default function AllProduct() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    min: "",
    max: "",
    category: "",
    sort: "",
  });

  const productsPerPage = 10;

  const { isPending, error, data } = useQuery({
    queryKey: ["Allproduit", currentPage, searchParams.toString()],
    queryFn: () =>
      fetchProduitAll(
        currentPage,
        filters.min,
        filters.max,
        filters.category,
        filters.sort
      ),
    placeholderData: keepPreviousData,
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  if (isPending) {
    return (
      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-16 justify-center">
        {Array.from({ length: productsPerPage }).map((_, index) => (
          <ProduitSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) return "An error has occurred: " + error.message;

  const { articles, totalPages } = data;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-12">
      <Filter filters={filters} onFilterChange={handleFilterChange} />
      <Separator className="my-4 w-full" />
      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-16 justify-center">
        {articles.map((product: Article) => (
          <Produit key={product.id} product={product} />
        ))}
      </div>

      <Pagination className="mt-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 1}
              onClick={() => handlePageChange(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {currentPage > 3 && <PaginationEllipsis />}

          {currentPage > 2 && (
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive={true}>{currentPage}</PaginationLink>
          </PaginationItem>

          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage < totalPages - 2 && <PaginationEllipsis />}

          <PaginationItem>
            <PaginationLink
              isActive={currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage((old) => old + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
