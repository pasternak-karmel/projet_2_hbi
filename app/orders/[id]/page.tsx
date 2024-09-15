"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-6 lg:flex lg:gap-8">
        <div className="hidden lg:block w-full lg:w-1/2 relative overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/hero.jpeg"
            alt="Order confirmation"
            layout="fill"
            objectFit="cover"
            className="opacity-80"
          />
        </div>

        <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-lg text-green-600 font-semibold">
            Paiement éffectué avec succès
          </h2>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Merci Pour Votre Achat!
          </h1>
          <p className="text-gray-600 mt-4">
            Nous somme déjà entrain de procéder a votre achat et nous vous
            contacterons très bientôt.
          </p>

          <div className="mt-8 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-900">
                Numéro de suivi
              </p>
              <p className="text-sm text-indigo-600">
                {order.trackingNumber || "Non disponible"}
              </p>
            </div>
          </div>

          <ul className="mt-8 space-y-6">
            {order.items.map((item: any) => (
              <li
                key={item.productId}
                className="flex py-6 border-b border-gray-200"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={item.image}
                    alt={item.nom}
                    className="h-full w-full object-cover"
                    width={96}
                    height={96}
                  />
                </div>
                <div className="ml-4 flex flex-col justify-between flex-1">
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <h3>{item.nom}</h3>
                    <p>{item.price} XOF</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Quantitée: {item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-gray-200 py-6">
            <div className="flex justify-between text-sm font-medium text-gray-900">
              <p>Sous total</p>
              <p>{order.totalAmount} XOF</p>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <p>Livraison</p>
              <p>{order.shippingCost || "Gratuite"}</p>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 mt-6">
              <p>Total</p>
              <p>{order.totalAmount + (order.shippingCost || 0)} XOF</p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 py-6">
            <h4 className="text-lg font-bold text-gray-900">
              Adresse de livraison
            </h4>
            <p className="text-gray-600 mt-1">{order.User.name}</p>
            <p className="text-gray-600">{order.User.adresse}</p>
            <p className="text-gray-600">{order.User.numTel}</p>
          </div>

          <div className="mt-8 border-t border-gray-200 py-6">
            <h4 className="text-lg font-bold text-gray-900">
              Information de paiement
            </h4>
            <p className="text-gray-600 mt-1">Visa ending in 0324</p>
            <p className="text-gray-600">Expires on 03/24</p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/All-Products"
              className="text-indigo-600 font-semibold hover:text-indigo-500"
            >
              Continue tes achats &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
