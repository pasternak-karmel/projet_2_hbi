"use client";

import React, { useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CustomLink from "./custom-link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarImage } from "./ui/avatar";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const CartModal = dynamic(() => import("./CartModal"), { ssr: false });

export function MainNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { data: session } = useSession();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const counter = useMemo(() => 2, []);

  return (
    <div className="flex gap-4 items-center justify-between">
      <CustomLink href="/">
        <Button variant="ghost" className="p-0">
          MARKETPLACE
        </Button>
      </CustomLink>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/categories"
              className={navigationMenuTriggerStyle()}
            >
              Categories
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/All-Products"
              className={navigationMenuTriggerStyle()}
            >
              Articles
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Input
        type="search"
        name="search"
        placeholder="Entrez pour recherchez un élément"
        className="w-[300px]"
        onChange={handleFilterChange}
      />

      {session ? (
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={
                      session.user?.image ??
                      "https://source.boringavatars.com/marble/120"
                    }
                    alt={session.user?.name ?? ""}
                  />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <div className="flex gap-2">
                    <div>
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={
                            session.user?.image ??
                            "https://source.boringavatars.com/marble/120"
                          }
                          alt={session.user?.name ?? ""}
                        />
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {session.user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => signOut()}>
                SignOut
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button onClick={() => signIn()}>Inscription/Connexion</Button>
      )}

      {pathname !== "/produit" && (
        <Link href="/produit">
          <Button>Publier un produit</Button>
        </Link>
      )}

      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-blue-400 rounded-full text-white text-sm flex items-center justify-center">
          {counter}
        </div>
      </div>

      {isCartOpen && <CartModal />}
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";
