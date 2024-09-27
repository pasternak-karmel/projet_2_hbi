"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { ToastRessuable } from "@/function/notification-toast";

const accountFormSchema = z.object({
  adresse: z
    .string()
    .min(2, { message: "L'adresse doit être au moins 2 caractères." })
    .max(50, { message: "L'adresse ne doit pas dépasser 50 caractères" }),
  num: z.coerce.number().min(0, "Votre numéro doit être superieur à 0"),
  mobile: z.boolean().default(false).optional(),
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  // password: z.optional(z.string().min(6)),
  // newPassword: z.optional(z.string().min(6)),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export default function AccountForm() {
  const user = useCurrentUser();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      adresse: user?.adresse || "",
      num: user?.num || 0,
      // password: "",
      // newPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (updatedData: any) => {
      const response = await fetch(`/api/user/updateUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      return response.json();
    },
    onSuccess: () => {
      ToastRessuable({
        titre: "Success",
        description: "Vos données ont été bien enregistrées.",
      });
    },
    onError: (error) => {
      ToastRessuable({
        titre: "Erreur",
        description: error.message,
      });
    },
  });

  function onSubmit(data: AccountFormValues) {
    mutation.mutate(data);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mb-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="john.doe@example.com"
                    type="email"
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adresse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your adresse"
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="num"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Your num"
                    disabled={mutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="******"
                    type="password"
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="******"
                    type="password"
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Updating..." : "Save changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
