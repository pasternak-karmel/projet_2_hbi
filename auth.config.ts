import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { getAccountByUserId } from "./data/account";
import { getUserByEmail, getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { LoginSchema } from "./schemas";

export default {
  providers: [
    Google,
    Github,
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      return true;
    },

    async jwt({ token, trigger, session, account }) {
      if (trigger === "update") {
        token.cart = session.user.cart;
        token.name = session.user.name;
      }

      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token };
      }

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.id = existingUser.id;
      token.num = existingUser.numTel;

      if (session?.user?.cart) {
        token.cart = session.user.cart;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      session.user.id = token.id ? (token.id as string) : "";
      session.user.num = token.num as number;
      session.user.cart = Array.isArray(token.cart) ? token.cart : [];

      return session;
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
} satisfies NextAuthConfig;

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
      num: number;
      cart?: {
        productId: string;
        quantity: number;
        nom: string;
        prix: number;
        image: string;
      }[];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
