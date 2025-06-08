import { User, UserRole, Interview } from '.prisma/codesync-client';
import { TransformNullableToOptional, NonNullObject } from '@repo/ui/types';

export type UserType = NonNullObject<User>;

export type RoleType = UserRole;

export type CreateInterview = Omit<
  TransformNullableToOptional<Interview>,
  'createdAt' | 'id'
>;
