
/**
 * @interface SolicitudPracticante
 */
export interface SolicitudPracticante {
  id: string,
  estado: string,
  remunerado: boolean,
  numeroPracticantes: number,
  empresa: {
    id: string,
    nombre: string
  },
  perfil: {
    areaConocimiento: string[],
    habilidades: string[],
    herramientas: string[]
  },
  estudiantesAsignados: EstudianteAspirante[],
  aspirantes?: EstudianteAspirante[]
}
 
export interface EstudianteAspirante { 
  id: string
  nombre: string
  codigo: string
  puntaje: string
  perfil: {
    puntaje: number
    nombre: string
    habilidades: string[]
    herramientas: string[]
    
  }[]
  
}