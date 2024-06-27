import { AreaInteres, areaInteresHerramientas } from "./area-interes.interface";


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

export interface EstudianteI {
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
  data: EstudianteI[];
  meta: Meta;
  links: Links;
}