"use client";
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

  if (role === "ADMIN") {
    return null;
    // return <Navbar />;
  }

  if (role === "AGENT") {
    return null;
    // return <NavbarAgent />;
  }

  return (
    <header className="w-full lg:w-4/5 lg:max-w-[1105px]">
      <MainNav session={session} />
    </header>
  );
}
