"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Button } from "./ui/button";
import { BuyKkiapay } from "@/function/buyArticle";

const Add = ({
  productId,
  stockNumber,
}: {
  productId: string;
  stockNumber: number;
}) => {
  const role = useCurrentRole();

  const { BuyOpen } = BuyKkiapay();

  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `/api/order?id=${productId}&quantite=${quantity}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete the order");
      }

      return response.json();
    },
    onSuccess: (data) => {
      router.push(`/All-Products/${productId}/success?orderId=${data.id}`);
    },
    onError: (error) => {
      console.error("Error completing the order:", error);
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  const onSubmit = async () => {
    await BuyOpen(productId, quantity);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br />
              Don&apos;t miss it
            </div>
          )}
        </div>
        {role !== "ADMIN" ? (
          <button
            disabled={mutation.isPending}
            onClick={onSubmit}
            // onClick={handleSubmit}
            className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
          >
            {mutation.isPending ? "Paiement en cours..." : "Payer maintenant"}
          </button>
        ) : (
          <Button
            className="disabled:cursor-not-allowed"
            disabled={role === "ADMIN"}
          >
            Vous pouvez pas payer
          </Button>
        )}
      </div>
    </div>
  );
};

export default Add;

// function open() {
//   openKkiapayWidget({
//     amount: 4000,
//     api_key: "33ca75c0652011efbf02478c5adba4b8",
//     sandbox: true,
//     email: "randomgail@gmail.com",
//     phone: "97000000",
//   });
// }
