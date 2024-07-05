import axios from "axios";
import { PlanDeTrabajo } from "../interfaces/plantrabajo.interface";

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
export const fetchMiPlanTrabajoActualEstudiante = async (): Promise<PlanDeTrabajo> => {
    const response = await axios.get("/plan-trabajo/estudiante/mi-plan/actual");
    return response.data;
  };
//(estudiante) para obtener plan del estudiante por id
export const fetchPlanTrabajoByIdEstudiante = async (
  id: string
): Promise<PlanDeTrabajo> => {
  const response = await axios.get(`/plan-trabajo/estudiante/mi-plan/${id}`);
  return response.data;
};
