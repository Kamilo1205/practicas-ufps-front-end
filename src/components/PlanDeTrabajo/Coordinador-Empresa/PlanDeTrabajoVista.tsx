import { FC, useState } from "react";
import { DialogComponent } from "./../../ui/Dialog/DialogComponent";
import PlanDeTrabajoPage from "./../../../pages/estudiante/PlanDeTrabajoPage";

interface PlanProps {
  initialOpen: boolean;
  idPlanTrabajo?: number;
  rol: string;
}

const estudiante = {
  nombre: "hola",
};
const PlanDeTrabajoVista: FC<PlanProps> = ({
  initialOpen,
  idPlanTrabajo,
  rol,
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);

  return (
    <>
      {rol === "ESTUDIANTE" ? (
        <PlanDeTrabajoPage rol={true} estudiante={estudiante} />
      ) : (
        <DialogComponent
          isOpen={open}
          size="xl"
          onClose={() => setOpen(false)}
          content={<PlanDeTrabajoPage rol={false} estudiante={estudiante} />}
          title=""
        />
      )}
    </>
  );
};

export default PlanDeTrabajoVista;
