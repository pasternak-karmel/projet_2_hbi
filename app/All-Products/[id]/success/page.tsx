"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import Confetti from "react-confetti";
export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) return;

    const timer = setTimeout(() => {
      router.push("/orders/" + orderId);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [orderId, router]);
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-180px)]">
      <Confetti width={2000} height={1000} />
      <h1 className="text-6xl text-green-700">Successful</h1>
      <h2 className="text-xl font-medium">
        We sent the invoice to your e-mail
      </h2>
      <h3 className="">You are being redirected to the order page...</h3>
    </div>
  );
}
// http://localhost:3000/All-Products/563e20c7-268d-4578-a3b8-82b680400650/success?orderId=ba85d2ff-6e83-42b1-b51a-d30d3f3439ba

// http://localhost:3000/orders/ba85d2ff-6e83-42b1-b51a-d30d3f3439ba
