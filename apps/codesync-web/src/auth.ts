import NextAuth, { type NextAuthResult } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { schema } from './lib/zodSchemas/loginForm';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from './lib/prisma';

const result = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
    jwt({ token, user }) {
      token.role = user.role;
      return token;
    },
  },
  providers: [
    GitHub,
    Google,
    Credentials(
      Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: { label: '邮箱', type: 'email' },
          password: { label: '密码', type: 'password' },
        },
        authorize: async (credentials) => {
          const validatedCredentials = schema.parse(credentials);

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
              role: user.role,
            };
          }

          return null;
        },
      }),
    ),
  ],
});

export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;
