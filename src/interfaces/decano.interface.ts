

export interface Decano {
  id:                       string;
  fechaCreacion:            Date;
  fechaActualizacion: Date;
  fechaEliminacion?:         Date;
  nombre:                   string;
  genero:                   string;
  numeroDocumento:          string;
  lugarExpedicionDocumento: string;
}
