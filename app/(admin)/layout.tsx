import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

import { Sidebar } from "../(protected)/_components/Sidebar/Sidebar";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketplace TCHE",
  description: "Mon site de vente",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-stone-950 bg-stone-100 grid gap-4 p-4 grid-cols-[220px,_1fr]">
      <Sidebar />
      {children}
    </div>
  );
}
