import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  image: string[];
  name: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, name }) => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-md shadow-md">
      <Image
        width={128}
        height={28}
        src={image[0]}
        alt={name}
        className="w-32 h-32 object-contain"
      />
      <Link href={`/categories?name=${name}`} passHref>
        <Button
          variant="outline"
          className="w-[75%] mt-4 text-lg font-semibold"
        >
          {name}
        </Button>
      </Link>
    </div>
  );
};

export default CategoryCard;
