export interface Rol {
  id:                 string;
  nombre:             string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}

export const roles = {
  coordinador: 'coordinador',
  director: 'director-programa',
  administrador: 'administrador',
  empresa: 'empresa',
  estudiante: 'estudiante',
  tutor: 'tutor',
}