import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

import {
  DEFAULT_LOGIN_REDIRECT,
  adminRoutes,
  agentRoutes,
  apiAuthPrefix,
  apiPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiPrefix = nextUrl.pathname.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAgentRoute = agentRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (isApiAuthRoute || isApiPrefix) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && (isAdminRoute || isAgentRoute)) {
    const callbackUrl = nextUrl.pathname + nextUrl.search;
    return NextResponse.redirect(
      new URL(
        `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
        nextUrl
      )
    );
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
