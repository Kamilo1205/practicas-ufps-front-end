import { z } from 'zod';

export const passwordResetSchema = z.object({
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "La confirmación de la contraseña debe tener al menos 6 caracteres"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>;