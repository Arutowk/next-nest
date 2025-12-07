import { z } from 'zod';

export const SignUpFormSchema = z.object({
  name: z.string().nonempty({ message: 'name required' }).min(2).trim(),
  email: z
    .string()
    .nonempty({ message: 'email required' })
    .email('Invalid email'),
  password: z
    .string()
    .nonempty({ message: 'password required' })
    .min(4, 'Password must be more than 4 characters')
    .max(32, 'Password must be less than 32 characters')
    .trim(),
});
