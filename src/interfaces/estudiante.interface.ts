import { AreaInteres, areaInteresHerramientas } from "./area-interes.interface";
import { Empresa } from "./empresa.interface";
import { Herramienta } from "./herramienta.interface";



interface UsuarioI {
  id: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  email: string;
  displayName: string;
  imagenUrl: string;
  estaActivo: boolean;
  emailConfirmado: string;
  estaRegistrado: boolean;
}

interface CiudadResidencia {
  id: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  nombre: string;
  codigoGubernamental: string | null;
}
interface Solicitud {
  empresa: Empresa
  semestre: any
  herramientas: Herramienta[]
  areasInteres: AreaInteres[]
  cantidadPracticantes: number
  esRenumerado: boolean
}

interface Tutor {
  usuario: UsuarioI

}
export interface Asignacion {
  solicitud: Solicitud
  tutor: Tutor
}
export interface Estudiante {
  id: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  genero: string;
  direccionResidencia: string;
  telefono: string;
  grupoMatriculado: string;
  fechaNacimiento: string;
  numeroDocumento: string;
  fechaExpedicionDocumento: string;
  fechaAfiliacionEps: string;
  semestreMatriculado: number;
  certificadoAfiliacionEpsUrl: string | null;
  documentoIdentidadUrl: string | null;
  hojaDeVidaUrl: string | null;
  horarioClaseUrl: string | null;
  codigo: number;
  usuario: UsuarioI;
  ciudadResidencia: CiudadResidencia;
  eps: string | null;
  lugarExpedicionDocumento: string | null;
  tipoAfiliacionEps: string | null;
  tipoDocumento: string | null;
  estudianteAreaInteres: AreaInteres[];
  herramientas: areaInteresHerramientas[];
  semestres: any[];
  asignacion? : Asignacion
}

interface Meta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: [string, 'ASC' | 'DESC'][];
}

interface Links {
  current: string;
}

export interface EstudiantesResponse {
  data: Estudiante[];
  meta: Meta;
  links: Links;
}
