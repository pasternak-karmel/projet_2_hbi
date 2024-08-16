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
import Image from "next/image";
import Link from "next/link";

export default function AllProduct() {
  return (
    <>
    <div className="">
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {/* {res.items.map((product: products.Product) => ( */}
      {produitItems.map((product) => (
        <Link
          href={"/" + product.id}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product.id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.image || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {product.image && (
              <Image
              // src={product.media?.items[1]?.image?.url || "/product.png"}
              src={product.image || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.nom}</span>
            <span className="font-semibold">${product.prix}</span>
          </div>
          {/* {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )} */}
          <button className="rounded-2xl ring-1 ring-lama text-black w-max py-2 px-4 text-xs hover:bg-black hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
      {/* {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null} */}
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
    </div>
      {/* <div className="w-auto">
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 pb-4 mb-2 ">
            {produitItems.map((produit) => (
              <ProduitCard
                key={produit.id}
                image={produit.image}
                nom={produit.nom}
                id={produit.id}
                description={produit.description}
                usage={produit.usage}
                prix={produit.prix}
                categories={produit.categories}
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
      </div> */}
    </>
  );
}
