import { FC, useState } from "react";
import { DialogComponent } from "./../../ui/Dialog/DialogComponent";
import PlanDeTrabajoPage from "./../../../pages/estudiante/PlanDeTrabajoPage";

interface PlanProps {
  initialOpen: boolean;
  idPlanTrabajo?: number;
  rol: string;
  isTutor?: boolean;
}

const estudiante = {
  nombre: "hola",
};
const PlanDeTrabajoVista: FC<PlanProps> = ({ initialOpen, isTutor, rol }) => {
  const [open, setOpen] = useState<boolean>(initialOpen);
  const [tutorApru, setTutorApru] = useState<boolean>(false);
  const [coordApru, setCoorApru] = useState<boolean>(false);
  return (
    <>
      {rol === "ESTUDIANTE" ? (
        <PlanDeTrabajoPage rol={true} estudiante={estudiante} />
      ) : (
        <DialogComponent
          isOpen={open}
          size="xl"
          onClose={() => setOpen(false)}
          content={
            <PlanDeTrabajoPage
              rol={false}
              estudiante={estudiante}
              isTutor={isTutor}
              coordApru={coordApru}
              setCoorApru={setCoorApru}
              tutorApru={tutorApru}
              setTutorApru={setTutorApru}
            />
          }
          title=""
        />
      )}
    </>
  );
};

export default PlanDeTrabajoVista;
