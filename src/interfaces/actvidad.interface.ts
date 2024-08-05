import { Comentario } from "./comentarios.interface";
import { SubActividad } from "./subactividad.interface";

export interface Actividad {
  id?: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechFin: string;
  totalHoras: string;
  porcentajeCompletado: string;
  estrategiaDesarrollo?: string;
  recursosUtilizados?: string;
  resultadosObtenidos?: string;
  impactos?: string;
  limitaciones?: string;
  subActividades?: SubActividad[];
}
