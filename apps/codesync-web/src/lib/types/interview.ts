import { User, UserRole } from '.prisma/codesync-client';
import { NonNullObject } from '@repo/ui/types';

export type UserType = NonNullObject<User>;

export type RoleType = UserRole;
