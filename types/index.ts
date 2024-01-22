import { DefaultSession, Session } from "next-auth/types";
declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      isOAuth?: boolean;
    } & DefaultSession["user"];
  }
}
