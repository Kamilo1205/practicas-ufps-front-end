export interface Herramienta {
  id:                 string;
  nombre:             string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaEliminacion?:   Date | null;
}

export interface AreaInteresHerramienta { 
  areaInteresId: string;
  herramientaId: string;
  fechaEliminacion?: Date | null;
}