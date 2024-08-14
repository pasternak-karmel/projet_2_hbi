// "use server";

// import { cookies } from "next/headers";

// async function createCookieCart(data) {
//   const oneDay = 24 * 60 * 60;
//   cookies().set("cartItems", data, {
//     secure: true,
//     expires: Date.now() - oneDay,
//   });
// }
// async function getCookiesCart() {
//   const cookieStore = cookies();
//   const cart = cookieStore.get("cartItems");
//   if (!cart) return null;
//   return cart;
// }
