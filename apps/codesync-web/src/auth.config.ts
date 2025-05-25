import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { prisma } from '@repo/db-codesync';
import bcrypt from 'bcryptjs';
import { LoginFormSchema } from './lib/zodSchemas/loginFormSchema';

export const authConfig: NextAuthConfig = {
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
              role: user.role,
            };
          }

          return null;
        },
      }),
    ),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }

      return session;
    },
    jwt({ token, user }) {
      token.role = user.role;
      return token;
    },
    async redirect({ url, baseUrl }) {
      // 确保使用绝对 URL
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
} satisfies NextAuthConfig;
