"use client";
import * as React from "react";

import AdminOverview from "../_components/admin-overview";
import { ChatAdmin } from "../_components/chat-admin";
export default function Admin() {
  return (
    <main className={` min-h-screen p-4 `}>
      <AdminOverview />
      <ChatAdmin />
    </main>
  );
}
