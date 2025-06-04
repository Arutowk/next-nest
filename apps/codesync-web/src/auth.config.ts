import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { LoginFormSchema } from './lib/zodSchemas/loginFormSchema';
import { prisma } from './prisma';

export const authConfig: NextAuthConfig = {
  providers: [
    GitHub,
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: '邮箱', type: 'email' },
        password: { label: '密码', type: 'password' },
      },
      authorize: async (credentials) => {
        const validatedCredentials = LoginFormSchema.parse(credentials);
        const user = await prisma.user.findUnique({
          where: { email: validatedCredentials.email },
        });

        if (!user) {
          throw new Error('Invalid credentials.');
        }

        if (
          user &&
          bcrypt.compareSync(validatedCredentials.password, user.password!)
        ) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }
        return null;
      },
    }),
  ],
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
} satisfies NextAuthConfig;
