"use client";
import { useState } from "react";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Button } from "./ui/button";
import { BuyKkiapay } from "@/function/buyArticle";
import { useAddToCart } from "@/function/ajouter-panier";

const Add = ({
  productId,
  stockNumber,
}: {
  productId: string;
  stockNumber: number;
}) => {
  const role = useCurrentRole();
  const { handleAddToCart } = useAddToCart();

  const { BuyOpen } = BuyKkiapay();

  const [quantity, setQuantity] = useState(1);
  const [loadingProduct, setLoadingProduct] = useState(false);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setLoadingProduct(true);
    await handleAddToCart(productId, quantity);
    setLoadingProduct(false);
  };

  const onSubmit = async () => {
    await BuyOpen(productId, quantity);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choisir la quantitée</h4>
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
            <div className="text-xs">Le stock n&apos;est plus disponible</div>
          ) : (
            <div className="text-xs">
              Seulement{" "}
              <span className="text-orange-500">{stockNumber} articles</span>{" "}
              restant !
              <br />
              Ne le rate pas!!
            </div>
          )}
        </div>
        {role !== "ADMIN" ? (
          <div className="flex flex-col gap-2">
            <button
              onClick={onSubmit}
              className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
            >
              Paiement à la livraison
            </button>
            <button
              onClick={onSubmit}
              className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
            >
              Payer maintenant
            </button>

            <button
              className={`rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs transition-all duration-200 ease-in-out 
           ${
             loadingProduct
               ? "bg-gray-500 text-white"
               : "hover:bg-black hover:text-white"
           }`}
              onClick={handleSubmit}
              disabled={loadingProduct}
            >
              {loadingProduct ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Ajouter au panier"
              )}
            </button>
          </div>
        ) : (
          <Button
            className="disabled:cursor-not-allowed"
            disabled={role === "ADMIN"}
          >
            Payer
          </Button>
        )}
      </div>
    </div>
  );
};

export default Add;
