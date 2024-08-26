import { Session } from "next-auth";
import { MainNav } from "./main-nav";
import { Navbar } from "@/app/(protected)/_components/navbar";

import React from "react";

interface HeaderProps {
  session: Session | null;
  role: string | null;
}

export default function Header({ session, role }: HeaderProps) {
  if (role === "ADMIN") {
    return <Navbar />;
  }

  if (role === "AGENT") {
    return <Navbar />;
  }
  return (
    <header className="w-full lg:w-4/5 lg:max-w-[1105px]">
      <div>
        <MainNav session={session} />
      </div>
    </header>
  );
}
