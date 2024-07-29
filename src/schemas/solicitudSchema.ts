import { Herramienta } from "../interfaces/herramienta.interface";

/**
 * @interface SolicitudPracticante
 */
export interface SolicitudPracticante {
  id: string,
  estado: string,
  remunerado: boolean,
  numeroPracticantes: number,
  empresa: {
    id: string,
    nombre: string
  },
  perfil: {
    areaConocimiento: string[],
    habilidades: string[],
    herramientas: string[]
  },
  estudiantesAsignados: EstudianteAspirante[],
  aspirantes?: EstudianteAspirante[]
}
 
export interface EstudianteAspirante { 
  estudiante: Estudiante;
  score: number;
  
}

export interface SolicitudRequest{
  areasInteresIds: string[],
  herramientasIds: string[],
  cantidadPracticantes: string,
  esRenumerado: string
}

export interface SolicitudesResponse {
  data:  Solicitud[];
  meta:  Meta;
  links: Links;
}

export interface Solicitud {
  id:                   string;
  fechaCreacion:        Date;
  fechaActualizacion: Date;
  fechaEliminacion?:     Date;
  cantidadPracticantes: number;
  esRenumerado:         boolean;
  areasInteres:         AreasIntere[];
  empresa:              Empresa;
  herramientas:         AreasIntere[];
  semestre:             Semestre;
  asignaciones:         Asignacion[];
}

export interface AreasIntere {
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  nombre:             string;
}

export interface Asignacion {
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  estado:             string;
  estudiante:         Estudiante;
  tutor:              null;
}
export interface EstudianteAreaIntere {
  id: string;
  nivelInteres: number;
  areaInteres: Herramienta;
}
export interface Estudiante {
  id: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  genero: string;
  direccionResidencia: string;
  telefono: string;
  grupoMatriculado: string;
  fechaNacimiento: Date;
  numeroDocumento: string;
  fechaExpedicionDocumento: Date;
  fechaAfiliacionEps: Date;
  semestreMatriculado: number;
  certificadoAfiliacionEpsUrl: string;
  documentoIdentidadUrl: string;
  hojaDeVidaUrl: string;
  horarioClaseUrl: string;
  codigo: number;
  semestres?: Semestre[];
  estudianteAreaInteres?: EstudianteAreaIntere[];
  herramientas?: Herramienta[];
}

export interface Empresa {
  id:                    string;
  fechaCreacion:         Date;
  fechaActualizacion:    Date;
  nombreLegal:           string;
  nombreComercial:       string;
  direccion:             string;
  nit:                   string;
  telefono:              string;
  descripcion:           null;
  rutUrl:                string;
  camaraComercioUrl:     string;
  soilicitudConvenioUrl: string;
  convenioActivo:        boolean;
  googleDriveFolderId:   string;
}

export interface Semestre {
  id:                       string;
  fechaCreacion:            Date;
  fechaActualizacion:       Date;
  semestre:                 number;
  googleDriveFolderId:      string;
  fechaInicio:              Date;
  fechaFin:                 Date;
  fechaInicioPlanDeTrabajo: null;
  fechaFinPlanDeTrabajo:    null;
  fechaInicioPrimerInforme: null;
  fechaFinPrimerInforme:    null;
  fechaInicioInformeFinal:  null;
  fechaFinInformeFinal:     null;
}

export interface Links {
  current: string;
}

export interface Meta {
  itemsPerPage: number;
  totalItems:   number;
  currentPage:  number;
  totalPages:   number;
  sortBy:       Array<string[]>;
}
