import { Empresa } from './empresa.interface';

export interface EmpresaResponse {
  data:  Empresa[];
  total: number;
}
