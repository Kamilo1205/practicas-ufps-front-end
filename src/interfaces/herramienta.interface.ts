export interface Herramienta {
  id:                 string;
  nombre:             string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}

export interface AreaInteresHerramienta { 
  areaInteresId: string;
  herramientaId: string;
}