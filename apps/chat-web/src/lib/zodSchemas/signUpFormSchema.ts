import { z } from 'zod';

export const SignUpFormSchema = z.object({
  name: z.string().min(2).trim(),
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(4, 'Password must be more than 4 characters')
    .max(32, 'Password must be less than 32 characters')
    .trim(),
});
