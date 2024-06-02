import { z } from 'zod';

export const empresaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').default(''),
  direccion: z.string().min(1, 'La dirección es obligatoria').default(''),
  nit: z.string().min(1, 'El NIT de la empresa es obligatorio').regex(/^\d{9,10}-\d{1}$/, 'El NIT debe tener entre 9 y 10 dígitos seguidos de un dígito de verificación').default(''),
  telefono: z.string().min(1, 'El teléfono es obligatorio').regex(/^\+\d{1,3}\s\d{7,14}$/, 'El teléfono debe tener el formato +[código de país] seguido del número local').default(''),
  pais: z.string().min(1, 'El país es obligatorio').default(''),
  departamento: z.string().min(1, 'El departamento es obligatorio').default(''),
  ciudad: z.string().min(1, 'La ciudad es obligatoria').default(''),
  industria: z.object({
    id: z.string().min(1, 'El ID de la industria es obligatorio'),
    nombre: z.string().min(1, 'El nombre de la industria es obligatorio')
  }).nullable().refine(val => val !== null, {
    message: "La industria es obligatoria"
  }).default(null),
  descripcion: z.string().max(300, 'La descripción debe tener menos de 300 caracteres').nullable().default(null),
  
  camara: z.any().refine(val => val instanceof File, { message: 'El PDF de la cámara de comercio es obligatorio' }).default(null),
  rut: z.any().refine(val => val instanceof File, { message: 'El PDF del RUT es obligatorio' }).default(null),
  documentoIdentidad: z.any().refine(val => val instanceof File, { message: 'El PDF del documento de identidad es obligatorio' }).default(null),
  convenio: z.any().refine(val => val instanceof File, { message: 'El PDF de la solicitud de convenio es obligatorio' }).default(null),
  
  representante: z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio').default(''),
    email: z.string().min(1, 'El correo electrónico es obligatorio').email('El correo electrónico no es válido').default(''),
    telefono: z.string().min(1, 'El teléfono es obligatorio').regex(/^\+\d{1,3}\s\d{7,14}$/, 'El teléfono debe tener el formato +[código de país] seguido del número local').default(''),
    numeroDocumento: z.string().min(1, 'El número de documento es obligatorio').default(''),
    fechaExpedicionDocumento: z.string().min(1, 'La fecha de expedición del documento es obligatoria').default(''),
    lugarExpedicionDocumento: z.string().min(1, 'El lugar de expedición del documento es obligatorio').default(''),
    tipoDocumentoId: z.string().min(1, 'El tipo de documento es obligatorio').default(''),
  }),
});

export type EmpresaSchema = z.infer<typeof empresaSchema>;