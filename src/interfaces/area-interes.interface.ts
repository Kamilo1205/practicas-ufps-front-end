import { Herramienta } from './herramienta.interface';

export interface AreaInteres {
  id:                      string;
  nombre:                  string;
  fechaCreacion:           Date;
  fechaActualizacion:      Date;
  areaPadre?:              AreaInteres; 
  subAreas:               AreaInteres[];
  areaInteresHerramientas: areaInteresHerramientas[];
}

export interface areaInteresHerramientas {
  id: string;
  herramienta: Herramienta;
  fechaCreacion:           Date;
  fechaActualizacion:      Date;
}