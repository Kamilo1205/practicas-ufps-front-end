// src/types.ts
export interface SubActivity {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  hours: number;
  progress: number;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  percentageComplete: number;
  subActivities: SubActivity[];
  estrategias: string;
  recursos: string;
  resultadosOb: string;
  impactos: string;
  limitaciones: string;
}

export interface Comment {
  rol: string;
  autor: string;
  comentario: string;
}
