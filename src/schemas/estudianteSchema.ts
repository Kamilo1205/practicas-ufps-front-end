import { z } from 'zod';

export const estudianteSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').default(''),
  apellidos: z.string().min(1, 'El apellido es obligatorio').default(''),
  fechaNacimiento: z.string({required_error: 'La fecha de nacimiento es obligatoria'}).min(1, 'La fecha de nacimiento es obligatorio').default(''),
  genero: z.string().min(1, 'El genero es obligatorio').default(''),
  telefono: z.string().min(1, 'El número de celular es obligatorio').default(''),
  departamentoResidenciaId: z.string().min(1, 'El departamento de residencia es obligatorio').default(''),
  ciudadResidenciaId: z.string().min(1, 'la ciudad de residenca es obligatoria').default(''),
  direccionResidencia: z.string().min(1, 'La dirección es obligatoria').default(''),
  telefonoHogar: z.string().default(''),
  grupoMatriculado: z.string().min(1, 'El grupo matriculado es obligatorio').default(''),

  numeroDocumento: z.string().min(1, 'El número de documento es obligatorio').default(''),
  tipoDocumentoId: z.string().min(1, 'El tipo de documento es obligatorio').default(''),
  lugarExpedicionDocumentoId: z.string().min(1, 'El lugar de expedición es obligatorio').default(''),
  fechaExpedicionDocumento: z.string().min(1, 'La fecha de expedición es obligatoria').default(''),

  epsId: z.string().min(1, 'La Eps es obligatoria').default(''),
  tipoAfiliacionEpsId: z.string().min(1, 'El tipo de afiliacion es obligatorio').default(''),
  fechaAfiliacionEps: z.string({required_error: 'La fecha de afiliación es obligatorio'}).min(1, 'La fecha de afiliación es obligatorio').default(''),

  semestreMatriculado: z.coerce.number().min(1, 'El semestre matriculado es requerido').positive('El semestre matriculado debe ser un numero positivo').default(0),
  codigo: z.coerce.number().min(1, 'El codigo de estudiante es requerido').positive('El codigo de estudiante debe ser un numero positivo').default(0),

  areasInteres: z.record(z.string(), z.coerce.number().min(1, 'El nivel de interes deber ser igual o mayor a 1').max(5, 'El nivel de interes debe ser menor de 5')).default({}),
  herramientas: z.record(z.string(), z.boolean()).optional(),

  documentoIdentidad: z.any().refine(val => val instanceof File, { message: 'El PDF del documento de identidad es obligatorio' }).default(null),
  certificadoAfiliacionEps: z.any().refine(val => val instanceof File, { message: 'El PDF del certificado de afiliación es obligatorio' }).default(null),
  horarioClase: z.any().refine(val => val instanceof File, { message: 'El PDF del horario de clase es obligatorio' }).default(null),
  hojaDeVida: z.any().refine(val => val instanceof File, { message: 'El PDF de la hoja de vida es obligatorio' }).default(null),
});

export type EstudianteSchema = z.infer<typeof estudianteSchema>;