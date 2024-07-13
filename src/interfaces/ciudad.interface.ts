import { Departamento } from './departamento.interface';

export interface Ciudad {
  id:            string;
  nombre:        string;
  departamento?: Departamento;
  fechaCreacion: Date;
  fechaEliminacion?: Date;
  fechaActualizacion?: Date;
  codigoGubernamental?: string | number| null;

}