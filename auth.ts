import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig as config } from "./auth.config";
import prisma from "@/lib/prisma";
export const authConfig = {
  ...config,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.userId as string;
      return await session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return await token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
