"use client";
import { useEffect } from "react";
import { Session } from "next-auth";
import { MainNav } from "./main-nav";
import { Navbar } from "@/app/(protected)/_components/navbar";
import { usePathname, useRouter } from "next/navigation";
import NavbarAgent from "@/app/(agent)/agent_components/agent-navbar";

interface HeaderProps {
  session: Session | null;
  role: string | null;
}

export default function Header({ session, role }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   if (session) {
  //     if (role === "ADMIN" && pathname !== "/admin") {
  //       router.push("/admin");
  //     } else if (role === "AGENT" && pathname !== "/agent") {
  //       router.push("/agent/dashboard");
  //     } else if (!role && pathname !== "/") {
  //       router.push("/");
  //     }
  //   }
  // }, [session, role, pathname, router]);

  // useEffect(() => {
  //   if (session) {
  //     if (role === "ADMIN") {
  //       router.push("/admin");
  //     } else if (role === "AGENT") {
  //       router.push("/agent");
  //     } else {
  //       router.push("/");
  //     }
  //   }
  // }, [session, role, router]);

  if (role === "ADMIN") {
    return <Navbar />;
  }
  
  if (role === "AGENT") {
    return <NavbarAgent />;
  }

  return (
    <header className="w-full lg:w-4/5 lg:max-w-[1105px]">
      <MainNav session={session} />
    </header>
  );
}
