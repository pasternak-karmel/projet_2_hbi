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
import SearchBar from "./SearchBar";
import Menu from "./Menu";

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
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32 relative">
          {/* mobile */}
          <div className="h-full flex items-center justify-between md:hidden">
            <Link href="/">
              <div className="text-2xl tracking-wide">MARKETPLACE</div>
            </Link>
            <Menu />
          </div>
          {/* grand ecran */}
          <div className="hidden md:flex items-center justify-between gap-8 h-full">
            {/* gauche */}
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
             {/* droite */}
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

                      <div className="hidden md:flex items-center justify-between gap-8 h-full">
                        {/* Autres éléments... */}

                        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
                          {/* Autres éléments... */}

                          {pathname !== "/produit" && (
                            <>
                              {/* Afficher le bouton pour les écrans plus larges */}
                              <div className="hidden lg:block">
                                <Link href="/produit">
                                  <Button>Publier un produit</Button>
                                </Link>
                              </div>

                              {/* Afficher l'image pour les écrans de 1000x652 */}
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

                          {/* Autres éléments... */}
                        </div>
                      </div>


                      {/* <div
                        className="relative cursor-pointer"
                        onClick={() => setIsCartOpen((prev) => !prev)}
                      >
                        <Image src="/cart.png" alt="" width={22} height={22} />
                        <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-400 rounded-full text-white text-sm flex items-center justify-center">
                          {counter}
                        </div>
                      </div>

                      {isCartOpen && <CartModal />} */}
            </div>
          </div>     
      </div>
  );
}

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => (
//   <li>
//     <NavigationMenuLink asChild>
//       <a
//         ref={ref}
//         className={cn(
//           "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//           className
//         )}
//         {...props}
//       >
//         <div className="text-sm font-medium leading-none">{title}</div>
//         <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
//           {children}
//         </p>
//       </a>
//     </NavigationMenuLink>
//   </li>
// ));
// ListItem.displayName = "ListItem";
