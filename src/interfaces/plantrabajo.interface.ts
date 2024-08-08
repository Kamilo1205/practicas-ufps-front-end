import { Comentario } from "./comentarios.interface";
import { Empresa } from "./empresa.interface";
import { Estudiante } from "./estudiante.interface";
import { IntensidadHoraria } from "./intensidad.interface";
import { Objetivos } from "./objetivos.interface";
import { Resultado } from "./resultado.interface";
import { SeccionActividades } from "./seccionActividades";

export interface PlanDeTrabajo {
  id: string;
  estudiante: Estudiante;
  empresa: Empresa;
  intensidadHoraria: IntensidadHoraria;
  objetivo: {
    objetivos: Objetivos;
    comentarios: Comentario[];
  };
  seccionActividades: SeccionActividades;
  requerimientosTecnicos: string;
  resultados: Resultado[];
  informeFinal: informeFinal;
  primerInforme: primerInforme;
  tutorEmpresaID?: string;
  tutorInstitucionalID?: string;
  evaluacion: Evaluacion
}
