import Hero from "@/app/_components/hero";
import Categories from "@/app/_components/categories";
import Collection from "@/app/_components/collection";
import ProductList from "@/components/ProductList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    // <main className="w-[1100px] flex flex-col gap-4">
    <main className="flex flex-col ">
      <Hero />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Produits en vedette </h1>
        <ProductList
            categoryId="dfdfvd"
            limit={4}
          />
          <div className="mb-8">

          </div>
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
           <Categories />
       </div>
      <Collection />
    </main>
  );
}
