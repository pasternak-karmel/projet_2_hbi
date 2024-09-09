import { CreateCart } from "@/actions/actions";
import { useSession } from "next-auth/react";
import { ToastRessuable } from "./notification-toast";
import { addToLocalCart } from "./addToLocalCart";

export function useAddToCart() {
  const { update } = useSession();

  const handleAddToCart = async (product: string, quantity: number = 1) => {
    try {
      const ajouter = await CreateCart(product, quantity);
      if (ajouter.status === 200) {
        if (!ajouter.session) {
          addToLocalCart(ajouter.cartItem);
          ToastRessuable({
            titre: "Article ajouté au panier avec succès",
            description:
              "Cliquez sur votre panier pour poursuivre vers la page de paiement.",
          });
        } else {
          if (ajouter.success) {
            await update(ajouter.session);
            ToastRessuable({
              titre: "Article ajouté au panier avec succès",
              description:
                "Cliquez sur votre panier pour poursuivre vers la page de paiement.",
            });
          } else {
            ToastRessuable({
              titre: "Une erreur a été rencontrée",
              description: ajouter.error || "",
            });
          }
        }
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
