import { Departamento } from './departamento.interface';

export interface Ciudad {
  id:            string;
  nombre:        string;
  departamento?: Departamento; 
}