export interface Rol {
  id:                 string;
  nombre:             string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}

export type Role = 'coordinador' | 'director' | 'administrador' | 'empresa' | 'estudiante' | 'tutor';

export const roles: Record<Role, string> = {
  administrador: 'administrador',
  coordinador: 'coordinador',
  director: 'director-programa',
  estudiante: 'estudiante',
  tutor: 'tutor',
  empresa: 'empresa'
};