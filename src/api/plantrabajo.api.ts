import axios from "./axios";
import { PlanDeTrabajo } from "../interfaces/plantrabajo.interface";
import { Resultado } from "../interfaces/resultado.interface";

//APIS ADMINISTRADOR

//(solo administrador) para obtener todos los planes de trabajo del semestre actual
export const fetchPlanTrabajoActual = async (): Promise<PlanDeTrabajo[]> => {
  const response = await axios.get("/plan-trabajo/actual");
  return response.data;
};
//(solo administrador) para obtener todos
export const fetchAllPlanTrabajo = async (): Promise<PlanDeTrabajo[]> => {
  const response = await axios.get("/plan-trabajo");
  return response.data;
};
// (solo administrador) para obtener uno por id
export const fetchPlanTrabajoById = async (
  id: string
): Promise<PlanDeTrabajo> => {
  const response = await axios.get(`/plan-trabajo/${id}`);
  return response.data;
};

//APIS ESTUDIANTE
//(estudiante) para obtener todos los planes de trabajo
export const fetchMisPlanTrabajoEstudiante = async (): Promise<
  PlanDeTrabajo[]
> => {
  const response = await axios.get("/plan-trabajo/estudiante/mis-planes");
  return response.data;
};
//(estudiante) para obtener el plan del semestre actual
export const fetchMiPlanTrabajoActualEstudiante =
  async (): Promise<PlanDeTrabajo> => {
    const response = await axios.get("/plan-trabajo/estudiante/mi-plan/actual");
    return response.data;
  };

//(estudiante) para obtener plan del estudiante por id
export const fetchPlanTrabajoByIdEstudiante = async (
  id?: string
): Promise<PlanDeTrabajo> => {
  const response = await axios.get(`/plan-trabajo/estudiante/mi-plan/${id}`);
  return response.data;
};
export const aprobarPlanTutor = async (idPlan: string) => {
  console.log(idPlan);
  const response = await axios.patch(
    `/plan-trabajo/${idPlan}/aprobacion-tutor-institucional`
  );
  return response.data;
};

export const aprobarPlanEmpresa = async (idPlan: string) => {
  console.log(idPlan)
  const response = await axios.patch(
    `/plan-trabajo/${idPlan}/aprobacion-tutor-empresarial`
  );
  return response.data;
};

export const updateResultados = async (
  idPlan: string,
  resultados: Resultado[]
) => {
  const response = await axios.patch(
    `/plan-trabajo/${idPlan}/agregar-resultados`,
    { resultados: resultados }
  );
  return response.data;
};

export const updateRequerimiento = async (
  idPlan: string,
  reque: string
): Promise<PlanDeTrabajo> => {
  const response = await axios.patch(`/plan-trabajo/${idPlan}`, {
    requerimientosTecnicos: reque,
  });
  return response.data;
};

export const evaluacionCreateEstudiante = async (evaluacion: Evaluacion) => {
  const response = await axios.post(
    `plan-trabajo/evaluacion-estudiante/`,
    evaluacion
  );
  return response.data;
};

export const evaluacionUpdateEstudiante = async (evaluacion: Evaluacion) => {
  const response = await axios.patch(
    `plan-trabajo/evaluacion-estudiante/${evaluacion.id}`,
    evaluacion
  );
  return response.data;
};

export const aprobarInformeTutor = async (id: string) => {
  const response = await axios.patch(
    `/informe/${id}/aprobacion-tutor-institucional`
  );
  return response.data;
};

export const aprobarInformeEmpresa = async (id: string) => {
  const response = await axios.patch(
    `/informe/${id}/aprobacion-tutor-empresarial`
  );
  return response.data;
};

export const updateDiagrama = async (file: File) => {
   const formData = new FormData();
   formData.append("file", file);
  const response = await axios.post("plan-trabajo/diagrama-Gantt", formData);
  return response.data;
};
