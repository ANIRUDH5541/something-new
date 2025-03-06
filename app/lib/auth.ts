import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !account) return false;

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: {},
            create: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token || null,
              id_token: account.id_token || null,
              refresh_token: account.refresh_token || null,
            },
          });

          if (
            existingUser.email === "22eg110c10@anurag.edu.in" &&
            existingUser.role !== "admin"
          ) {
            await prisma.user.update({
              where: { email: user.email },
              data: { role: "admin" },
            });
          }
        } else {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              role: user.email === "22eg110c10@anurag.edu.in" ? "admin" : "user",
              accounts: {
                create: {
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token || null,
                  id_token: account.id_token || null,
                  refresh_token: account.refresh_token || null,
                },
              },
            },
          });
        }
        return true;
      } catch (error) {
        console.error("Error linking account:", error);
        return false;
      }
    },

    async session({ session, token }) {
      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { role: true },
        });

        if (dbUser) {
          session.user.role = dbUser.role as string;
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig);
