"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MessageriesForm } from "./messageries-forms";

interface MessageriesButtonProps {
  children?: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  produit: string;
}

export const MessageriesButton = ({
  children,
  mode = "modal",
  asChild,
  produit,
}: MessageriesButtonProps) => {
  const router = useRouter();

  const onClick = async () => {
    router.push(`${produit}/messages?id=${produit}`);
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <MessageriesForm produit={produit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
