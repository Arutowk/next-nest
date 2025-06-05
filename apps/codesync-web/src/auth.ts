import NextAuth, { type NextAuthResult } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { authConfig } from './auth.config';
import { prisma } from './prisma';

const result = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await prisma.user.findUnique({
    //     where: { id: user.id },
    //   });
    //   if (!existingUser || existingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
});

export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;
