import { Ciudad } from './ciudad.interface';
import { Pais } from './pais.interface';

export interface Departamento {
  id:        string;
  nombre:    string;
  pais?:     Pais;
  ciudades?: Ciudad[];
}