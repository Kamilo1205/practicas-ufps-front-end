import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import {
  fetchPlanTrabajoActual as fetchPlanActualAPI,
  fetchAllPlanTrabajo as fetchAllPlanAPI,
  fetchPlanTrabajoById as fecthPlanByIdAPI,
  fetchMisPlanTrabajoEstudiante as fecthMisPlanesEstudianteAPI,
  fetchMiPlanTrabajoActualEstudiante as fecthPlanActualEstudianteAPI,
  fetchPlanTrabajoByIdEstudiante as fecthPlanByIdEstudianteAPI,
  aprobarPlanEmpresa as aprobarEmpresaAPI,
  aprobarPlanTutor as aprobarPlanTutorAPI,
  updateResultados as updateResultadosAPI,
  updateRequerimiento as updatedRequeAPI,
  evaluacionCreateEstudiante as evaluacionCreateAPI,
  evaluacionUpdateEstudiante as evaluacionUpdateAPI,
  aprobarInformeEmpresa as aprobarInformeEmpresaAPI,
  aprobarInformeTutor as aprobarInformeTutorAPI,
  updateDiagrama,
} from "../api/plantrabajo.api";
import { PlanDeTrabajo } from "../interfaces/plantrabajo.interface";
import { Resultado } from "../interfaces/resultado.interface";
import {
  createPrimerInforme as createprimerInformeAPI,
  createFinalInforme as createinformeFinalAPI,
  updateInformeFinal as updateinformeFinalAPI,
  updateInformePrimer as updateprimerInformeAPI,
  updateDiagramaInforme,
} from "../api/Informes.api";
import { primerInforme } from "../interfaces/primerInforme";
import { informeFinal } from "../interfaces/informeFinal";
import Swal from "sweetalert2";

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
  updatedRequerimientos: (
    plantrabajoId: string,
    updatedRequerimiento: string
  ) => string;
  updatedResultado: (idPlan: string, resultados: Resultado[]) => string;
  createPrimerInforme: (newInforme: primerInforme) => Promise<{
    ok: string;
    data: primerInforme;
  }>;
  createInformeFinal: (
    newInforme: informeFinal
  ) => Promise<{ ok: string; data: informeFinal }>;
  updateInformePrimer: (
    idPlan: string,
    informe: primerInforme
  ) => Promise<string>;
  updateInformeFinal: (
    idPlan: string,
    informe: informeFinal
  ) => Promise<string>;
  evaluacionCreateEstudiante: (evaluacion: Evaluacion) => Promise<string>;
  evaluacionUpdateEstudiante: (evaluacion: Evaluacion) => Promise<string>;
  aprobarInformeEmpresa: (id: string) => Promise<string>;
  aprobarInformeTutor: (id: string) => Promise<string>;
  aprobarPlanEmpresa: (id: string) => Promise<string>;
  aprobarPlanTutor: (id: string) => Promise<string>;
  updateGranttPlan: (file: any) => Promise<any>;
  updateGranttInforme: (file: any, id: string) => Promise<any>;
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

  const aprobarPlanEmpresa = async (id: string): Promise<string> => {
    setLoading(true);
    try {
      Swal.fire({
        title: "Realizando aprobación...",
        text: "Por favor, espere.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await aprobarEmpresaAPI(id);
      Swal.close();
      setError(null);
      return "ok"; // Devuelve `PlanDeTrabajo`
    } catch (err) {
      Swal.close();

      setError(err as AxiosError);
      return "false";
      // Lanza el error para que sea manejado por el llamador si es necesario
    } finally {
      setLoading(false);
    }
  };

  const aprobarPlanTutor = async (id: string): Promise<string> => {
    setLoading(true);
    try {
      Swal.fire({
        title: "Realizando aprobación...",
        text: "Por favor, espere.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await aprobarPlanTutorAPI(id);
      Swal.close();
      setError(null);
      return "ok"; // Devuelve `PlanDeTrabajo`
    } catch (err) {
      setError(err as AxiosError);
      return "false"; // Lanza el error para que sea manejado por el llamador si es necesario
    } finally {
      setLoading(false);
    }
  };

  const updatedRequerimientos = async (
    plantrabajoId: string,
    updatedRequerimiento: string
  ) => {
    setLoading(true);
    try {
      await updatedRequeAPI(plantrabajoId, updatedRequerimiento);
      setError(null);
      return "ok";
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setLoading(false);
    }
  };

  const updatedResultado = async (idPlan: string, resultados: Resultado[]) => {
    setLoading(true);
    try {
      await updateResultadosAPI(idPlan, resultados);
      setError(null);
      return "ok";
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setLoading(false);
    }
  };

  const createPrimerInforme = async (newInforme: primerInforme) => {
    setLoading(true);
    try {
      const data = await createprimerInformeAPI(newInforme);
      setError(null);
      return { ok: "ok", data: data };
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setLoading(false);
    }
  };

  const createInformeFinal = async (newInforme: informeFinal) => {
    setLoading(true);
    try {
      const data = await createinformeFinalAPI(newInforme);
      setError(null);
      return { ok: "ok", data: data };
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setLoading(false);
    }
  };

  const updateInformePrimer = async (
    idInforme: string,
    informe: primerInforme
  ) => {
    setLoading(true);
    try {
      await updateprimerInformeAPI(idInforme, informe);
      setError(null);
      return "ok";
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setLoading(false);
    }
  };
  const updateInformeFinal = async (
    idInforme: string,
    informe: informeFinal
  ) => {
    setLoading(true);
    try {
      await updateinformeFinalAPI(idInforme, informe);
      setError(null);
      return "ok";
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setLoading(false);
    }
  };

  const evaluacionCreateEstudiante = async (evaluacion: Evaluacion) => {
    setLoading(true);
    try {
      await evaluacionCreateAPI(evaluacion);
      setError(null);
      return "ok";
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setLoading(false);
    }
  };
  const evaluacionUpdateEstudiante = async (evaluacion: Evaluacion) => {
    setLoading(true);
    try {
      await evaluacionUpdateAPI(evaluacion);
      setError(null);
      return "ok";
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setLoading(false);
    }
  };

  const aprobarInformeEmpresa = async (id: string): Promise<string> => {
    setLoading(true);
    try {
      Swal.fire({
        title: "Realizando aprobación...",
        text: "Por favor, espere.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await aprobarInformeEmpresaAPI(id);
      Swal.close();
      setError(null);
      return "ok"; // Devuelve `PlanDeTrabajo`
    } catch (err) {
      Swal.close();
      setError(err as AxiosError);
      return "false"; // Lanza el error para que sea manejado por el llamador si es necesario
    } finally {
      setLoading(false);
    }
  };

  const aprobarInformeTutor = async (id: string): Promise<string> => {
    setLoading(true);
    try {
      Swal.fire({
        title: "Realizando aprobación...",
        text: "Por favor, espere.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await aprobarInformeTutorAPI(id);
      Swal.close();
      setError(null);
      return "ok"; // Devuelve `PlanDeTrabajo`
    } catch (err) {
      Swal.close();
      setError(err as AxiosError);
      return "false"; // Lanza el error para que sea manejado por el llamador si es necesario
    } finally {
      setLoading(false);
    }
  };

  const updateGranttPlan = async (file: File): Promise<any> => {
    setLoading(true);
    try {
      const data = await updateDiagrama(file);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return "false";
    } finally {
      setLoading(false);
    }
  };

  const updateGranttInforme = async (file: File, id: string): Promise<any> => {
    setLoading(true);
    try {
      const data = await updateDiagramaInforme(file, id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return "false";
    } finally {
      setLoading(false);
    }
  };



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
    aprobarPlanEmpresa,
    aprobarPlanTutor,
    updatedRequerimientos,
    updatedResultado,
    createPrimerInforme,
    createInformeFinal,
    updateInformeFinal,
    updateInformePrimer,
    evaluacionCreateEstudiante,
    evaluacionUpdateEstudiante,
    aprobarInformeEmpresa,
    aprobarInformeTutor,
    updateGranttPlan,
    updateGranttInforme,
  };
};




export default usePlantrabajo;
