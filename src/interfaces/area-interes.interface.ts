import { AreaSubArea } from './area-sub-area.interface';

export interface AreaInteres {
  id:                 string;
  nombre:             string;
  areaSubArea?:       AreaSubArea[];
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}
