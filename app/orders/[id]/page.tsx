"use client";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import Loader from "@/components/Loader";

const fetchOrder = async (id: string) => {
  const res = await fetch(`/api/order/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }
  return res.json();
};

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

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading order details</div>;

  return (
    <div className="flex flex-col pt-5 items-center justify-center ">
      <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-40 py-20">
        <h1 className="text-xl">Order Details</h1>
        <div className="mt-12 flex flex-col gap-6">
          <div className="">
            <span className="font-medium">Order Id: </span>
            <span>{order.id}</span>
          </div>
          <div className="">
            <span className="font-medium">Receiver Name: </span>
            <span>{order.User?.name || "N/A"}</span>
          </div>
          <div className="">
            <span className="font-medium">Receiver Email: </span>
            <span>{order.User?.email || "N/A"}</span>
          </div>
          <div className="">
            <span className="font-medium">Price: </span>
            <span>{order.totalAmount} XOF</span>
          </div>
          <div className="">
            <span className="font-medium">Payment Status: </span>
            <span>{order.status}</span>
          </div>
          <div className="">
            <span className="font-medium">Order Status: </span>
            <span>
              {order.status === "payed" ? "En cours de traitement" : "Pending"}
            </span>
          </div>
          <div className="">
            <span className="font-medium">Delivery Address: </span>
            <span>{order.User?.adresse || "N/A"}</span>
          </div>
        </div>
      </div>
      <Link href="/" className="underline mt-6">
        Have a problem? Contact us
      </Link>
      <Link href="/" className="underline mt-6">
        Retourner a l'acceuil
      </Link>
    </div>
  );
};

export default OrderPage;
