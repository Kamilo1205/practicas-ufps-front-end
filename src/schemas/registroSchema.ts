import { z } from 'zod';

export const registroSchema = z.object({
  email: z.string({ required_error: 'El correo electronico es requerido' }).email('El correo electronico no es valido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string({ required_error: 'La verificación de contraseña es requerida' })
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type RegistroSchema = z.infer<typeof registroSchema>;
