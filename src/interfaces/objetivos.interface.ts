import { Comentario } from "./comentarios.interface";

export interface Objetivos {
  id?: string;
  objetivoPractica: string;
  objetivoPrincipal: string;
  objetivoEspecial: string;
  justificacion: string;
  alcance: string;
  comentario?: Comentario[];
}
