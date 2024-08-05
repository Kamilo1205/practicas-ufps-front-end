import { Usuario } from "./usuario.interface";

export interface Comentario {
  id?: string;
  comentario: string;
  objetivoId?: string;
  seccionActividadesId?: string;
  autor?: Usuario;
}
