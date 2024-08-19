"use server";

import { cookies } from "next/headers";

// Function to create or update the cart cookie
export async function createCookieCart(data: any) {
  const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const cartData = JSON.stringify(data); // Convert data to JSON string
  cookies().set("cartItems", cartData, {
    secure: true,
    expires: new Date(Date.now() + oneDay), // Expire in 1 day
    path: "/", // Make the cookie available site-wide
  });
}

// Function to retrieve the cart data from the cookie
export async function getCookiesCart() {
  const cookieStore = cookies();
  const cart = cookieStore.get("cartItems");
  if (!cart) return null;
  return JSON.parse(cart.value); // Parse the JSON string back to an object/array
}
