import { Departamento } from './departamento.interface';

export interface Pais {
  id:             string;
  nombre:         string;
  departamentos?: Departamento[]; 
}