import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

import { Toaster } from "@/components/ui/sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ReactQueryProviders } from "@/feature/reactQueryProviders";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { fetchUserRole } from "@/lib/fetchUserRole";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projet HBI",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = await fetchUserRole();

  return (
    <SessionProvider session={session}>
      <ReactQueryProviders>
        <html lang="en">
          <body className={inter.className}>
            <div className="">
              <Header session={session} role={user} />
              <main className="flex flex-col">
                <EdgeStoreProvider>{children}</EdgeStoreProvider>
              </main>
            </div>
            <Toaster />
          </body>
        </html>
      </ReactQueryProviders>
    </SessionProvider>
  );
}
