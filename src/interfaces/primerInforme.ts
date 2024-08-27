import { TutorSchema } from "../schemas/tutorSchema";
import { Tutor } from "./tutor.interface";

export interface primerInforme {
  id?: string;
  adaptacion: string;
  tolerancia: string;
  compromisoEficiencia: string;
  conclusion: string;
  nuevasResponsabilidades: string;
  fueronAsumidas: string;
  tutorEmpresarialAprobo?: TutorSchema;
  tutorInstitucionalAprobo?: Tutor;
  diagramaGanttUrl?: string;
}
