import { FC, useState } from "react";
import InformeParicialPage from "../../pages/estudiante/InformeParicialPage";
import { DialogComponent } from "../ui/Dialog/DialogComponent";
import InformeFinalPage from "../../pages/estudiante/InformeFinalPage";
import { IoCloseSharp } from "react-icons/io5";

interface FinalProps {
  initialOpen: boolean;
  idPlanTrabajo?: number;
  rol: string;
  isTutor?: boolean;
}

const InformeFinalVista: FC<FinalProps> = ({
  initialOpen,
  rol,
  idPlanTrabajo,
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);
  return (
    <>
      {rol === "estudiante" ? (
        <InformeFinalPage rol={true} />
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
              <InformeFinalPage rol={false} />
            </div>
          }
          title=""
        />
      )}
    </>
  );
};

export default InformeFinalVista;
