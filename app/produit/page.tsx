"use client";
// import * as React from "react";
import React, { useState } from "react";
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
import AccessDenied from "@/components/access-denied";
import { SingleImageDropzone } from "@/components/single-image-dropzone";

const formSchema = z.object({
  nom: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  prix: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
  quantite: z.coerce.number().min(1, "Quantity be greater than or equal to 0"),
  usage: z.boolean().default(false).optional(),
  description: z.string().optional(),
  categories: z.enum([
    "outils",
    "meubles",
    "jardin",
    "Electroménager",
    "pour la maison",
    "jeux videos",
    "livre films et musique",
    "bijoux et accessoires",
    "sac et bagages",
    "vetements et chaussures pour hommes",
    "vetements et chaussures pour femmes",
    "jouer et jeux",
    "puericulture et enfants",
    "sante et beaute",
    "telephones mobiles",
    "electroniques et ordinateurs",
    "sports et activites exterieures",
    "instruments de musique",
    "artisanat d'art",
    "antiquites et objects de collection",
    "pieces automobiles",
    "velos",
    "vide-grenier",
    "divers",
  ]),
  image: z.string().optional(),
});

export default function AddProduit() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  } | null>(null);
  const { edgestore } = useEdgeStore();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      description: "",
      usage: false,
      quantite: 1,
      prix: 0,
    },
  });

  if (!session) return <AccessDenied />;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (file) {
        const res = await edgestore.myPublicImages.upload({
          file,
          // options: {
          //   temporary: true,
          // },
          input: { type: "post" },
          onProgressChange: (progress) => setProgress(progress),
        });
        setUrls({ url: res.url, thumbnailUrl: res.thumbnailUrl });
        values.image = res.url;
      }

      // react query later
      const response = await fetch("/api/AddArticle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      if (result.status === 401) return <AccessDenied />;
      if (result.succes) {
        // await edgestore.myPublicImages.confirmUpload({
        //   url: urls?.url,
        // });
        toast("Article ajouté avec succès", {
          description: result.message,
          action: { label: "Fermer", onClick: () => console.log("Undo") },
        });
        form.reset();
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-5 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
          Ajouter un nouvel article
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Le nom de votre article"
                      {...field}
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg"
                    />
                  </FormControl>
                  <FormDescription>
                    C&apos;est le nom par lequel les acheteurs verront votre
                    article.
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
                      disabled={loading}
                      type="number"
                      placeholder="Le prix de votre article"
                      {...field}
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg"
                    />
                  </FormControl>
                  <FormDescription>
                    C&apos;est le prix auquel vous vendez votre article.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantité disponible</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      placeholder="Le nombre que vous souhaitez mettre en sell"
                      {...field}
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg"
                    />
                  </FormControl>
                  <FormDescription>
                    C'est la quantité disponible que vous souhaitez mettre en
                    vente
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usage"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-gray-100">
                  <div>
                    <FormLabel>Votre article est neuf ?</FormLabel>
                    <FormDescription>
                      Cochez si votre article est neuf.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={loading}
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
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg">
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Maison et Jardin</SelectLabel>
                          <SelectItem value="outils">Outils</SelectItem>
                          <SelectItem value="meubles">Meubles</SelectItem>
                          <SelectItem value="jardin">Jardin</SelectItem>
                          <SelectItem value="Electroménager">
                            Electroménager
                          </SelectItem>
                          <SelectItem value="Pour la maison">
                            Pour la maison
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Divertissement</SelectLabel>
                          <SelectItem value="jeux videos">Jeu video</SelectItem>
                          <SelectItem value="livre films et musique">
                            livre films et musique
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Vêtement et accésoires</SelectLabel>
                          <SelectItem value="sac et bagages">
                            sacs et bagagues
                          </SelectItem>
                          <SelectItem value="vetements et chaussures pour hommes">
                            vetement et chaussures pour hommes
                          </SelectItem>
                          <SelectItem value="vetements et chaussures pour femmes">
                            vetement et chaussures pour femmes
                          </SelectItem>
                          <SelectItem value="bijoux et accessoires">
                            bijoux et accessoires
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Famille</SelectLabel>
                          <SelectItem value="sante et beaute">
                            sante et beaute
                          </SelectItem>
                          <SelectItem value="vetement et chaussures pour hommes">
                            produit pour animaux
                          </SelectItem>
                          <SelectItem value="puericulture et enfants">
                            puericulture et enfants
                          </SelectItem>
                          <SelectItem value="jouer et jeux">
                            jouets et jeux
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>électronique</SelectLabel>
                          <SelectItem value="electronique et ordinateurs">
                            electronique et ordinateurs
                          </SelectItem>
                          <SelectItem value="telephones mobiles">
                            telephones mobiles
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Loisirs</SelectLabel>
                          <SelectItem value="velos">velos</SelectItem>
                          <SelectItem value="artisanat d'art">
                            artisanat d'art
                          </SelectItem>
                          <SelectItem value="sport et activites exterieures">
                            sport et activites exterieures
                          </SelectItem>
                          <SelectItem value="piece auto">piece auto</SelectItem>
                          <SelectItem value="instrument de musique">
                            instrument de musique
                          </SelectItem>
                          <SelectItem value="antiquites et objects de collection">
                            antiquites et objects de collection
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Petites annonces</SelectLabel>
                          <SelectItem value="vide-grenier">
                            vide-grenier
                          </SelectItem>
                          <SelectItem value="divers">divers</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Les acheteurs pourront trouver votre article dans cette
                    catégorie.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Mon habit n'a jamais été porter pas quelqu'un "
                      {...field}
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg"
                    />
                  </FormControl>
                  <FormDescription>
                    Donnez plus de détails sur votre article.
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <FormLabel className="text-lg font-medium text-gray-800">
                Ajouter une image de votre article
              </FormLabel>
              <SingleImageDropzone
                width={200}
                height={200}
                value={file}
                dropzoneOptions={{ maxSize: 1024 * 1024 * 1 }}
                onChange={(file) => setFile(file)}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-500 transition-colors"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Publication en cours..." : "Publier"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
