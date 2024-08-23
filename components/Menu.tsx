"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="" ref={menuRef}>
      <Image
        src="/menu.png"
        alt="Menu"
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      <div
        className={`absolute top-16 right-0 w-64 bg-black text-white flex flex-col items-center justify-center gap-4 text-xl z-10 transition-transform duration-300 ease-in-out ${
          open ? "transform translate-x-0 opacity-100" : "transform translate-x-[-100%] opacity-0"
        }`}
        style={{ transformOrigin: 'top right' }}
      >
        <Link href="/">Homepage</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/All-Products">Articles</Link>
        <Link href="/produit">Publier un produit</Link>
      </div>
    </div>
  );
};

export default Menu;
