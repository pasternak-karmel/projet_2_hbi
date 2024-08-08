import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavMenu } from "./_components/navbar";
import { SideBar } from "./_components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projet 2 Hbi",
  description: "Un site web comme leboncoin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <div>
            {children}
          </div>
          </div>
        </body>
    </html>
  );
}
