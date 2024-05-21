import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string({ required_error: 'El correo electronico es requerido '}).email('El correo electronico no es valido')
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
