"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import Loader from "@/components/Loader";
import Link from "next/link";
import { fetchOrder } from "@/actions/my_api";
import LoaderState from "@/components/Loader";

const OrderPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const {
    isLoading,
    error,
    data: order,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id),
  });

  if (isLoading) return <LoaderState />;
  if (error) return <div>Error loading order details</div>;
  console.log(order.items);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Left side with image */}
        <div className="hidden w-1/2 lg:block relative">
          <Image
            src="/hero.jpeg"
            alt="Order confirmation"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Right side with order summary */}
        <div className="w-full lg:w-1/2 bg-white p-8">
          <h2 className="text-indigo-600 text-sm font-medium">
            Payment successful
          </h2>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mt-2">
            Merci pour votre achat
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            We appreciate your order, we&apos;re currently processing it. So hang
            tight and we&apos;ll send you confirmation very soon!
          </p>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-sm font-medium text-gray-900">Tracking number</p>
            <p className="text-indigo-600 text-sm">
              {order.trackingNumber || "Pas disponible"}
            </p>
          </div>
          <ul className="mt-6 space-y-6">
            <li key={order.items.productId} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                  src={order.items.image}
                  alt={order.items.nom}
                  className="h-full w-full object-cover"
                  width={96}
                  height={96}
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between text-sm font-medium text-gray-900">
                  <h3>{order.items.nom}</h3>
                  <p className="ml-4">${order.items.price}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Quantity: {order.items.quantity}
                </p>
              </div>
            </li>
          </ul>

          <div className="border-t border-gray-200 py-6">
            <div className="flex justify-between text-sm font-medium text-gray-900">
              <p>Sous total</p>
              <p>{order.totalAmount} XOF</p>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <p>Livraison</p>
              <p>{order.shippingCost || "offerte"}</p>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 mt-6">
              <p>Total</p>
              <p>{order.totalAmount + (order.shippingCost || 0)} XOF</p>
            </div>
          </div>

          <div className="border-t border-gray-200 py-6">
            <h4 className="text-lg font-bold text-gray-900">
              Shipping Address
            </h4>
            <p className="text-gray-500 mt-1">{order.User.name}</p>
            <p className="text-gray-500">{order.User.adresse}</p>
            <p className="text-gray-500">
              {order.User.numTel}
              {/* , {order.User.postalCode} */}
            </p>
          </div>

          <div className="border-t border-gray-200 py-6">
            <h4 className="text-lg font-bold text-gray-900">
              Payment Information
            </h4>
            <p className="text-gray-500 mt-1">
              Visa ending in 0324
              {/* Visa ending in {order.paymentLast4} */}
            </p>
            <p className="text-gray-500">Expires le 03/24</p>
            {/* <p className="text-gray-500">Expires {order.paymentExpiry}</p> */}
          </div>

          <div className="mt-6">
            <Link
              href="/All-Products"
              className="text-indigo-600 font-medium hover:text-indigo-500"
            >
              Continue Shopping &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
