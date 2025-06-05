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
} satisfies NextAuthConfig;
