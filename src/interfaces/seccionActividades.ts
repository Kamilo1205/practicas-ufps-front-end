import { Actividad } from "./actvidad.interface";
import { Comentario } from "./comentarios.interface";

export interface SeccionActividades {
  id: string;
  actividades: Actividad[];
  comentarios: Comentario[];
}