import { FC, useEffect, useState } from "react";
import { DialogComponent } from "./../../ui/Dialog/DialogComponent";
import PlanDeTrabajoPage from "./../../../pages/estudiante/PlanDeTrabajoPage";
import usePlantrabajo from "../../../hooks/usePlanTrabajo";
import { fetchCiudadById } from "../../../api/ciudades.api";
import { useAuth } from "../../../contexts";
import { Estudiante } from "../../../interfaces/estudiante.interface";
import { PlanDeTrabajo } from "../../../interfaces/plantrabajo.interface";
import { fetchPlanTrabajoActual } from "./../../../api/plantrabajo.api";

interface PlanProps {
  initialOpen: boolean;
  idPlanTrabajo?: number;
  rol: string;
  isTutor?: boolean;
  estudiante?: Estudiante;
  plantrabajo2?: PlanDeTrabajo;
}

const estudiante2 = {
  nombre: "hola",
};
const PlanDeTrabajoVista: FC<PlanProps> = ({
  initialOpen,
  isTutor,
  rol,
  estudiante,
  plantrabajo2,
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);
  const [planTrabajo, setPlanTrabajo] = useState<PlanDeTrabajo>();
  const [planTrabajo2, setPlanTrabajo2] = useState<PlanDeTrabajo>();
  const { fetchMiPlanTrabajoActualEstudiante, fetchPlanTrabajoById } =
    usePlantrabajo();
  const { user } = useAuth();
  useEffect(() => {
    if (estudiante?.id) {
      fetchMiPlanTrabajoActualEstudiante()
        .then((result) => {
          setPlanTrabajo(result);
        })
        .catch((error) => {
          console.error("Error fetching plan de trabajo:", error);
        });

      fetchPlanTrabajoById(plantrabajo2?.id)
        .then((result) => {
          setPlanTrabajo2(result);
        })
        .catch((error) => {
          console.error("Error fetching plan de trabajo:", error);
        });
    }
  }, [estudiante?.id]);

  return (
    <>
      {rol === "estudiante" ? (
        <>
          <PlanDeTrabajoPage
            rol={true}
            estudiante={estudiante}
            planTrabajo={planTrabajo}
          />
        </>
      ) : (
        <DialogComponent
          isOpen={open}
          size="xl"
          onClose={() => setOpen(false)}
          content={
            <PlanDeTrabajoPage
              rol={false}
              estudiante={estudiante}
              planTrabajo={planTrabajo2} //plantrabajo2
              isTutor={isTutor}
            />
          }
          title=""
        />
      )}
    </>
  );
};
export default PlanDeTrabajoVista;
