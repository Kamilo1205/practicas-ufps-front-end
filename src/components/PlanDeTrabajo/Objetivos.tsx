import { FC, useState } from "react";

import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { TfiSave } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";
import { Label, TextArea } from "../ui";

interface Obj {
  rol: boolean;
  Objetivo_de_su_practica: string;
  Objetivo_principal: string;
  Objetivo_especial: string;
  Justificacion: string;
  Alcance: string;
}
const Objetivos: FC<Obj> = ({ rol }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleNoEdit = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    Swal.fire({
      title: "Información guardada",
      text: "Los datos han sido guardados correctamente.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="mb-3">
      <div className="flex w-full">
        {rol && (
          <div className="flex w-full justify-end">
            {!isEditing ? (
              <button
                className="bg-green-500 text-white px-3 py-2 rounded-lg flex
                cursor-pointer 
                hover:scale-105 
                active:scale-95 
                transition-transform 
                duration-150 
                ease-in-out"
                onClick={handleEdit}
              >
                <MdEdit className="mt-1 mr-1" />
                Editar
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-lg flex
                cursor-pointer 
                hover:scale-105 
                active:scale-95 
                transition-transform 
                duration-150 
                ease-in-out"
                onClick={handleNoEdit}
              >
                <VscChromeClose />
              </button>
            )}
          </div>
        )}
      </div>

      <Label>Objetivo de su práctica</Label>
      <TextArea disabled={!isEditing} />
      <Label className="mt-3">Objetivo Principal</Label>
      <TextArea disabled={!isEditing} />
      <Label className="mt-3">Objetivos Específicos</Label>
      <TextArea disabled={!isEditing} rows={3} />
      <Label className="mt-3">Justificación</Label>
      <TextArea disabled={!isEditing} rows={5} />
      <Label className="mt-3">Alcance</Label>
      <TextArea disabled={!isEditing} rows={5} />

      {isEditing && (
        <div className="flex w-full justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded-lg flex
             cursor-pointer 
             hover:scale-105F 
             active:scale-95 
             transition-transform 
             duration-150 
             ease-in-out"
            onClick={handleSave}
          >
            <TfiSave className="mt-1 mr-1" />
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default Objetivos;
