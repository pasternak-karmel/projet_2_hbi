// import Dashboard from "@/components/dashboard";
import Hero from "@/app/_components/hero";
import Categories from "@/app/_components/categories";
import Collection from "@/app/_components/collection";

export default function Home() {
  return (
    // <main className="w-[1100px] flex flex-col gap-4">
    <main className="flex flex-col ">
      <Hero />
      <Categories />
      <Collection />
    </main>
  );
}
