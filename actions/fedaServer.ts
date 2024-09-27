"use server";

import { auth } from "@/auth";
import { FedaPay, Transaction } from "fedapay";
import { CalculateAmount, CalculateAmountPanier } from "./buy";
import { ToastRessuable } from "@/function/notification-toast";

const domain = process.env.DOMAIN;

export const fedaserver = async (productId: string, quantity: number) => {
  const session = await auth();

  FedaPay.setApiKey(process.env.FEDA_SECRET as string);
  FedaPay.setEnvironment("sandbox");

  try {
    const res = await CalculateAmount(productId, quantity);
    if (res.error) {
      return ToastRessuable({
        titre: "Erreur",
        description: res.error,
      });
    }

    const transaction = await Transaction.create({
      description: "Confirmer votre achats",
      amount: res.totalAmount,
      callback_url: `${domain}/fedakarmel?productId=${productId}&quantity=${quantity}&payment=Immediate`,
      currency: {
        iso: "XOF",
      },
      customer: {
        firstname: session?.user?.name,
        lastname: session?.user?.name,
        email: session?.user?.email,
        phone_number: {
          number: session?.user?.num,
          country: "BJ",
        },
      },
    });

    const token = await transaction.generateToken();
    return token.url;
  } catch (error) {
    console.error("Error creating transaction:", error);
    return null;
  }
};

export const fedaserverPanier = async () => {
  const session = await auth();

  FedaPay.setApiKey(process.env.FEDA_SECRET as string);
  FedaPay.setEnvironment("live");

  try {
    const res = await CalculateAmountPanier();
    if (res.error) {
      return ToastRessuable({
        titre: "Erreur",
        description: res.error,
      });
    }

    const transaction = await Transaction.create({
      description: "Confirmer votre achats",
      // amount: 100,
      amount: res.totalAmount,
      callback_url: `http://localhost:3000/fedakarmel?cart=&payment=Immediate`,
      currency: {
        iso: "XOF",
      },
      customer: {
        firstname: session?.user?.name,
        lastname: session?.user?.name,
        email: session?.user?.email,
        phone_number: {
          number: session?.user?.num,
          country: "BJ",
        },
      },
    });

    const token = await transaction.generateToken();
    return token.url;
  } catch (error) {
    console.error("Error creating transaction:", error);
    return null;
  }
};
