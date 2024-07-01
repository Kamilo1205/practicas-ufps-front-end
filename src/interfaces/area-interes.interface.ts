import { Herramienta } from './herramienta.interface';

export interface AreaInteres {
  id:                      string;
  nombre:                  string;
  fechaCreacion:           Date;
  fechaActualizacion: Date;
  fechaEliminacion?: Date;
  areaPadre?:              AreaInteres | string; 
  subAreas:               AreaInteres[];
  areaInteresHerramientas: areaInteresHerramientas[];
}

export interface areaInteresHerramientas {
  id: string;
  herramienta: Herramienta;
  fechaCreacion:           Date;
  fechaActualizacion: Date;
  areaInteres?: AreaInteres;
}

/*
{
  nombre: 'Dev soft',
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
    areaPadre: null,
    subAreas: [
      {
        nombre: 'Frontend',
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        areaPadre: null,
        areaInteresHerramientas: [
          {
            herramienta: {
     
              nombre: 'React',
              fechaCreacion: new Date(),
              fechaActualizacion: new Date()
            },
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
          }
        ]
      }
  ]
  areaInteresHerramientas: [
    {
      herramienta: {
       
        nombre: 'React',
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      },
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
  ]
}
*/