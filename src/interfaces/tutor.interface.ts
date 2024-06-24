import { Usuario } from "./usuario.interface"


export interface Tutor {
  id: string
  nombre: string
  apellidos: string
  telefono: string
  email: string
  direccionTrabajo: string
  empresaId: string
  usuario?: Usuario
}