"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCart } from "./cartsAdd";

const CartModal = () => {
  const [cartItems, setCartItems] = useState<
    {
      productId: string;
      quantity: number;
      nom: string;
      prix: number;
      image: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCartItems(cart);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = (productId: string) => {
    // Implement the logic to remove an item from the cart
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.prix * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="absolute z-20 top-12 right-0 w-[300px] p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white flex flex-col gap-6">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="text-center">Le panier est vide</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex gap-4">
                <Image
                  src={item.image}
                  alt={item.nom}
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{item.nom}</h3>
                      <div className="p-1 bg-gray-50 rounded-sm">
                        ${item.prix.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Disponible</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleRemove(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                Voir le panier
              </button>
              <button className="rounded-md py-3 px-4 bg-black text-white">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
