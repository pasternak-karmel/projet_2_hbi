"use client";

// import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
// import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <h1 className="text-2xl font-bold mb-5">Filtres</h1>
      <div className="flex flex-col mb-4">
        <div className="mb-5">
          <Label className="text-muted-foreground">Catégories</Label>
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select a categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Catégories</SelectLabel>
                <SelectItem value="tout">Tout</SelectItem>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-5">
          <Label className="text-muted-foreground">Usage</Label>
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select un usage" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Usage</SelectLabel>
                <SelectItem value="tout">Tout</SelectItem>
                <SelectItem value="neuf">Neuf</SelectItem>
                <SelectItem value="use">Déjà utilisé</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-5">
          <Label className="text-muted-foreground">Point de vente</Label>
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Choisissez un point de vente" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="tout">N&apos;importe</SelectItem>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
}

//category

//nouveautés

//point de retrait

//meilleures ventes

//ventes flash

//usage

{
  /* {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))} */
}
