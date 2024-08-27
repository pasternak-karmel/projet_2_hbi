"use client";
import { Session } from "next-auth";


import React from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import { LoginButton } from "./auth/login-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { FaUser } from "react-icons/fa";

interface MainNavProps {
  session: Session | null;
}

export function MainNav({ session }: MainNavProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32 relative">
        <div className="h-full flex items-center justify-between md:hidden">
          <Link href="/">
            <div className="text-2xl tracking-wide">MARKETPLACE</div>
          </Link>
          <Menu />
        </div>
        <div className="hidden md:flex items-center justify-between gap-8 h-full">
          <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
            <CustomLink href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="" width={24} height={24} />
              <div className="text-2xl tracking-wide">
                <Button variant="ghost" className="text-2xl tracking-wide">
                  MARKETPLACE
                </Button>
              </div>
            </CustomLink>
          </div>
          <div className="w-2/3 xl:w-1/2 flex items-center  gap-2">
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

            <SearchBar />

            {session ? (
              <div className="flex gap-2 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative w-8 h-8 rounded-full"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={
                            session.user.image ??
                            "https://source.boringavatars.com/marble/120"
                          }
                          alt={session.user?.name ?? ""}
                        />
                        <AvatarFallback className="bg-sky-500">
                          <FaUser className="text-white" />
                        </AvatarFallback>
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
                              <AvatarFallback className="bg-sky-500">
                                <FaUser className="text-white" />
                              </AvatarFallback>
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
                      <ExitIcon className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <LoginButton asChild>
                <Button variant="secondary" size="lg">
                  Login
                </Button>
              </LoginButton>
            )}

            <div className="hidden md:flex items-center justify-between gap-8 h-full">
              <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
                {pathname !== "/produit" && (
                  <>
                    <div className="hidden lg:block">
                      <Link href="/produit">
                        <Button>Publier un produit</Button>
                      </Link>
                    </div>

                    <div className="block lg:hidden">
                      <Link href="/produit">
                        <Image
                          src="/publier.png"
                          alt="Publier un produit"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
