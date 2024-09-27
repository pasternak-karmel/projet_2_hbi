import { useEffect, useState } from "react";
import { ToastRessuable } from "./notification-toast";
import { useKKiaPay } from "kkiapay-react";
import { useSession } from "next-auth/react";
import { CalculateAmount, CalculateAmountPanier } from "@/actions/buy";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function BuyKkiapay() {
  const { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } =
    useKKiaPay();
  const { data: session } = useSession();
  const router = useRouter();
  const [produit, setProduit] = useState("");
  const [quantite, setQuantity] = useState(0);

  const mutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
      payment,
    }: {
      productId: string;
      quantity: number;
      payment?: string;
    }) => {
      let paie;
      if (!payment) {
        paie = "Immediate";
      } else {
        paie = "COD";
      }
      const response = await fetch(
        `/api/article/order?id=${productId}&quantite=${quantity}&payment=${paie}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            quantite: quantity,
            payment: paie,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete the order");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const orderId = data.order.id;

      router.push(`/All-Products/${produit}/success?orderId=${orderId}`);
    },
    onError: (error) => {
      console.error("Error completing the order:", error);
    },
  });

  const cartMutation = useMutation({
    mutationFn: async (payment?) => {
      let paie;
      if (!payment) {
        paie = "Immediate";
      } else {
        paie = "COD";
      }
      const response = await fetch(`/api/article/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: session?.user.cart, payment: paie }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete the cart order");
      }

      return response.json();
    },
    onSuccess: (data) => {
      router.push(`/All-Products/cart/success?orderId=${data.order.id}`);
    },
    onError: (error) => {
      console.error("Error completing the cart order:", error);
    },
  });

  async function successHandler(
    response: any,
    productId?: string,
    quantity?: number
  ) {
    try {
      const res = await fetch("/api/buykkiapay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });

      const data = await res.json();

      if (data.error) {
        ToastRessuable({
          titre: "Erreur",
          description: "La vérification du paiement a échoué",
        });
      } else {
        ToastRessuable({
          titre: "Succès",
          description: "Paiement vérifié avec succès",
        });

        if (productId && quantity) {
          mutation.mutate({ productId, quantity });
        } else {
          cartMutation.mutate();
        }
      }
    } catch (error) {
      console.error("Error during payment verification:", error);
      ToastRessuable({
        titre: "Erreur",
        description:
          "Une erreur inattendue s'est produite lors de la vérification du paiement",
      });
    }
  }

  function failureHandler(error: any) {
    console.log(error);
  }

  useEffect(() => {
    const onSuccess = (response: any) =>
      successHandler(response, produit, quantite);

    addKkiapayListener("success", onSuccess);
    addKkiapayListener("failed", failureHandler);

    return () => {
      removeKkiapayListener("success", onSuccess);
      removeKkiapayListener("failed", failureHandler);
    };
  }, [addKkiapayListener, removeKkiapayListener, produit, quantite]);

  const BuyOpen = async (productId: string, quantity: number) => {
    try {
      setProduit(productId);
      setQuantity(quantity);
      const res = await CalculateAmount(productId, quantity);
      if (res.error) {
        return ToastRessuable({
          titre: "Erreur",
          description: res.error,
        });
      }

      openKkiapayWidget({
        amount: res.totalAmount,
        api_key: process.env.NEXT_PUBLIC_KKIAPAY_API_KEY,
        sandbox: true,
        email: session?.user.email || "",
        phone: session?.user.num || "",
      });
    } catch (error) {
      ToastRessuable({
        titre: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
    }
  };

  const BuyOpenPanier = async () => {
    try {
      const res = await CalculateAmountPanier();
      if (res.error) {
        return ToastRessuable({
          titre: "Erreur",
          description: res.error,
        });
      }

      openKkiapayWidget({
        amount: res.totalAmount,
        api_key: process.env.NEXT_PUBLIC_KKIAPAY_API_KEY,
        sandbox: true,
        email: session?.user.email || "",
        phone: session?.user.num || "",
      });
    } catch (error) {
      ToastRessuable({
        titre: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
    }
  };

  const PayerLivraison = async (productId: string, quantity: number) => {
    setProduit(productId);
    mutation.mutate({ productId, quantity, payment: "COD" });
  };
  const PayerLivraisonPanier = async () => {
    cartMutation.mutate();
  };

  return { BuyOpen, BuyOpenPanier, PayerLivraison, PayerLivraisonPanier };
}
