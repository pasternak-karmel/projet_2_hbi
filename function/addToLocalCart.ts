import { useState, useEffect } from "react";

export function addToLocalCart(cartItem: any) {
  let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string)
    : [];

  const existingProductIndex = cart.findIndex(
    (item: any) => item.productId === cartItem.productId
  );

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += cartItem.quantity;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getLocalCart() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string)
    : [];
}
