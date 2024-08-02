import { Actividad } from "./actvidad.interface";
import { Comentario } from "./comentarios.interface";
import { Empresa } from "./empresa.interface";
import { Estudiante } from "./estudiante.interface";
import { IntensidadHoraria } from "./intensidad.interface";
import { Objetivos } from "./objetivos.interface";
import { Resultado } from "./resultado.interface";

export interface PlanDeTrabajo {
  estudiante: Estudiante;
  empresa: Empresa;
  intensidadHoraria: IntensidadHoraria;
  objetivo: {
    objetivos: Objetivos;
    comentarios: Comentario[];
  };
  actividadeSeccion: {
    actividades: Actividad[];
    comentarios: Comentario[];
  };
  requerimientosSeccion: {
    requirimientoTecnico: string;
    resultados: Resultado[];
    comentarios: Comentario[];
  };
}
