import { currentRole } from "@/lib/auth";
import AdminPage from "../admin/page";
import ClientPage from "../client/page";

export default async function Home() {
  const user = await currentRole();

  if (!user) {
    return null;
  }

  switch (user) {
    case "admin":
      return <AdminPage />;
    case "agent":
      return <AdminPage />;
    case "user":
      return <ClientPage />;
    default:
      return null;
  }
}
