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
        Nous vous avons envoyer un reçu via votre email
      </h2>
      <h3 className="">Vous serez rediriger vers la page de votre achats...</h3>
    </div>
  );
}
