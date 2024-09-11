"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export type Article = {
  id: string;
  nom: string;
  description: string;
  prix: number;
  usage: boolean;
  image: string[];
  categories: {
    nom: string;
  };
  quantite: number;
};

const ActionsMenu = ({ articleId }: { articleId: string }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => router.push(`/article/${articleId}`)}>
          Consulter les infos de l&apos;article
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Columns: ColumnDef<Article>[] = [
  // id
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // nom
  {
    accessorKey: "nom",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nom
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  // description
  {
    accessorKey: "description",
    header: "Description",
  },
  // prix
  {
    accessorKey: "prix",
    header: "Prix",
  },
  // usage
  {
    accessorKey: "usage",
    header: "Usage",
    cell: ({ row }) => (row.original.usage ? "Déjà utilisé" : "Nouveau"),
  },
  // categories
  {
    accessorKey: "categories.nom",
    header: "Catégorie",
  },
  // quantite
  {
    accessorKey: "quantite",
    header: "Quantité",
  },
  // actions
  {
    id: "actions",
    cell: ({ row }) => <ActionsMenu articleId={row.original.id} />,
  },
];
