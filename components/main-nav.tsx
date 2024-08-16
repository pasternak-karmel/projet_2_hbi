"use client";
import { useEffect, useState } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Image from "next/image";

import CustomLink from "./custom-link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import CartModal from "./CartModal";

export function MainNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const counter = 2;

  return (
    <div className="flex gap-4 items-between justify-between">
      <CustomLink href="/">
        <Button variant="ghost" className="p-0">
          {/* <Image
            src="/logo.jpeg"
            alt="Home"
            width="32"
            height="32"
            className="min-w-8"
          /> */}MARKETPLACE
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
        placeholder="Entrez pour recherchez un élément"
        className="w-[300px]"
      ></Input>
      {session ? (
        <>
          <div className="flex gap-2 items-center">
            {/* <span className="hidden text-sm sm:inline-flex">
              {session.user?.email}
            </span> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative w-8 h-8 rounded-full"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={
                        (session.user?.image as string) ??
                        "https://source.boringavatars.com/marble/120"
                      }
                      alt={session.user?.name ?? ""}
                    />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <Button
                    onClick={() => {
                      signOut();
                    }}
                  >
                    SignOut
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              signIn();
            }}
          >
            Inscription/Connexion
          </Button>
        </>
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
>(({ className, title, children, ...props }, ref) => {
  return (
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
  );
});
ListItem.displayName = "ListItem";
