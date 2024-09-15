"use client";
import { useState } from "react";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Button } from "./ui/button";
import { BuyKkiapay } from "@/function/buyArticle";
import { useAddToCart } from "@/function/ajouter-panier";
import { FaMinus, FaPlus } from "react-icons/fa";
import { fedaserver } from "@/actions/fedaServer";

const Add = ({
  productId,
  stockNumber,
}: {
  productId: string;
  stockNumber: number;
}) => {
  const role = useCurrentRole();
  const { handleAddToCart } = useAddToCart();
  const { BuyOpen, PayerLivraison } = BuyKkiapay();

  const [quantity, setQuantity] = useState(1);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingCOD, setLoadingCOD] = useState(false);
  const [loadingImmediate, setLoadingImmediate] = useState(false);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setLoadingCart(true);
    await handleAddToCart(productId, quantity);
    setLoadingCart(false);
  };

  const onSubmit = async (paymentType: "COD" | "Immediate") => {
    if (paymentType === "COD") {
      setLoadingCOD(true);
      await PayerLivraison(productId, quantity);
      setLoadingCOD(false);
    } else {
      setLoadingImmediate(true);
      const url = await fedaserver(productId, quantity);
      if (url) {
        window.location.href = url;
      }
      setLoadingImmediate(false);
    }
  };


  return (
    <div className="flex flex-col gap-6 p-4 w-full max-w-3xl mx-auto">
      <h4 className="font-bold text-lg text-gray-800 text-center">
        Choisis la quantitée
      </h4>

      <div className="flex flex-col md:flex-row justify-between items-center md:gap-8 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="bg-gray-100 py-2 px-6 rounded-full flex items-center justify-between w-full md:w-36">
            <button
              className="text-gray-600 text-lg transition-colors duration-200 ease-in-out hover:text-black disabled:opacity-30"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              <FaMinus />
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              className="text-gray-600 text-lg transition-colors duration-200 ease-in-out hover:text-black disabled:opacity-30"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              <FaPlus />
            </button>
          </div>

          {stockNumber < 1 ? (
            <span className="text-red-500 text-sm font-medium mt-2 md:mt-0">
              Plus de stock
            </span>
          ) : (
            <span className="text-sm text-gray-500 mt-2 md:mt-0">
              Seulement{" "}
              <span className="font-bold text-orange-600">{stockNumber}</span>{" "}
              restant!
            </span>
          )}
        </div>

        {role !== "ADMIN" ? (
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => onSubmit("COD")}
              className={`w-full md:w-40 text-sm rounded-full border-2 border-green-600 text-green-600 py-2 hover:bg-green-600 hover:text-white transition duration-200 ${
                loadingCOD ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={loadingCOD}
            >
              {loadingCOD ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                "Payer à la livraison"
              )}
            </button>

            <button
              onClick={() => onSubmit("Immediate")}
              className={`w-full md:w-40 text-sm rounded-full border-2 border-blue-600 text-blue-600 py-2 hover:bg-blue-600 hover:text-white transition duration-200 ${
                loadingImmediate ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={loadingImmediate}
            >
              {loadingImmediate ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                "Payer Maintenant"
              )}
            </button>

            <button
              className={`w-full md:w-40 py-2 text-sm rounded-full transition-all duration-200 ease-in-out 
           ${
             loadingCart
               ? "bg-gray-500 text-white cursor-not-allowed opacity-70"
               : "border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
           }`}
              onClick={handleSubmit}
              disabled={loadingCart}
            >
              {loadingCart ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  Adding...
                </span>
              ) : (
                "Ajouter au panier"
              )}
            </button>
          </div>
        ) : (
          <Button
            className="bg-gray-500 cursor-not-allowed w-full"
            disabled={role === "ADMIN"}
          >
            Payment Non Autorisé
          </Button>
        )}
      </div>
    </div>
  );
};

export default Add;
