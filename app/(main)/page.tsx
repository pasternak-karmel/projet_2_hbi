import Hero from "@/app/_components/hero";
import Categories from "@/app/_components/categories";
import Collection from "@/app/_components/collection";
import ProductList from "@/components/ProductList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Poppins } from "next/font/google";

import { currentRole } from "@/lib/auth";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function Home() {
  // const user = await currentRole();

  return (
    <main
      className={cn("flex flex-col", font.className)}
      // "flex flex-col "
    >
      <Hero />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Produits en vedette </h1>
        <ProductList />
        <div className="mb-8"></div>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex justify-between">
          <h1 className="text-2xl">Achats par Catégories</h1>
          <Link href="/categories">
            <Button variant="link" className="text-muted-foreground">
              Tout voir
            </Button>
          </Link>
        </div>
        <Categories />
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex justify-between">
          <h1 className="text-2xl">Nouveaux Produits</h1>
          <Link href="/categories">
            <Button variant="link" className="text-muted-foreground">
              Tout voir
            </Button>
          </Link>
        </div>

        <ProductList />

        <div className="mb-8"></div>
      </div>
      <Collection />
    </main>

    // <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
    //   <div className="space-y-6 text-center">
    //     <h1
    //       className={cn(
    //         "text-6xl font-semibold text-white drop-shadow-md",
    //         font.className
    //       )}
    //     >
    //       🔐 Auth
    //     </h1>
    //     <p className="text-white text-lg">A simple authentication service</p>
    //     <div>
    //       <LoginButton asChild>
    //         <Button variant="secondary" size="lg">
    //           Sign in
    //         </Button>
    //       </LoginButton>
    //     </div>
    //   </div>
    // </main>
  );
}
