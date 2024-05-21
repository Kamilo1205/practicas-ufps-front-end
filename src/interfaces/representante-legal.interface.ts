export interface RepresentanteLegal {
  id:                       string;
  nombre:                   string;
  email:                    string;
  telefono:                 string;
  numeroDocumento:          string;
  fechaExpedicionDocumento: Date;
  lugarExpedicionDocumento: string;
  documentoIdentidadUrl:    string;
  fechaCreacion:            Date;
  fechaActualizacion:       Date;
  TipoDocumento:            null;
}