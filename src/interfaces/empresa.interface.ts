import { Ciudad } from './ciudad.interface';
import { RepresentanteLegal } from './representante-legal.interface';
import { Usuario } from './usuario.interface';

//TODO: La API de empresas cambió, se debe actualizar la interfaz
export interface Empresa {
  id: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  nombreLegal: string;
  nombreComercial: string;
  direccion: string;
  nit: string;
  telefono: string;
  descripcion: string;
  rutUrl: string;
  camaraComercioUrl: string;
  soilicitudConvenioUrl: string;
  convenioActivo: boolean;
  googleDriveFolderId: string;
  usuario: Usuario;
  ciudad: Ciudad;
  industria: Industria;
  representanteLegal: RepresentanteLegal;
}

interface Industria {
  id: string;
  nombre: string;
  fechaCreacion: Date;
  fechaEliminacion?: Date;
  fechaActualizacion?: Date;
}
