// app/fedakarmel/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function FedaKarmelPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionId = searchParams.get("id");
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const payment = searchParams.get("payment");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyTransaction = async () => {
      setLoading(true);
      try {
        if (!transactionId) {
          throw new Error("Transaction ID is missing");
        }

        const res = await fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactionId,
            productId,
            quantite: quantity,
            payment: "Immediate",
          }),
        });

        const data = await res.json();

        if (data.type === "approved") {
          router.push(
            `/All-Products/${data.order.items.productId}/success?orderId=${data.order.id}`
          );
        } else if (data.type === "pending") {
          router.push("/payment-pending");
        } else if (data.type === "failed") {
          router.push("/payment-failed");
        } else {
          router.push("/unknown-status");
        }
      } catch (error) {
        console.error("Error verifying transaction", error);
        router.push("/error");
      } finally {
        setLoading(false);
      }
    };

    if (transactionId) {
      verifyTransaction();
    }
  }, [transactionId, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Processing your transaction...</div>;
}

// const res = await fetch(`/api/feda-redirect?id=${transactionId}`);
