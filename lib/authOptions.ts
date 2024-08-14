import { NextAuthOptions } from "next-auth";
import "next-auth/jwt";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import client from "@/lib/db";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // adapter: MongoDBAdapter(client),
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      // authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, account }) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     // session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },
};
