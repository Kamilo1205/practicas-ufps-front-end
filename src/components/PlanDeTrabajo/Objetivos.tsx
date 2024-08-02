import { FC, useEffect, useState } from "react";

import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { TfiSave } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";
import { Label, TextArea } from "../ui";
import { Objetivos } from "../../interfaces/objetivos.interface";
import useObjetivos from "../../hooks/useObjetivos";

interface Obj {
  rol: boolean;
  Objetivo_de_su_practica: string;
  Objetivo_principal: string;
  Objetivo_especial: string;
  Justificacion: string;
  Alcance: string;
  obj?: Objetivos;
}
const Objetivo: FC<Obj> = ({ rol, obj }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [objPractica, setObjPrac] = useState("");
  const [objPrin, setObjPrinc] = useState("");
  const [objEsp, setObjEsp] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [alcance, setAlcance] = useState("");

  const { createObjetivo, updateObjetivo } = useObjetivos();

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleNoEdit = () => {
    setIsEditing(false);
  };
  const validarInputs = () => {
    if (
      !objPractica.trim() ||
      !objPrin.trim() ||
      !objEsp.trim() ||
      !justificacion.trim() ||
      !alcance.trim()
    ) {
      Swal.fire({
        title: "Campos Vacíos",
        text: "No es posible guardar campos vacíos",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return false;
    }
    return true;
  };
  const handleSave = () => {
    if (!validarInputs()) return;
    setIsEditing(false);
    if (obj?.id != null) {
      const objetivo: Objetivos = {
        id: obj?.id,
        objetivoPractica: objPractica,
        objetivoPrincipal: objPrin,
        objetivoEspecial: objEsp,
        justificacion: justificacion,
        alcance: alcance,
      };
      updateObjetivo(objetivo)
        .then(() => {
          Swal.fire({
            title: "Información guardada",
            text: "Los datos han sido guardados correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Ha ocurrido un error",
            text: "No se guardo la Información",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        });
    } else {
      const objetivo: Objetivos = {
        objetivoPractica: objPractica,
        objetivoPrincipal: objPrin,
        objetivoEspecial: objEsp,
        justificacion: justificacion,
        alcance: alcance,
      };
      console.log(objetivo);
      createObjetivo(objetivo)
        .then(() => {
          Swal.fire({
            title: "Información guardada",
            text: "Los datos han sido guardados correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Ha ocurrido un error",
            text: "No se guardo la Información",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        });
    }
  };

  useEffect(() => {
    if (obj != null) {
      setObjPrinc(obj.objetivoPrincipal);
      setObjPrac(obj.objetivoPractica);
      setObjEsp(obj.objetivoEspecial);
      setJustificacion(obj.justificacion);
      setAlcance(obj.alcance);
    }
  }, [obj]);

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
        onChange={(event) => setObjPrac(event.target.value)}
        value={objPractica}
        placeholder="Los objetivos deben expresar lo que se pretende lograr.
Debe ser redactado en infinitivo (Verbo sin conjugar, por ejemplo: Analizar, evaluar, diseñar) debe ser claro (Qué exprese la acción a realizar), concreto (Conciso que no dé lugar a confusiones), medible (verificable o demostrable su logro dentro del trabajo).
"
      />
      <Label className="mt-3">Objetivo Principal</Label>
      <TextArea
        disabled={!isEditing}
        rows={3}
        value={objPrin}
        onChange={(event) => setObjPrinc(event.target.value)}
      />
      <Label className="mt-3">Objetivos Específicos</Label>
      <TextArea
        disabled={!isEditing}
        rows={3}
        value={objEsp}
        onChange={(event) => setObjEsp(event.target.value)}
      />
      <Label className="mt-3">Justificación</Label>
      <TextArea
        disabled={!isEditing}
        value={justificacion}
        onChange={(event) => setJustificacion(event.target.value)}
        rows={5}
        placeholder="La justificación debe presentarla clara y argumentada desde el punto de vista teórico, práctico, empresarial y personal sobre las razones que justifican realizarla y su relación con el programa académico. Se debe dar respuesta a la importancia del desarrollo de la práctica."
      />
      <Label className="mt-3">Alcance</Label>
      <TextArea
        disabled={!isEditing}
        value={alcance}
        onChange={(event) => setAlcance(event.target.value)}
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

export default Objetivo;
