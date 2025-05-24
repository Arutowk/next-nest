import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { RoleType } from './interview';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      role: RoleType;
    } & DefaultSession['user'];
  }
  interface User {
    role: RoleType;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: RoleType;
  }
}
