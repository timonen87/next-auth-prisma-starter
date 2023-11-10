import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { db } from "./db";
import { NextAuthOptions, getServerSession } from "next-auth";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "mail@mail.ru",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const dbUser = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!dbUser) {
          return null;
        }
        if (dbUser.password) {
          const passwordMatch = await compare(
            credentials.password,
            dbUser.password
          );
          if (!passwordMatch) {
            return null;
          }
        }

        return {
          id: dbUser.id,
          username: dbUser.username,
          email: dbUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //   console.log(token);
      if (user) {
        return {
          ...token,
          username: user.username,
        };
      }
      return token;
    },
    async session({ token, session }) {
      if (session) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
            username: token.username,
          },
        };
      }

      //   return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
