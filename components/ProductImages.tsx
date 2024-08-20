"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={items}
          alt={items}
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {/* {items.map((items:any, i:number) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={items.id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={items.Image}
              alt=""  
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ProductImages;
