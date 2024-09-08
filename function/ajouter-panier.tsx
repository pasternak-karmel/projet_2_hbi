import { CreateCart } from "@/actions/actions";
import { useSession } from "next-auth/react";
import { ToastRessuable } from "./notification-toast";

export function useAddToCart() {
  const { update } = useSession();

  const handleAddToCart = async (product: string, quantity: number = 1) => {
    try {
      const ajouter = await CreateCart(product, quantity);

      if (ajouter.succes) {
        await update(ajouter.sessionU);
        ToastRessuable({
          titre: "Article ajouté au panier avec succès",
          description:
            "Cliquez sur votre panier pour poursuivre vers la page de paiement.",
        });
      } else {
        ToastRessuable({
          titre: "Une erreur a été rencontrée",
          description: ajouter.error as string,
        });
      }
    } catch (error) {
      ToastRessuable({
        titre: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
    }
  };

  return { handleAddToCart };
}
