import { Docente } from "./doncente.interface"


export interface Grupo{
  id: string
  nombre: string
  docente?: Docente
}