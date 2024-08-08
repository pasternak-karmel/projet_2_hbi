import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavMenu } from "./_components/navbar";
import { SideBar } from "./_components/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./(preference)/forms/components/sidebar-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projet 2 Hbi",
  description: "Un site web comme leboncoin",
};
const sidebarNavItems = [
  {
    title: "Profile",
    href: "/forms",
  },
  {
    title: "Account",
    href: "/forms/account",
  },
  {
    title: "Appearance",
    href: "/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/forms/notification",
  },
  {
    title: "Display",
    href: "/forms/display",
  },
]
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
        <NavMenu/>  
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
        </body>
    </html>
  );
}
