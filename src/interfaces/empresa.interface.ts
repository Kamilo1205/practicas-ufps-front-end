import { RepresentanteLegal } from './representante-legal.interface';
import { Usuario } from './usuario.interface';

export interface Empresa {
  id:                    string;
  nombre:                string;
  direccion:             string;
  nit:                   string;
  telefono:              string;
  pais:                  string;
  departamento:          string;
  ciudad:                string;
  industria:             string;
  descripcion:           null | string;
  rutUrl:                string;
  camaraComercioUrl:     string;
  soilicitudConvenioUrl: null | string;
  convenioActivo:        boolean;
  googleDriveFolderId:   string;
  fechaCreacion:         Date;
  fechaActualizacion:    Date;
  fechaEliminacion:      null;
  usuario:               Usuario;
  representanteLegal:    RepresentanteLegal | null;
}