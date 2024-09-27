"use server";

import { auth } from "@/auth";

const mydomain = process.env.DOMAIN;

export const fetchProduit = async (page = 1) =>
  fetch(`${mydomain}/api/article/getProduit?page=${page}`).then((res) =>
    res.json()
  );

export async function fetchProduitAll(
  page = 1,
  min = "",
  max = "",
  category = "",
  sort = ""
) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "1",
  });

  if (min) params.append("min", min);
  if (max) params.append("max", max);
  if (category) params.append("cat", category);
  if (sort) params.append("sort", sort);

  const res = await fetch(
    `${mydomain}/api/article/getProduit?${params.toString()}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  return res.json();
}

export const getProduitVendor = async (id: string) =>
  fetch(`${mydomain}/api/user/getUser?userId=${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => data.user);

export const produit = (id: string) =>
  fetch(`${mydomain}/api/article/getProduit/${id}`).then((res) => res.json());

export const AllCategorie = () =>
  fetch(`${mydomain}/api/article/categories/getCategories`).then((res) =>
    res.json()
  );

export const fetchOrder = async (id: string) => {
  const res = await fetch(`${mydomain}/api/article/order/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }
  return res.json();
};

export const fetchPurchases = async () => {
  const res = await fetch(`${mydomain}/api/article/achats`);
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération de vos achats");
  }
  return res.json();
};

export const updateUser = async (updatedData: any) => {
  const session = await auth();

  const res = await fetch(
    `${mydomain}/api/user/updateUser/${session?.user.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de la mise à jour de vos infos");
  }
  return res.json();
};

export const fetchSoldArticles = async () => {
  const res = await fetch(`${mydomain}/api/article/vendus`);
  if (!res.ok) {
    throw new Error("Failed to fetch sold articles");
  }
  return res.json();
};

export const getProduitSpecific = async () =>
  fetch(`${mydomain}/api/article/getProduitSpecific`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => data.articles);

export const AddArticle = async (values: any) =>
  fetch(`${mydomain}/api/article/AddArticle`, {
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
  fetch(`${mydomain}/api/article/order?id=${productId}&quantite=${quantity}`, {
    method: "POST",
  });
