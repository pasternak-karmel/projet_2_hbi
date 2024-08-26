import { redirect } from "next/navigation";
import { fetchUserRole } from "@/lib/fetchUserRole";

export async function redirectBasedOnRole() {
  const userRole = await fetchUserRole();
  console.log(userRole);

  if (userRole === "ADMIN") {
    redirect("/admin");
  } else if (userRole === "agent") {
    redirect("/agent/dashboard");
  } else {
    redirect("/");
  }
}
