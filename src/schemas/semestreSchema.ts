


export interface Semestre {
  id:                       string;
  fechaCreacion:            Date;
  fechaActualizacion:       Date;
  semestre:                 number;
  googleDriveFolderId:      string;
  fechaInicio:              null;
  fechaFin:                 null;
  fechaInicioPlanDeTrabajo: null;
  fechaFinPlanDeTrabajo:    null;
  fechaInicioPrimerInforme: null;
  fechaFinPrimerInforme:    null;
  fechaInicioInformeFinal:  null;
  fechaFinInformeFinal:     null;
  anio:                     Anio;
}

export interface Anio {
  id:                  string;
  fechaCreacion:       Date;
  fechaActualizacion:  Date;
  anio:                number;
  googleDriveFolderId: string;
  actual:              boolean;
}
