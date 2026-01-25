import type { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/db";

/* ============================
   NextAuth Session Augmentation
============================ */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}


/* ============================
   NextAuth Configuration
============================ */
export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    /* ============================
       SIGN IN CALLBACK
    ============================ */
    async signIn({ account, profile }) {
      if (!account || !profile) return false;

      const googleProfile = profile as {
        email?: string;
        name?: string;
        picture?: string;
      };

      if (!googleProfile.email) {
        console.error("Google account has no email");
        return false;
      }

      await prisma.user.upsert({
        where: { email: googleProfile.email },
        create: {
          email: googleProfile.email,
          name: googleProfile.name,
          avatar: googleProfile.picture,
          isActive: true,
        },
        update: {
          name: googleProfile.name,
          avatar: googleProfile.picture,
          updatedAt: new Date(),
        },
      });

      return true;
    },

    /* ============================
       SESSION CALLBACK  
    ============================ */
    async session({ session, token }) {
      if (!session.user?.email) return session;

      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
          },
        });

        if (user) {
          session.user.id = user.id;
          session.user.name = user.name ?? session.user.name;
          session.user.image = user.avatar ?? session.user.image;
          session.user.email = user.email;
        }

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session; // NEVER throw here
      }
    },

    /* ============================
       JWT CALLBACK
    ============================ */
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true },
        });

        if (dbUser) {
          token.sub = dbUser.id;
        }
      }

      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/signin",
    error: "/error",
  },

  useSecureCookies: process.env.NODE_ENV === "production",
};
