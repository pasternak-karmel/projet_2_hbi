import { MainNav } from "./main-nav";
import React from "react";
export default function Header() {
  return (
    <header className="w-full lg:w-4/5 lg:max-w-[1105px]">
      <div>
        <MainNav />
      </div>
    </header>
  );
}
