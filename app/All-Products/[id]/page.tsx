"use client";
import React from "react";
import Image from "next/image";
import { produitItems } from "@/types";
import AccessDenied from "@/components/access-denied";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbEllipsis } from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function ProductSpecificPage({
  params,
}: {
  params: { id: string };
}) {
  const product = produitItems.find((item) => item.id === String(params.id));
  const { data: session } = useSession();
  if (!session) return <AccessDenied />;

  if (!product) {
    return (
      <div className="container mx-auto my-8 p-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Product not found.
        </h2>
        <p className="mt-4 text-gray-600">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link href="/All-Products">
          <Button className="mt-6 bg-blue-500 text-white">
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }
  return (
    // <div className="container mx-auto my-8 p-4">
    //   <Breadcrumb>
    //     <BreadcrumbList>
    //       <BreadcrumbItem>
    //         <BreadcrumbLink href="/">Acceuil</BreadcrumbLink>
    //       </BreadcrumbItem>
    //       <BreadcrumbSeparator />
    //       <BreadcrumbItem>
    //         <DropdownMenu>
    //           <DropdownMenuTrigger className="flex items-center gap-1">
    //             <BreadcrumbEllipsis className="h-4 w-4" />
    //             <span className="sr-only">Toggle menu</span>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="start">
    //             <DropdownMenuItem>Categories</DropdownMenuItem>
    //             <DropdownMenuItem>Produits</DropdownMenuItem>
    //             {/* <DropdownMenuItem>GitHub</DropdownMenuItem> */}
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </BreadcrumbItem>
    //       <BreadcrumbSeparator />
    //       <BreadcrumbItem>
    //         <BreadcrumbLink href="/All-Products">Articles</BreadcrumbLink>
    //       </BreadcrumbItem>
    //       <BreadcrumbSeparator />
    //       <BreadcrumbItem>
    //         <BreadcrumbPage>{params.id}</BreadcrumbPage>
    //       </BreadcrumbItem>
    //     </BreadcrumbList>
    //   </Breadcrumb>
    //   <div className="flex flex-col md:flex-row md:items-center bg-white rounded-lg shadow-lg p-6">
    //     <div className="flex justify-center md:w-1/2">
    //       <Image
    //         width={400}
    //         height={400}
    //         src={product.image}
    //         alt={product.nom}
    //         className="w-full h-auto object-contain rounded-md"
    //       />
    //     </div>
    //     <div className="md:w-1/2 mt-6 md:mt-0 md:ml-8">
    //       <h1 className="text-3xl font-semibold text-gray-800">
    //         {product.nom}
    //       </h1>
    //       <p className="mt-4 text-gray-600">{product.description}</p>
    //       <p className="mt-4 text-xl text-muted-foreground  font-bold">
    //         Prix: <span className="text-green-600">{product.prix}</span> XOF
    //       </p>
    //       <p className="mt-2 text-gray-500">Category: {product.categories}</p>
    //       <p className="mt-2 text-gray-500">
    //         Usage: {product.usage ? "Déja utilisé" : "Neuf"}
    //       </p>
    //       <div className="mt-6 grid gap-3">
    //         <Button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
    //           Ajouter au panier
    //         </Button>
    //         <Link
    //           href={`/All-Products/${params.id}/success?orderId=${params.id}`}
    //           passHref
    //         >
    //           <Button className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
    //             Buy now
    //           </Button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="container mx-auto my-8 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <Link href="/categories">Categories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/All-Products">Products</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/All-Products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{params.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-center md:w-1/2">
          <Image
            width={500}
            height={500}
            src={product.image}
            alt={product.nom}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 md:ml-8">
          <h1 className="text-4xl font-bold text-gray-800">{product.nom}</h1>
          <p className="mt-4 text-lg text-gray-700">{product.description}</p>
          <p className="mt-4 text-2xl text-green-600 font-semibold">
            {product.prix} XOF
          </p>
          <p className="mt-2 text-gray-500">Category: {product.categories}</p>
          <p className="mt-2 text-gray-500">
            Condition: {product.usage ? "Used" : "New"}
          </p>
          <div className="mt-6 grid gap-4">
            <Button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
              Ajouter au panier
            </Button>
            <Link
              href={`/All-Products/${params.id}/success?orderId=${params.id}`}
              passHref
            >
              <Button className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300">
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
