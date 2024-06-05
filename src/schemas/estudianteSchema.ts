import { z } from 'zod';

const herramientaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  selected: z.boolean()
});

const subAreaInteresSchema = z.object({
  id: z.string(),
  nombre: z.string(),
});

const areaSubAreaSchema = z.object({
  id: z.string(),
  subAreasInteres: subAreaInteresSchema,
  herramientas: z.array(herramientaSchema),
});

const areaInteresSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  level: z.number().min(1).max(5),
  //areaSubArea: z.array(areaSubAreaSchema),
});

export const estudianteSchema = z.object({
  primerNombre: z.string().min(1, 'El primer nombre es obligatorio'),
  segundoNombre: z.string().nullable(),
  primerApellido: z.string().min(1, 'El primer apellido es obligatorio'),
  segundoApellido: z.string().min(1, 'El segundo apellido es obligatorio'),
  fechaNacimiento: z.string({required_error: 'La fecha de nacimiento es requerida'}).min(1, 'La fecha de nacimiento es requerida'),
  genero: z.string().min(1, 'El genero es obligatorio'),
  telefono: z.string().min(1, 'El número de celular es obligatorio'),
  departamentoResidencia: z.string().min(1, 'El departamento de residencia es obligatorio'),
  municipioResidencia: z.string().min(1, 'El municipio de residenca es obligatorio'),
  direccion: z.string().min(1, 'La dirección es obligatoria'),

  numeroDocumento: z.string().min(1, 'El número de documento es obligatorio'),
  tipoDocumento: z.object({ id: z.string() }),
  lugarExpedicionDocumento: z.string().min(1, 'El lugar de expedición es obligatorio'),
  fechaExpedicionDocumento: z.string().min(1, 'La fecha de expedición es obligatoria'),

  eps: z.object({ id: z.string() }),
  tipoAfiliacionEps: z.object({ id: z.string() }),
  fechaAfiliacionEps: z.string({required_error: 'La fecha de afiliación es requerida'}).min(1, 'La fecha de afiliación es requerida'),

  semestreMatriculado: z.string({required_error: 'El semestre matriculado es requerido'}).min(1, 'El semestre matriculado es requerido'),
  codigo: z.string({required_error: 'El codigo de estudiante es requerido'}).min(1, 'El codigo de estudiante es requerido'),

  areasInteres: z.array(areaInteresSchema),
});

export type EstudianteSchema = z.infer<typeof estudianteSchema>;