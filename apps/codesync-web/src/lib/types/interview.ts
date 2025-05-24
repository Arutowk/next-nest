import { User, UserRole } from '../../../node_modules/.prisma/client';
import { NonNullObject } from '@repo/ui/types';

export type UserType = NonNullObject<User>;

export type RoleType = UserRole;
