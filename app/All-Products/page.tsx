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
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Article } from "@/types";
import { ProduitSkeleton } from "@/components/article/ProduitSkeleton";
import { useState, useMemo } from "react";
import React from "react";

const fetchProduit = async (
  page = 0
): Promise<{
  articles: any;
  hasMore: boolean;
}> => {
  const response = await fetch(`/api/getProduit?page=${page}`);
  return await response.json();
};

export default function AllProduct() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    min: "",
    max: "",
    category: "",
    sort: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = React.useState(0);
  const productsPerPage = 2;

  const { data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["Allproduit", page],
    queryFn: () => fetchProduit(page),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  React.useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["Allproduit", page + 1],
        queryFn: () => fetchProduit(page + 1),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredProducts = useMemo(() => {
    if (!data?.articles) return [];

    let filtered = data.articles;

    if (filters.min) {
      filtered = filtered.filter(
        (product: Article) => Number(product.prix) >= Number(filters.min)
      );
    }

    if (filters.max) {
      filtered = filtered.filter(
        (product: Article) => Number(product.prix) <= Number(filters.max)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (product: Article) => product.categories === filters.category
      );
    }

    if (filters.sort) {
      const [sortDirection, sortBy] = filters.sort.split(" ");
      filtered = filtered.sort((a: Article, b: Article) => {
        if (sortBy === "price") {
          return sortDirection === "asc"
            ? Number(a.prix) - Number(b.prix)
            : Number(b.prix) - Number(a.prix);
        } else if (sortBy === "lastUpdated") {
          return sortDirection === "asc"
            ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
            : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        return 0;
      });
    }

    return filtered;
  }, [data?.articles, filters]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (isFetching) {
    return (
      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-16 justify-center">
        {Array.from({ length: productsPerPage }).map((_, index) => (
          <ProduitSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) return "An error has occurred: " + error.message;

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-12">
      <Filter filters={filters} onFilterChange={handleFilterChange} />
      <Separator className="my-4 w-full" />
      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-16 justify-center">
        {paginatedProducts.map((product: Article) => (
          <Produit key={product.id} product={product} />
        ))}
      </div>
      <Pagination className="mt-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            />
          </PaginationItem>

          {/* Show 1st Page */}
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 1}
              onClick={() => handlePageChange(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {/* Ellipsis if needed */}
          {currentPage > 3 && <PaginationEllipsis />}

          {/* Previous Page */}
          {currentPage > 2 && (
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Current Page */}
          <PaginationItem>
            <PaginationLink isActive={true}>{currentPage}</PaginationLink>
          </PaginationItem>

          {/* Next Page */}
          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage < totalPages - 2 && <PaginationEllipsis />}

          {/* Last Page */}
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
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
