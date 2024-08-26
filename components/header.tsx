"use client";
import { useEffect } from "react";
import { Session } from "next-auth";
import { MainNav } from "./main-nav";
import { Navbar } from "@/app/(protected)/_components/navbar";
import { useRouter } from "next/navigation";

interface HeaderProps {
  session: Session | null;
  role: string | null;
}

export default function Header({ session, role }: HeaderProps) {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (role === "ADMIN") {
        router.push("/admin");
      } else if (role === "AGENT") {
        router.push("/agent");
      } else {
        router.push("/");
      }
    }
  }, [session, role, router]);

  if (role === "ADMIN" || role === "AGENT") {
    return <Navbar />;
  }

  return (
    <header className="w-full lg:w-4/5 lg:max-w-[1105px]">
      <MainNav session={session} />
    </header>
  );
}
