import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().nonempty({ message: 'email required' }).email(),
  password: z.string().nonempty({ message: 'password required' }).min(1),
});
