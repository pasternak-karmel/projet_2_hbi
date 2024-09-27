"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MessageriesButton } from "@/components/messageries/messageries";
import { produit } from "@/actions/my_api";

const FormSchema = z.object({
  nom: z.string(),
  prix: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
  usage: z.boolean(),
  quantite: z.coerce
    .number()
    .min(0, "Quantity must be greater than or equal to 0"),
  description: z.string(),
  delete: z.boolean().default(false).optional(),
});

export default function Produit({ params }: { params: { id: string } }) {
  const router = useRouter();

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["votreProduit", params.id],
    queryFn: () => produit(params.id),
  });

  const mutation = useMutation({
    mutationFn: async (updatedData: any) => {
      const response = await fetch(`/api/article/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      return response.json();
    },
    onSuccess: () => {
      router.push("/produit/vosproduits");
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (product) {
      form.reset({
        nom: product.nom,
        prix: product.prix,
        usage: product.usage,
        quantite: product.quantite,
        description: product.description,
        delete: product.isDeleted,
      });
    }
  }, [product, form]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-gray-500" />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.message}
      </div>
    );

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate({
      ...data,
      isDeleted: data.delete,
      categoriesId: product?.categoriesId,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4">
      <Tabs defaultValue="edit" className="w-full max-w-4xl">
        <TabsList className="grid grid-cols-2 gap-2">
          <TabsTrigger value="edit">Modification</TabsTrigger>
          <TabsTrigger value="discussion">
            Discussion avec l&apos;agent
          </TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="mt-4">
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-xl">
              <CardTitle className="text-2xl font-bold">Edit Product</CardTitle>
              <CardDescription className="text-sm">
                Modify your product details below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={mutation.isPending}
                              placeholder="Product Name"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="prix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              disabled={mutation.isPending}
                              placeholder="Price"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="usage"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-gray-100">
                          <div>
                            <FormLabel>Usage</FormLabel>
                            <FormDescription>
                              Cochez veut dire que votre article est neuf
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              disabled={mutation.isPending}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="transition-colors duration-200"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="quantite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantite</FormLabel>
                          <FormControl>
                            <Input
                              disabled={mutation.isPending}
                              type="number"
                              {...field}
                              placeholder="Quantity"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={mutation.isPending}
                            placeholder="Describe your product..."
                            {...field}
                            className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="delete"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-red-700">
                        <div className="text-white">
                          <FormLabel>Suprimer l&apos;article</FormLabel>
                          <FormDescription className="text-white text-foreground">
                            Cochez si vous souhaitez supprimer votre article
                            <p>
                              Attention vous pourrez plus récupérer
                              &apos;article{" "}
                              <span className="font-bold underline">
                                {product.nom}
                              </span>
                            </p>
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={mutation.isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="transition-colors duration-200"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className={cn(
                      "w-full py-2 rounded-lg transition-all",
                      mutation.isPending
                        ? "bg-gray-400"
                        : "bg-blue-500 hover:bg-blue-600"
                    )}
                  >
                    {mutation.isPending ? "Updating..." : "Save changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="discussion" className="mt-4">
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-t-xl">
              <CardTitle className="text-2xl font-bold">
                Discussion avec l&apos;agent carmel
              </CardTitle>
              <CardDescription className="text-sm">
                Discutez de vos préocupation avec l&apos;agent en toute
                simplicité
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {product.agentId !== null ? (
                <MessageriesButton asChild produit={product.id} mode="redirect">
                  <Button> discuter avec l&apos;agent </Button>
                </MessageriesButton>
              ) : (
                <p>
                  Vous n&apos;avez pas encore d&apos;agent assigné pour cet
                  article
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
