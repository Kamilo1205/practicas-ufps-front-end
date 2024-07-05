import React, { useState } from "react";
import Collapse from "../../components/ui/Button/Collapse";
import Title from "../../components/ui/Tittle/Title";
import IntensidadHorariaTable from "./../../components/PlanDeTrabajo/IntensidadHorariaTable";
import Objetivos from "./../../components/PlanDeTrabajo/Objetivos";
import { ActivityManager } from "./../../components/PlanDeTrabajo/Actividad/ActivityManager";
import RRForm from "./../../components/PlanDeTrabajo/RRForm";
import { Comment } from "../../components/PlanDeTrabajo/Actividad/types";
import Checkbox from "../../components/ui/Input/Checkbox";
import Swal from "sweetalert2";

interface PlanTrabProps {
  estudiante: { numSemanas: number; intensidadHoras: [] };
  rol: boolean;
  isTutor?: boolean;
  tutorApru?: boolean;
  setTutorApru?: React.Dispatch<React.SetStateAction<boolean>>;
  coordApru?: boolean;
  setCoorApru?: React.Dispatch<React.SetStateAction<boolean>>;
}
const comentarios: Comment[] = [];
const PlanDeTrabajoPage: React.FC<PlanTrabProps> = ({
  estudiante,
  rol,
  isTutor,
  tutorApru,
  setTutorApru,
  coordApru,
  setCoorApru,
}) => {
  const [comments, setComments] = useState(comentarios);
  const handleCheckboxChange = (checked: boolean) => {
    console.log("Checkbox is now", checked ? "checked" : "unchecked");
    if (isTutor) {
      Swal.fire({
        title: "Información Guardada TUTOR",
        text: "Los datos han sido guardados correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Información Guardada COORDINADOR",
        text: "Los datos han sido guardados correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <>
      <Title titulo="Plan de Trabajo" />
      {!rol && (
        <div className="w-full flex rounded border mb-4">
          <div className="w-full flex justify-start mt-3">
            <div className="text-xl mb-4 ml-2 font-light">
              Aprobar Plan de Trabajo
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Checkbox onChange={handleCheckboxChange} />
          </div>
        </div>
      )}

      <Collapse rol={rol} isShow={false} title="Estudiante" isComment={false}>
        <p>Detalles de la tarea 1.</p>
      </Collapse>
      <Collapse rol={rol} isShow={false} title="Empresa" isComment={false}>
        <p>Detalles de la tarea 2.</p>
      </Collapse>
      <Collapse
        rol={rol}
        title="Intensidad Horaria"
        comments={comments}
        setComments={setComments}
        autor="TUTOR"
        isComment={false}
      >
        <IntensidadHorariaTable
          rol={rol}
          intensidadHoras={estudiante.intensidadHoras}
          numSemanas={estudiante.numSemanas}
        />
      </Collapse>
      <Collapse
        rol={rol}
        title="Objetivos"
        comments={comments}
        setComments={setComments}
        autor="TUTOR"
      >
        <Objetivos rol={rol} />
      </Collapse>
      <Collapse
        rol={rol}
        title="Actividades"
        comments={comments}
        setComments={setComments}
        autor="TUTOR"
      >
        <ActivityManager rol={rol} />
      </Collapse>
      <Collapse
        rol={rol}
        title="Requerimientos/Resultados"
        comments={comments}
        setComments={setComments}
        autor="TUTOR"
      >
        <RRForm rol={rol} />
      </Collapse>
    </>
  );
};

export default PlanDeTrabajoPage;
