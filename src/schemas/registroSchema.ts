import { z } from 'zod';

export const registroSchema = z.object({
  email: z.string({ required_error: 'El correo electronico es requerido '}).email('El correo electronico no es valido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

export type RegistroSchema = z.infer<typeof registroSchema>;
