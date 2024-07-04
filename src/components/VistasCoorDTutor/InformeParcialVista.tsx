import { FC, useState } from "react";
import InformeParicialPage from "../../pages/estudiante/InformeParicialPage";
import { DialogComponent } from "../ui/Dialog/DialogComponent";
import { IoCloseSharp } from "react-icons/io5";

interface ParcialProps {
  initialOpen: boolean;
  idPlanTrabajo?: number;
  rol: string;
  isTutor?: boolean;
}

const InformeParcialVista: FC<ParcialProps> = ({
  initialOpen,
  rol,
  idPlanTrabajo,
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);
  return (
    <>
      {rol === "ESTUDIANTE" ? (
        <InformeParicialPage rol={true} />
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
              <InformeParicialPage rol={false} />{" "}
            </div>
          }
          title=""
        />
      )}
    </>
  );
};

export default InformeParcialVista;
