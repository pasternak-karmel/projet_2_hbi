"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { useMedia } from "react-use";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
  };

  return isMobile ? (
    <MobileNav items={items} pathname={pathname} onClick={onClick} />
  ) : (
    <DesktopNav items={items} pathname={pathname} className={className} />
  );
}

const MobileNav = ({
  items,
  pathname,
  onClick,
}: {
  items: { href: string; title: string }[];
  pathname: string;
  onClick: (href: string) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 bg-gray-200 rounded-lg w-full text-left"
      >
        {menuOpen ? "Fermer le Menu" : "Ouvrir le Menu"}
      </button>

      {menuOpen && (
        <div className="mt-2 flex flex-col space-y-1 bg-white shadow-lg p-2 rounded-lg">
          {items.map((item) => (
            <button
              key={item.href}
              onClick={() => {
                onClick(item.href);
                setMenuOpen(false);
              }}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start text-left w-full"
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DesktopNav = ({
  items,
  pathname,
  className,
}: {
  items: { href: string; title: string }[];
  pathname: string;
  className?: string;
}) => {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};
