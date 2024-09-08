"use client";
import { Button } from "@/components/ui/button";
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

export function MyCart() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const { data: session } = useSession();
  const cartItems = session?.user?.cart || [];

  const totalItems = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const subtotal = cartItems.reduce((total, product) => {
    return total + product.prix * product.quantity;
  }, 0);

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
            Review the products in your cart. You can adjust quantities or
            remove items.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-3/4 w-full rounded-md ">
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
                          <p className="ml-4 text-indigo-600">
                            {product.prix} XOF
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {product.quantity}
                        </p>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:text-red-500 transition duration-150 ease-in-out"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-center mt-4">
                    Votre panier est vide
                  </p>
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
                Livraison et taxes calculés a l'étapes du paiement.
              </p>
              <div className="mt-6">
                {pathname === "/payment-method" ? (
                  <Button
                    className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow hover:bg-indigo-700 transition duration-150 ease-in-out "
                    disabled
                  >
                    Déjà sur la page de paiement
                  </Button>
                ) : (
                  <a
                    href="/payment-method"
                    className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow hover:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Payer
                  </a>
                )}
              </div>
            </div>

            <SheetFooter className="mt-6">
              <SheetClose asChild>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </div>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
