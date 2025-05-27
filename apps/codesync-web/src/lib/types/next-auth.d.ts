import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { RoleType } from './interview';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      role: RoleType;
      accessToken: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: RoleType;
    accessToken: string;
  }
}
