"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEdgeStore } from "@/lib/edgestore";
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
import {
  MultiImageDropzone,
  type FileState,
} from "@/components/multi-image-dropzone";
import { AddArticleSchema } from "@/schemas";

export default function AddProduit() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [urls, setUrls] = useState<
    { url: string; thumbnailUrl: string | null }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const form = useForm<z.infer<typeof AddArticleSchema>>({
    resolver: zodResolver(AddArticleSchema),
    defaultValues: {
      nom: "",
      description: "",
      usage: false,
      quantite: 1,
      prix: 0,
      image: [],
    },
  });

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const onSubmit = async (values: z.infer<typeof AddArticleSchema>) => {
    setLoading(true);
    try {
      if (fileStates.length === 0) {
        return toast.error("Erreur!!!", {
          description: "Veuillez sélectionner au moins une image",
          action: { label: "Fermer", onClick: () => console.log("Undo") },
        });
      }
      const imageUrls = await Promise.all(
        fileStates.map(async (fileState) => {
          if (fileState.file instanceof File) {
            try {
              const res = await edgestore.myArrowImages.upload({
                options: { temporary: true },
                file: fileState.file,
                input: { type: "post" },
                onProgressChange: (progress) => {
                  updateFileProgress(fileState.key, progress);
                },
              });
              return { url: res.url, thumbnailUrl: res.thumbnailUrl || null };
            } catch (err) {
              toast.error(`Erreur lors de l'upload de l'image`, {
                description: `Image: ${fileState.key} - Erreur lors de l'upload`,
              });
              return null;
            }
          } else {
            return null;
          }
        })
      );

      const validImageUrls = imageUrls.filter(
        (res): res is { url: string; thumbnailUrl: string | null } =>
          res !== null
      );

      values.image = validImageUrls.map((urlObj) => urlObj.url);

      const response = await fetch("/api/AddArticle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      console.log(result);
      if (result.success) {
        for (const urlObj of validImageUrls) {
          await edgestore.myArrowImages.confirmUpload({ url: urlObj.url });
        }
        toast("Article ajouté avec succès", {
          description: result.message,
          action: { label: "Fermer", onClick: () => console.log("Undo") },
        });
        form.reset();
        setFileStates([]);
        setUrls([]);
      } else {
        for (const urlObj of validImageUrls) {
          await edgestore.myArrowImages.delete({ url: urlObj.url });
        }
        
        toast.error("Erreur lors de l'ajout de l'article", {
          description: result.message,
          action: { label: "Fermer", onClick: () => console.log("Undo") },
        });
      }
    } catch (error) {
      toast.error("Une erreur s'est produite", {
        description: "Veuillez réessayer plus tard",
        action: { label: "Fermer", onClick: () => console.log("Undo") },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-5 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-5 sm:p-8 lg:p-10 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
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
                    C&apos;est le prix auquel vous vendez votre article. (0 veut
                    dire gratuit)
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
                    C&apos;est la quantité disponible que vous souhaitez mettre
                    en vente
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
                          <SelectItem value="electroniques et ordinateurs">
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
                            artisanat d&apos;art
                          </SelectItem>
                          <SelectItem value="sports et activites exterieures">
                            sport et activites exterieures
                          </SelectItem>
                          <SelectItem value="pieces automobiles">
                            pieces automobiles
                          </SelectItem>
                          <SelectItem value="instruments de musique">
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

              <MultiImageDropzone
                value={fileStates}
                dropzoneOptions={{
                  maxFiles: 6,
                }}
                onChange={(files) => {
                  setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                  setFileStates([...fileStates, ...addedFiles]);
                }}
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
