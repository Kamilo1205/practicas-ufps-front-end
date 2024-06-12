import { z } from "zod"

export const tutorSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').default(''),
  apellido: z.string().min(1, 'El apellido es obligatorio').default(''),
  email: z.string().min(1, 'El correo electrónico es obligatorio').email('El correo electrónico no es válido').default(''),
  telefono: z.string().min(1, 'El teléfono es obligatorio').default(''),
  direccion: z.string().min(1, 'La dirección es obligatoria').default(''),
})


export type TutorSchema = z.infer<typeof tutorSchema>;