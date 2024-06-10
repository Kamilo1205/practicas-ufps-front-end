import { z } from 'zod';

export const empresaSchema = z.object({
  nombreLegal: z.string().min(1, 'El nombre legal es obligatorio').default(''),
  nombreComercial: z.string().default(''),
  direccion: z.string().min(1, 'La dirección es obligatoria').default(''),
  nit: z.string().min(1, 'El NIT de la empresa es obligatorio').regex(/(^\d{9,10}-\d$|^\d{10}$)/, 'El NIT debe tener entre 9 y 10 dígitos seguidos de un dígito de verificación o ser exactamente 10 dígitos numéricos').default(''),
  telefono: z.string().min(1, 'El teléfono es obligatorio').default(''),
  paisId: z.string().min(1, 'El país es obligatorio').default(''),
  departamentoId: z.string().min(1, 'El departamento es obligatorio').default(''),
  ciudadId: z.string().min(1, 'La ciudad es obligatoria').default(''),
  industriaId: z.string().min(1, 'La industria es obligatorio').default(''),
  descripcion: z.string().max(300, 'La descripción debe tener menos de 300 caracteres').nullable().default(null),
  
  camara: z.any().refine(val => val instanceof File, { message: 'El PDF de la cámara de comercio es obligatorio' }).default(null),
  rut: z.any().refine(val => val instanceof File, { message: 'El PDF del RUT es obligatorio' }).default(null),
  documentoIdentidad: z.any().refine(val => val instanceof File, { message: 'El PDF del documento de identidad es obligatorio' }).default(null),
  convenio: z.any().refine(val => val instanceof File, { message: 'El PDF de la solicitud de convenio es obligatorio' }).default(null),
  
  representante: z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio').default(''),
    apellido: z.string().min(1, 'El apellido es obligatorio').default(''),
    email: z.string().min(1, 'El correo electrónico es obligatorio').email('El correo electrónico no es válido').default(''),
    telefono: z.string().min(1, 'El teléfono es obligatorio').default(''),
    numeroDocumento: z.string().min(1, 'El número de documento es obligatorio').default(''),
    fechaExpedicionDocumento: z.string().min(1, 'La fecha de expedición del documento es obligatoria').default(''),
    lugarExpedicionDocumentoId: z.string().min(1, 'El lugar de expedición del documento es obligatorio').default(''),
    tipoDocumentoId: z.string().min(1, 'El tipo de documento es obligatorio').default(''),
  }),
});

export type EmpresaSchema = z.infer<typeof empresaSchema>;