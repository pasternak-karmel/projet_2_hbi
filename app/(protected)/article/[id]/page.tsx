"use client";
import React, { Suspense, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
import Link from "next/link";
import Loader from "@/components/Loader";
import ProductImages from "@/components/ProductImages";
import CustomizeProducts from "@/components/CustomizeProducts";
import Add from "@/components/Add";

export default function ArticlesSpecifiquePage({
  params,
}: {
  params: { id: string };
}) {
  const { data: session } = useSession();
  if (!session) return <AccessDenied />;

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () =>
      fetch(`/api/getProduit/${params.id}`).then((res) => res.json()),
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

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
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/All-Products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.nom}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ProductImages items={product.image} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.nom}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {/* {product.prix === product.price?.discountedPrice ? (
          <h2 className="font-medium text-2xl">${product.price?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.price?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product.price?.discountedPrice}
            </h2>
          </div>
        )} */}
        <h2 className="font-medium text-2xl">{product.prix} XOF</h2>
        <p className="mt-2 text-gray-500">
          Condition:{" "}
          {product.usage
            ? "Ce produit a été déjà utilisé au moins une fois"
            : "Nouveau, jamais utilisé"}
        </p>
        <div className="h-[2px] bg-gray-100" />
        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            stockNumber={product.quantite}
            productId={product.id!}
            // variantId="00000000-0000-0000-0000-000000000000"
            // stockNumber={product.stock?.quantity || 0}
          />
        )}
        <div className="h-[2px] bg-gray-100" />
        {/* <button >click me</button> */}
        {/* {product.additionalInfoSections?.map((section: any) => ( */}
        <div className="text-sm" key={product.nom}>
          <h4 className="font-medium mb-4">{product.nom}</h4>
          <p>
            Le systeme s&apos;assure de le livrason et de la qualitée des
            produits et une vitesse de livraison sans pareil
          </p>
        </div>
        {/* ))} */}
        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading...">
          {/* <Reviews productId={product.id!} /> */}
        </Suspense>
      </div>
    </div>
    // <div className="container mx-auto my-8 p-4">

    //   <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
    //     <div className="flex justify-center md:w-1/2">
    //       <Image
    //         width={500}
    //         height={500}
    //         src={product.image || "/default-product.png"}
    //         alt={product.nom}
    //         className="w-full h-auto object-contain rounded-lg"
    //       />
    //     </div>
    //     <div className="md:w-1/2 mt-6 md:mt-0 md:ml-8">
    //       <h1 className="text-4xl font-bold text-gray-800">{product.nom}</h1>
    //       <p className="mt-4 text-lg text-gray-700">{product.description}</p>
    //       <p className="mt-4 text-2xl text-green-600 font-semibold">
    //         {product.prix} XOF
    //       </p>
    //       <p className="mt-2 text-gray-500">
    //         Category:{" "}
    //         {/* {product.categories.map((cat: any) => cat.name).join(", ")} */}
    //       </p>

    //       <div className="mt-6 grid gap-4">
    //         <Button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
    //           Ajouter au panier
    //         </Button>
    //         <Link
    //           href={`/All-Products/${params.id}/success?orderId=${params.id}`}
    //           passHref
    //         >
    //           <Button className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300">
    //             Buy Now
    //           </Button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
