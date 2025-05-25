import { User, UserRole } from '@repo/db-codesync';
import { NonNullObject } from '@repo/ui/types';

export type UserType = NonNullObject<User>;

export type RoleType = UserRole;
