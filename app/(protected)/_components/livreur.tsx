"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddLivreurForm } from "./livreur-form";

interface LivreurProps {
  children?: React.ReactNode;
  asChild?: boolean;
}

export const AddLivreur = ({ children, asChild }: LivreurProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Livreur</SheetTitle>
          <SheetDescription>
            Entrez les infos du livreur pour la création
          </SheetDescription>
        </SheetHeader>
        <AddLivreurForm />
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};
export default AddLivreur;
