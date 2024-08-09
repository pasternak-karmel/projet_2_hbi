"use client";

import * as React from "react";

import * as actions from "@/actions";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z
  .object({
    nom: z.string().min(3, {
      message: "Votre nom doit contenir au moins 3 lettres.",
    }),
    email: z.string().email({
      message: "L'adresse email n'est pas valide.",
    }),
    password: z
      .string()
      .min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères.",
      })
      .regex(/(?=.*[A-Z])/, {
        message: "Le mot de passe doit contenir au moins une majuscule.",
      })
      .regex(/(?=.*\d)/, {
        message: "Le mot de passe doit contenir au moins un chiffre.",
      })
      .regex(/(?=.*[\W_])/, {
        message: "Le mot de passe doit contenir au moins un caractère spécial.",
      }),
    confirmPassword: z.string().min(6, {
      message:
        "La confirmation du mot de passe doit contenir au moins 6 caractères.",
    }),
    number: z.number(),
    type: z.string({
      required_error: "Veuillez sélectionner un type.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les mots de passe ne correspondent pas.",
        path: ["confirmPassword"],
      });
    }
  });

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      email: "",
      password: "",
      confirmPassword: "",
      number: 0,
    },
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(values);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const result = await actions.createUser(values);

    setIsLoading(false);

    if (result.success) {
      toast("User created", {
        description: ` ${result.message}`,
        action: {
          label: "Cancel",
          onClick: () => console.log("Cancelled"),
        },
      });
      router.push("/");
    } else {
      toast("Error", {
        description: `${result.message}`,
        action: {
          label: "Cancel",
          onClick: () => console.log("Cancelled"),
        },
      });
      form.reset({
        nom: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className={cn("grid gap-8", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name here"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email here"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password here"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Repeat your password"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Je souhaite </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="acheteur">Acheter</SelectItem>
                      <SelectItem value="vendeur">Vendre</SelectItem>
                      <SelectItem value="none">Pas encore décider</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
