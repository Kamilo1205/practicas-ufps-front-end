import { Usuario } from './usuario.interface';

interface CiudadResidencia { 
  
  id: string;
    nombre: string;
      fechaCreacion: string;
        fechaActualizacion: string;
          departamento: {
            id: string;
      nombre: string;
        fechaCreacion: string;
          fechaActualizacion: string;
  }

}

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
  fechaEliminacion: null;
  grupo: string;
  ciudadResidencia: CiudadResidencia;
  usuario:                  Usuario;
}
