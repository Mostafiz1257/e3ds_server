import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string({required_error:'Password must be required'}),
    phone: z.string(),
    role: z.enum(['user', 'admin']),
    address: z.string(),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
