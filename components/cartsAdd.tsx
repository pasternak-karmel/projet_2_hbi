import { getServerSession } from "next-auth/next";

export async function addToCart(productId: string, quantity: number) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("You must be signed in to add items to the cart.");
  }

  let cart = session.user.cart || [];

  const existingProductIndex = cart.findIndex(
    (item) => item.productId === productId
  );

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  session.user.cart = cart;
  return cart;
}

export async function getCart() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("You must be signed in to view the cart.");
  }

  return session.user.cart || [];
}
