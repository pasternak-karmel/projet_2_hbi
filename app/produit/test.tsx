"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEdgeStore } from "@/lib/edgestore";
import { useSession } from "next-auth/react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/app/_components/dropzone/ImageUploader";
import AccessDenied from "@/components/access-denied";
import { useState } from "react";
import Image from "next/image";
import * as React from "react";
import { SingleImageDropzone } from "@/components/single-image-dropzone";

const formSchema = z.object({
  nom: z
    .string()
    .min(2, {
      message: "Le nom doit contenir au moins 2 caractères",
    })
    .max(50, {
      message: "Le nom ne peut pas dépasser 50 caractères",
    }),
  prix: z.string(),
  usage: z.boolean().default(false).optional(),
  description: z.string().optional(),
  categories: z.enum(["habit", "ustensible", "autres"]),
  image: z.string().optional(),
});
export default function AddProduit() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();
  const { edgestore } = useEdgeStore();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      description: "",
    },
  });
  if (!session) return <AccessDenied />;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (file) {
        const res = await edgestore.myPublicImages.upload({
          file,
          input: { type: "post" },
          onProgressChange: (progress) => setProgress(progress),
        });
        setUrls({ url: res.url, thumbnailUrl: res.thumbnailUrl });
        values.image = res.url; 
      }

      const response = await fetch("/api/AddArticle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      if (result.status === 401) return <AccessDenied />;
      if (result.success) {
        toast("Article ajouté avec succès", {
          description: result.message,
          action: { label: "Fermer", onClick: () => console.log("Undo") },
        });
      } else {
        toast.error("Erreur lors de l'ajout de l'article", {
          description: result.message,
          action: { label: "Fermer", onClick: () => console.log("Undo") },
        });
      }
    } catch (error) {
      toast.error("Une erreur s'est produite", {
        description: "Error submitting form",
        action: { label: "Fermer", onClick: () => console.log("Undo") },
      });
    }
  };
  return (
    <div className="w-full min-h-screen p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Le nom de votre article" {...field} />
                </FormControl>
                <FormDescription>
                  C&apos;est le nom par lequel les acheteurs verront votre
                  article
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix en XOF</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Le prix de votre article"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  C&apos;est le prix auquel vous vendez votre article
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usage"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Votre article est neuf ?
                  </FormLabel>
                  <FormDescription>
                    Chocher si votre article est neuf
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Selectionnez une catégories pour votre article
                  </FormLabel>
                  <FormDescription>
                    Les acheteurs pourront trouvés votre article dans cette
                    catégories
                  </FormDescription>
                </div>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder="Select a categories"
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Catégories</SelectLabel>
                        <SelectItem value="habit">Habits</SelectItem>
                        <SelectItem value="ustensible">Ustensibles</SelectItem>
                        <SelectItem value="autres">autres</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Entrez une description
                  </FormLabel>
                  <FormDescription>
                    Chocher si votre article est neuf
                  </FormDescription>
                </div>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <FormLabel>Ajouter une image</FormLabel>
            <SingleImageDropzone
              width={200}
              height={200}
              value={file}
              dropzoneOptions={{
                maxSize: 1024 * 1024 * 1,
              }}
              onChange={(file) => {
                setFile(file);
              }}
            />
          </div>
          <Button type="submit">Publier</Button>
        </form>
      </Form>
    </div>
  );
}
