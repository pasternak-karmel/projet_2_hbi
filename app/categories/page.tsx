import Image from "next/image";
import Link from "next/link";
import { categoriesItems } from "@/types";

export default function Categories() {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {/* {res.items.map((product: products.Product) => ( */}
      {categoriesItems.map((item) => (
        <Link
          href={"/" + item.id}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={item.id}
        >
          <div className="relative w-full h-80">
            <Image
              src={item.image || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {item.image && (
              <Image
              // src={product.media?.items[1]?.image?.url || "/product.png"}
              src={item.image || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>
          <button className="rounded-2xl ring-1 ring-lama text-lama  py-2 px-4 text-xs hover:bg-black hover:text-white text-center items-center">
            {item.name} 
          </button>
        </Link>
      ))}
    </div>
  );
}
