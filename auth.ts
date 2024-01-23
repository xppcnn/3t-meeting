import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig as config } from "@/auth.config";
import prisma from "@/lib/prisma";
import { getUserById } from "@/utils/user";
import { getAccountByUserId } from "@/utils/account";
import { UserRole } from "@prisma/client";

export const authConfig = {
  ...config,
  debug: true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      const existingUser = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
      });
      if (!existingUser?.emailVerified) {
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existUser = await getUserById(token.sub);
      if (!existUser) return token;
      const existAccount = await getAccountByUserId(existUser.id);
      token.isOAuth = !!existAccount;
      token.name = existUser.name;
      token.email = existUser.email;
      token.role = existUser.role;
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
