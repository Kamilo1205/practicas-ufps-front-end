import { z } from 'zod';

export const loginValidationSchema = z.object({
  email: z.string().email('El correo electronico no es valido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});
