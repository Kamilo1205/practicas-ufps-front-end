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
      <TextArea
        disabled={!isEditing}
        rows={3}
        placeholder="Los objetivos deben expresar lo que se pretende lograr.
Debe ser redactado en infinitivo (Verbo sin conjugar, por ejemplo: Analizar, evaluar, diseñar) debe ser claro (Qué exprese la acción a realizar), concreto (Conciso que no dé lugar a confusiones), medible (verificable o demostrable su logro dentro del trabajo).
"
      />
      <Label className="mt-3">Objetivo Principal</Label>
      <TextArea disabled={!isEditing} rows={3} />
      <Label className="mt-3">Objetivos Específicos</Label>
      <TextArea disabled={!isEditing} rows={3} />
      <Label className="mt-3">Justificación</Label>
      <TextArea
        disabled={!isEditing}
        rows={5}
        placeholder="La justificación debe presentarla clara y argumentada desde el punto de vista teórico, práctico, empresarial y personal sobre las razones que justifican realizarla y su relación con el programa académico. Se debe dar respuesta a la importancia del desarrollo de la práctica."
      />
      <Label className="mt-3">Alcance</Label>
      <TextArea
        disabled={!isEditing}
        rows={5}
        placeholder="El alcance debe definir en forma clara los entregables de la práctica de acuerdo con los objetivos definidos."
      />

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
