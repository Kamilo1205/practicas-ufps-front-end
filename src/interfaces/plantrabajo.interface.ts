import { TutorSchema } from "../schemas/tutorSchema";
import { Comentario } from "./comentarios.interface";
import { Empresa } from "./empresa.interface";
import { Estudiante } from "./estudiante.interface";
import { informeFinal } from "./informeFinal";
import { IntensidadHoraria } from "./intensidad.interface";
import { Objetivos } from "./objetivos.interface";
import { primerInforme } from "./primerInforme";
import { Resultado } from "./resultado.interface";
import { SeccionActividades } from "./seccionActividades";
import { Tutor } from "./tutor.interface";

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
  tutorEmpresarial?: TutorSchema;
  tutorInstitucional?: Tutor;
  evaluacion: Evaluacion;
  diagramaGanttUrl?: string;
}
