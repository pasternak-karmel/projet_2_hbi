"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { ConfirmRecuArticle } from "@/actions/accepte_article";

interface radioInform {
  produit: string;
}

const FormSchema = z.object({
  type: z.enum(["yes", "no"], {
    required_error: "Vous devez sélectionnez une reponse valide.",
  }),
});

export function RadioGroupForm({ produit }: radioInform) {
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await ConfirmRecuArticle(produit, data.type);
    if (result.error) {
      toast("Erreur", {
        description: result.error,
        action: {
          label: "Fermer",
          onClick: () => console.log("Undo"),
        },
      });
    } else {
      toast("Confirmation réussi", {
        description: result.message,
        action: {
          label: "Fermer",
          onClick: () => console.log("Undo"),
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-auto flex justify-between"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex content-center items-center justify-between">
              <FormLabel className="font-extrabold">Confirmez</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Le produit est conforme
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Le produit n'est pas conforme
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialog open={confirmSubmit} onOpenChange={setConfirmSubmit}>
          <AlertDialogTrigger asChild>
            <Button type="button">Submit</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
              <AlertDialogDescription>
                Confirmez-vous que le produit est conforme ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmSubmit(false)}>
                Retour
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  form.handleSubmit(onSubmit)();
                  setConfirmSubmit(false);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
}
