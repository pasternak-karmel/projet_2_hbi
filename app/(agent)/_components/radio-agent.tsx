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
import { useState, useTransition } from "react";
import { ConfirmRecuArticle } from "@/actions/accepte_article";
import { useQueryClient } from "@tanstack/react-query";
import { ToastRessuable } from "@/function/notification-toast";

interface radioInform {
  produit: string;
}

interface RadioProps {
  value: string;
  label: string;
}

const FormSchema = z.object({
  type: z.enum(["yes", "no"], {
    required_error: "Vous devez sélectionnez une reponse valide.",
  }),
});

const RadioOption = ({ value, label }: RadioProps) => (
  <FormItem className="flex items-center space-x-3">
    <FormControl>
      <RadioGroupItem value={value} />
    </FormControl>
    <FormLabel className="font-normal">{label}</FormLabel>
  </FormItem>
);

export function RadioGroupForm({ produit }: radioInform) {
  const queryClient = useQueryClient();
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [status, setStatus] = useState<{ error?: string; success?: string }>(
    {}
  );
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setStatus({});
    startTransition(async () => {
      const result = await ConfirmRecuArticle(produit, values.type);
      setStatus({ error: result?.error, success: result?.succes || "" });
      ToastRessuable({
        titre: result?.error || "",
        description: result?.succes || "",
      });

      queryClient.invalidateQueries({
        queryKey: ["confirmationPage", produit],
        exact: true,
        refetchType: "active",
      });
      form.reset();
    });
  };

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
                  <RadioOption value="yes" label="Le produit est conforme" />
                  <RadioOption
                    value="no"
                    label="Le produit n'est pas conforme"
                  />
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
                Valider votre choix
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
                Valider
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
}
