import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'El correo electronico es requerido').email('El correo electronico no es valido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

export type LoginSchema = z.infer<typeof loginSchema>;
