"use server";

import { auth } from "@/auth";

const mydomain = process.env.DOMAIN;
const productsPerPage = 10;

export const fetchProduit = async (page = 1) =>
  fetch(
    `${mydomain}/api/getProduit?page=${page}&limit=${productsPerPage}`
  ).then((res) => res.json());

export async function fetchProduitAll(
  page = 1,
  min = "",
  max = "",
  category = "",
  sort = ""
) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10", // Adjust the limit if necessary
  });

  if (min) params.append("min", min);
  if (max) params.append("max", max);
  if (category) params.append("cat", category);
  if (sort) params.append("sort", sort);

  const res = await fetch(`${mydomain}/api/getProduit?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  return res.json();
}

export const getProduitVendor = async (id: string) =>
  fetch(`${mydomain}/api/getUser?userId=${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => data.user);

export const produit = (id: string) =>
  fetch(`${mydomain}/api/getProduit/${id}`).then((res) => res.json());

export const AllCategorie = () =>
  fetch(`${mydomain}/api/getCategories`).then((res) => res.json());

export const fetchOrder = async (id: string) => {
  const res = await fetch(`${mydomain}/api/order/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }
  return res.json();
};

export const fetchPurchases = async () => {
  const res = await fetch(`${mydomain}/api/achats`);
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération de vos achats");
  }
  return res.json();
};

export const updateUser = async (updatedData: any) => {
  const session = await auth();

  const res = await fetch(`${mydomain}/api/updateUser/${session?.user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la mise à jour de vos infos");
  }
  return res.json();
};

export const fetchSoldArticles = async () => {
  const res = await fetch(`${mydomain}/api/vendus`);
  if (!res.ok) {
    throw new Error("Failed to fetch sold articles");
  }
  return res.json();
};

export const getProduitSpecific = async () =>
  fetch(`${mydomain}/api/getProduitSpecific`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => data.articles);

export const AddArticle = async (values: any) =>
  fetch(`${mydomain}/api/AddArticle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

export const Message = async (message: string, articleId: string) =>
  fetch(`${mydomain}/api/messages/${produit}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: message, articleId: articleId }),
  });

export const BuyArticle = async (productId: string, quantity: number) =>
  fetch(`${mydomain}/api/order?id=${productId}&quantite=${quantity}`, {
    method: "POST",
  });
