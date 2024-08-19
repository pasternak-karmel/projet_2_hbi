import { auth } from "@/auth";

export async function fetchProductDetails(productId: string) {
  const response = await fetch(`/api/products/${productId}`);
  const product = await response.json();
  return {
    productId: product.id,
    nom: product.nom,
    prix: product.prix,
    image: product.image,
    quantity: 1,
  };
}

export async function addToCart(productId: string, quantity: number) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be signed in to add items to the cart.");
  }

  const productDetails = await fetchProductDetails(productId);

  let cart = session.user.cart || [];

  const existingProductIndex = cart.findIndex(
    (item) => item.productId === productId
  );

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({
      ...productDetails,
      quantity,
    });
  }

  session.user.cart = cart;

  return cart;
}

export async function getCart() {
  const session = await auth();

  if (!session) {
    throw new Error("You must be signed in to view the cart.");
  }

  return session.user.cart || [];
}
