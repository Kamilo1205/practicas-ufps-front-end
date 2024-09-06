import { FC, useEffect, useState } from "react";
import { DialogComponent } from "./../../ui/Dialog/DialogComponent";
import PlanDeTrabajoPage from "./../../../pages/estudiante/PlanDeTrabajoPage";
import usePlantrabajo from "../../../hooks/usePlanTrabajo";

import { useAuth } from "../../../contexts";
import { Estudiante } from "../../../interfaces/estudiante.interface";
import { PlanDeTrabajo } from "../../../interfaces/plantrabajo.interface";

import { IoCloseSharp } from "react-icons/io5";
interface PlanProps {
  initialOpen: boolean;
  idPlanTrabajo?: number;
  rol: string;
  isTutor?: boolean;
  estudiante?: Estudiante;
  plantrabajo2?: PlanDeTrabajo;
}


const PlanDeTrabajoVista: FC<PlanProps> = ({
  initialOpen,
  open = false,
  setOpen,
  isTutor,
  rol,
  estudiante,
  plantrabajo2,
}) => {

  const [planTrabajo, setPlanTrabajo] = useState<PlanDeTrabajo>();
  const [planTrabajo2, setPlanTrabajo2] = useState<PlanDeTrabajo>();
  const { fetchMiPlanTrabajoActualEstudiante, fetchPlanTrabajoById } =
    usePlantrabajo();
  const { user } = useAuth();
  const roles = user?.roles;
  const esEstudiante = roles?.some((role) => role.nombre === "estudiante");
  useEffect(() => {
    if (estudiante?.id) {
      if (esEstudiante) {
        fetchMiPlanTrabajoActualEstudiante()
          .then((result) => {
            setPlanTrabajo(result);
          })
          .catch((error) => {
            console.error("Error fetching plan de trabajo:", error);
          });
      } else {
        fetchPlanTrabajoById(plantrabajo2?.id)
          .then((result) => {
            setPlanTrabajo2(result);
          })
          .catch((error) => {
            console.error("Error fetching plan de trabajo:", error);
          });
      }
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
            <div className="w-full">
              <div className="flex justify-end">
                <button className="text-red-600" onClick={() => setOpen(!open)}>
                  <IoCloseSharp style={{ width: "30px", height: "30px" }} />
                </button>
              </div>
              <PlanDeTrabajoPage
                rol={false}
                estudiante={estudiante}
                planTrabajo={planTrabajo2} //plantrabajo2
                isTutor={isTutor}
              />
            </div>
          }
          title=""
        />
      )}
    </>
  );
};
export default PlanDeTrabajoVista;
