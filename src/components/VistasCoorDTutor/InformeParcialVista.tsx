import { FC, useEffect, useState } from "react";
import InformeParicialPage from "../../pages/estudiante/InformeParicialPage";
import { DialogComponent } from "../ui/Dialog/DialogComponent";
import { IoCloseSharp } from "react-icons/io5";
import { Estudiante } from "../../interfaces/estudiante.interface";
import { PlanDeTrabajo } from "../../interfaces/plantrabajo.interface";
import usePlantrabajo from "../../hooks/usePlanTrabajo";
import { useAuth } from "../../contexts";

interface ParcialProps {
  initialOpen: boolean;
  idPlanTrabajo?: number;
  rol: string;
  isTutor?: boolean;
  estudiante?: Estudiante;
  plantrabajo2?: PlanDeTrabajo;
}

const InformeParcialVista: FC<ParcialProps> = ({
  initialOpen,
  rol,
  idPlanTrabajo,
  estudiante,
  plantrabajo2,
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);
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
        <InformeParicialPage rol={true} plantrabajo={planTrabajo} />
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
              <InformeParicialPage rol={false} plantrabajo={planTrabajo2} />
            </div>
          }
          title=""
        />
      )}
    </>
  );
};

export default InformeParcialVista;
