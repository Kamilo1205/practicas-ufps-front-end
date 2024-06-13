import { Ciudad } from './ciudad.interface';
import { Usuario } from './usuario.interface';


export interface Estudiante {
  id:                       string;
  primerNombre:             string;
  segundoNombre:            string;
  primerApellido:           string;
  segundoApellido:          string;
  genero:                   string;
  direccion:                string;
  telefono:                 string;
  departamentoResidencia:   string;
  municipioResidencia:      string;
  fechaNacimiento:          Date;
  numeroDocumento:          string;
  lugarExpedicionDocumento: string;
  fechaExpedicionDocumento: Date;
  fechaAfiliacionEps:       Date;
  semestreMatriculado:      number;
  codigo:                   number;
  fechaCreacion:            Date;
  fechaActualizacion:       Date;
  fechaEliminacion?:        Date;
  grupo:                    string;
  ciudadResidencia:         Ciudad;
  usuario:                  Usuario;
}
