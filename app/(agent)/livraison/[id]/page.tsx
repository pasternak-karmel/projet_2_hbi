import { MessageriesButton } from "@/components/messageries/messageries";
import { Button } from "@/components/ui/button";

export default function LivraisonSpecifique({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      Livraison page
      <div>
        <MessageriesButton asChild produit={params.id}>
          <Button>Discuter</Button>
        </MessageriesButton>
      </div>
    </div>
  );
}
