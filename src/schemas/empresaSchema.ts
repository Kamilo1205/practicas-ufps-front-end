import { z } from 'zod';

export const empresaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  direccion: z.string().min(1, 'La direccion es obligatoria'),
  nit: z.string().min(1, 'El nit de la empresa es obligatorio'),
  telefono: z.string().min(1, 'El telefono es obligatorio'),
  pais: z.string().min(1, 'El pais es obligatorio'), 
  departamento: z.string().min(1, 'El departamento es obligatorio'),
  ciudad: z.string().min(1, 'La ciudad es obligatoria'),
  industria: z.string().min(1, 'La industria es obligatoria'),
  descripcion: z.string().nullable(),
  camara: z.instanceof(FileList, { message: 'El pdf de la camara de comercio es requerido' }),
  rut: z.instanceof(FileList, { message: 'El pdf del rut es requerido' }),
  documentoIdentidad: z.instanceof(FileList, { message: 'El pdf del documento de identidad es requerido' }),
  convenio: z.instanceof(FileList, { message: 'El pdf de la solicitud de convenio es requerido' }),
  representanteNombre: z.string().min(1, 'El nombre es obligatorio'),
  representanteEmail: z.string({ required_error: 'El correo electronico es requerido '}).email('El correo electronico no es valido'),
  representanteTelefono: z.string().min(1, 'El telefono es obligatorio'),
  representanteTipoDocumentoId: z.string().min(1, 'El tipo de documento es obligatorio'),
  representanteNumeroIdentidad: z.string().min(1, 'El número de documento es obligatorio'),
  representanteFechaExpedicion: z.string().min(1, 'La fecha de expedicion es obligatoria'),
  representanteLugarExpedicion: z.string().min(1, 'El lugar de expedicion es obligatorio'),
});

export type EmpresaSchema = z.infer<typeof empresaSchema>;