"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { BuyKkiapay } from "@/function/buyArticle";
import { fedaserverPanier } from "@/actions/fedaServer";

export function MyCart() {
  const [open, setOpen] = useState(true);
  const { PayerLivraisonPanier } = BuyKkiapay();
  const [loadingCOD, setLoadingCOD] = useState(false);
  const [loadingImmediate, setLoadingImmediate] = useState(false);

  const { data: session, update } = useSession();
  const cartItems = session?.user?.cart || [];

  const subtotal = cartItems.reduce((total, product) => {
    return total + product.prix * product.quantity;
  }, 0);

  const handleIncreaseQuantity = (productId: string) => {
    const updatedCart = cartItems.map((product) => {
      if (product.productId === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (productId: string) => {
    const updatedCart = cartItems.map((product) => {
      if (product.productId === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    updateCart(updatedCart);
  };

  const handleRemoveProduct = (productId: string) => {
    const updatedCart = cartItems.filter((product) => product.productId !== productId);
    updateCart(updatedCart);
  };

  const updateCart = async (updatedCart: { productId: string; quantity: number; nom: string; prix: number; image: string; }[]) => {
    await update({
      user: {
        ...session?.user,
        cart: updatedCart,
      },
    });
  };

  const onSubmit = async (paymentType: "COD" | "Immediate") => {
    if (paymentType === "COD") {
      setLoadingCOD(true);
      await PayerLivraisonPanier();
      setLoadingCOD(false);
    } else {
      setLoadingImmediate(true);
      const url = await fedaserverPanier();
      if (url) {
        window.location.href = url;
      }
      setLoadingImmediate(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          alt="Panier"
          src="/cart.png"
          height={20}
          width={20}
          className="cursor-pointer h-full w-full object-cover object-center"
        />
      </SheetTrigger>
      <SheetContent className="w-full max-w-3xl p-6">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl font-semibold text-gray-800">
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            Dans votre panier vous pouvez ajuster la quantité ou continuer vers la page de paiement.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-3/5 w-full rounded-md">
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  cartItems.map((product) => (
                    <li key={product.productId} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                        <img
                          width={50}
                          height={50}
                          alt={product.nom}
                          src={product.image}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-lg font-medium text-gray-900">
                          <h3>{product.nom}</h3>
                          <p className="ml-4 text-indigo-600">{product.prix} XOF</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantitée: {product.quantity}
                        </p>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleDecreaseQuantity(product.productId)}
                              className="px-2 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span>{product.quantity}</span>
                            <button
                              onClick={() => handleIncreaseQuantity(product.productId)}
                              className="px-2 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveProduct(product.productId)}
                            className="font-medium text-red-600 hover:text-red-500 transition duration-150 ease-in-out"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-center mt-4">Votre panier est vide</p>
                )}
              </ul>
            </div>
          </div>
        </ScrollArea>

        {cartItems.length > 0 && (
          <>
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <p>Sous total</p>
                <p className="text-indigo-600">{subtotal} XOF</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Livraison et taxes calculés à l&apos;étape du paiement.
              </p>
              <div className="mt-6">
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
                    "Paiement à la livraison"
                  )}
                </button>
              </div>
            </div>
          </>
        )}
        <SheetFooter>
          <SheetClose asChild>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Fermer
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
