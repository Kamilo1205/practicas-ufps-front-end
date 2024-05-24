import { SubAreaInteres } from './sub-area-interes';
import { Herramienta } from './herramienta';

export interface AreaSubArea {
  id: string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  subAreasInteres:    SubAreaInteres;
  herramientas:       Herramienta[];
}