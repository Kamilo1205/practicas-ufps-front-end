import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import {
  fetchPlanTrabajoActual as fetchPlanActualAPI,
  fetchAllPlanTrabajo as fetchAllPlanAPI,
  fetchPlanTrabajoById as fecthPlanByIdAPI,
  fetchMisPlanTrabajoEstudiante as fecthMisPlanesEstudianteAPI,
  fetchMiPlanTrabajoActualEstudiante as fecthPlanActualEstudianteAPI,
  fetchPlanTrabajoByIdEstudiante as fecthPlanByIdEstudianteAPI,
} from "../api/plantrabajo.api";
import { PlanDeTrabajo } from "../interfaces/plantrabajo.interface";

type UsePlantrabajoReturn = {
  allplanestrabajo: PlanDeTrabajo[] | null;
  loading: boolean;
  error: AxiosError | null;
  fetchPlanTrabajoActual: () => Promise<void>;
  fetchAllPlanTrabajo: () => Promise<void>;
  fetchPlanTrabajoById: (id: string) => Promise<PlanDeTrabajo>;
  fetchPlanTrabajoByIdEstudiante: (id: string) => Promise<PlanDeTrabajo>;
  fetchMisPlanTrabajoEstudiante: () => Promise<void>;
  fetchMiPlanTrabajoActualEstudiante: () => Promise<PlanDeTrabajo>;
};

const usePlantrabajo = (): UsePlantrabajoReturn => {
  const [allplanestrabajo, setAllplanestrabajo] = useState<PlanDeTrabajo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchPlanTrabajoActual = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPlanActualAPI();
      setAllplanestrabajo(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllPlanTrabajo = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllPlanAPI();
      setAllplanestrabajo(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPlanTrabajoById = async (id: string): Promise<PlanDeTrabajo> => {
    setLoading(true);
    try {
      const data = await fecthPlanByIdAPI(id);
      setError(null);
      return data; // Devuelve `PlanDeTrabajo`
    } catch (err) {
      setError(err as AxiosError);
      throw err; // Lanza el error para que sea manejado por el llamador si es necesario
    } finally {
      setLoading(false);
    }
  };

  const fetchMisPlanTrabajoEstudiante = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fecthMisPlanesEstudianteAPI();
      setAllplanestrabajo(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMiPlanTrabajoActualEstudiante =
    async (): Promise<PlanDeTrabajo> => {
      setLoading(true);
      try {
        const data = await fecthPlanActualEstudianteAPI();
        if (!data) {
          throw new Error(
            "No se pudo obtener el plan de trabajo actual del estudiante"
          );
        }
        setError(null);
        return data;
      } catch (err) {
        setError(err as AxiosError);
        throw err; // Lanza el error para que sea manejado por el llamador si es necesario
      } finally {
        setLoading(false);
      }
    };

  const fetchPlanTrabajoByIdEstudiante = async (
    id: string
  ): Promise<PlanDeTrabajo> => {
    setLoading(true);
    try {
      const data = await fecthPlanByIdEstudianteAPI(id);
      setError(null);
      return data; // Devuelve `PlanDeTrabajo`
    } catch (err) {
      setError(err as AxiosError);
      throw err; // Lanza el error para que sea manejado por el llamador si es necesario
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPlanTrabajoActual();
      await fetchAllPlanTrabajo();
      await fetchMisPlanTrabajoEstudiante();
      await fetchMiPlanTrabajoActualEstudiante();
    };

    fetchData();
  }, []);

  return {
    allplanestrabajo,
    loading,
    error,
    fetchPlanTrabajoActual,
    fetchAllPlanTrabajo,
    fetchMisPlanTrabajoEstudiante,
    fetchMiPlanTrabajoActualEstudiante,
    fetchPlanTrabajoByIdEstudiante,
    fetchPlanTrabajoById,
  };
};

export default usePlantrabajo;
