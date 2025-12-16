import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { openAPI } from 'better-auth/plugins';
import { PrismaClient } from './generated/prisma/client';
// If your Prisma file is located elsewhere, you can change the path

const adapter = new PrismaBetterSqlite3({
  url: 'file:./prisma/dev.db',
});

const prisma = new PrismaClient({
  adapter,
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite', // or "mysql", "postgresql", ...
  }),
  //https://github.com/better-auth/better-auth/issues/4942
  session: {
    cookieCache: { enabled: true, maxAge: 300 },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
    maxPasswordLength: 32,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  baseURL: 'http://localhost:3001',
  trustedOrigins: ['http://localhost:3000'],

  //http://localhost:3001/api/auth/reference
  plugins: [openAPI(), nextCookies()],
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true, // Requires HTTPS in production
      httpOnly: true,
    },
  },
});
