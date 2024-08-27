import { FC, useEffect, useState } from "react";
import InformeParicialPage from "../../pages/estudiante/InformeParicialPage";
import { DialogComponent } from "../ui/Dialog/DialogComponent";
import { IoCloseSharp } from "react-icons/io5";
import EvaluacionEstudiante from "./../../pages/estudiante/EvaluacionEstudiante";
import usePlantrabajo from "../../hooks/usePlanTrabajo";
import { Estudiante } from "./../../schemas/solicitudSchema";
import Swal from "sweetalert2";
import { PlanDeTrabajo } from "../../interfaces/plantrabajo.interface";
import Spinner from "../ui/Spinner"; // Importar un componente de carga, puede ser un Spinner

interface EvaluacionProps {
  initialOpen: boolean;
  idPlanTrabajo?: number;
  rol: string;
  isTutor?: boolean;
  estudiante: Estudiante;
}

const EvaluacionEstudianteVista: FC<EvaluacionProps> = ({
  initialOpen,
  rol,
  idPlanTrabajo,
  estudiante,
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);
  const [planTrabajo, setPlanTrabajo] = useState<PlanDeTrabajo>();
  const {
    fetchMiPlanTrabajoActualEstudiante,
    evaluacionCreateEstudiante,
    evaluacionUpdateEstudiante,
  } = usePlantrabajo();

  const evaluacionCreate = (evaluacionCreate: Evaluacion) => {
    evaluacionCreateEstudiante(evaluacionCreate).then((response) => {
      if (response === "ok") {
        Swal.fire({
          title: "Información guardada",
          text: "Los datos han sido guardados correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "No se guardo la Información",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const evaluacionUpdate = (evaluacionUpdate: Evaluacion) => {
    evaluacionUpdateEstudiante(evaluacionUpdate).then((response) => {
      if (response === "ok") {
        Swal.fire({
          title: "Información guardada",
          text: "Los datos han sido guardados correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "No se guardo la Información",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  useEffect(() => {
    if (estudiante != null) {
      fetchMiPlanTrabajoActualEstudiante()
        .then((result) => {
          setPlanTrabajo(result);
        })
        .catch((error) => {
          console.error("Error fetching plan de trabajo:", error);
        })
    }
  }, [estudiante?.id]);

  return (
    <>
      { rol === "estudiante" ? (
        <EvaluacionEstudiante
          rol={true}
          evaluacionCreate={evaluacionCreate}
          evaluacionUpdate={evaluacionUpdate}
          planTrabajo={planTrabajo}
        />
      ) : (
        <DialogComponent
          isOpen={open}
          size="xl"
          onClose={() => setOpen(false)}
          content={
            <div className="w-full">
              <div className="flex justify-end">
                <button className="text-red-600" onClick={() => setOpen(!open)}>
                  <IoCloseSharp style={{ width: "30px", height: "30px" }} />
                </button>
              </div>
              <EvaluacionEstudiante rol={false} planTrabajo={planTrabajo} />
            </div>
          }
          title=""
        />
      )}
    </>
  );
};

export default EvaluacionEstudianteVista;
