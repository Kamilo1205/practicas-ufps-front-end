import { Rol } from './rol.interface';
import { Usuario } from './usuario.interface';

export interface Tutor {
  id:                 string;
  usuario:            Usuario;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  roles:              Rol[];
}