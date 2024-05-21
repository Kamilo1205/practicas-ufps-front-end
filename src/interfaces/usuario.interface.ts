import { Rol } from './rol.interface';

export interface Usuario {
  id:                 string;
  email:              string;
  displayName:        null;
  imagenUrl:          null;
  estaActivo:         boolean;
  emailConfirmado:    null;
  estaRegistrado:     boolean;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  roles:              Rol[];
}