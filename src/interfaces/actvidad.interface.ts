import { Comentario } from "./comentarios.interface";
import { SubActividad } from "./subactividad.interface";

export interface Actividad {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechFin: string;
  totalHoras: string;
  porcentajeCompletado: string;
  estrategias: string;
  recursos: string;
  resultadosOb: string;
  impactos: string;
  limitaciones: string;
  subactividades: SubActividad[];
  comentarios: Comentario[];
}
