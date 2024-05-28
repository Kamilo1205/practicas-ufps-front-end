import { AreaSubArea } from './area-sub-area';

export interface AreaInteres {
  id:                 string;
  nombre:             string;
  areaSubArea?:       AreaSubArea[];
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}
