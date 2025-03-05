import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user.email === "22eg110c10@anurag.edu.in") {
        await prisma.user.upsert({
          where: { email: user.email },
          update: { role: "admin" },
          create: {
            id: user.id || undefined,
            email: user.email,
            name: user.name || profile?.name,
            role: "admin",
          },
        });
      } else {
        await prisma.user.upsert({
          where: { email: user.email as string },
          update: { role: "user" },
          create: {
            id: user.id || undefined,
            email: user.email,
            name: user.name || profile?.name,
            role: "user",
          },
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role as string; // Assign role from token to session
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Keep JWT strategy
  },
});