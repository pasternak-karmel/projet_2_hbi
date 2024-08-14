import { auth } from "@/auth";
// import { authOptions } from "app/api/auth/[...nextauth]/route";

export const GET = auth((req) => {
  console.log("Auth Check:", req.auth);
  if (req.auth) {
    return new Response(JSON.stringify({ data: req.auth.user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "Not authenticated" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
});
