import React, { useEffect, useState } from "react";
import Collapse from "../../components/ui/Button/Collapse";
import Title from "../../components/ui/Tittle/Title";
import IntensidadHorariaTable from "./../../components/PlanDeTrabajo/IntensidadHorariaTable";
import Objetivo from "./../../components/PlanDeTrabajo/Objetivos";
import { ActivityManager } from "./../../components/PlanDeTrabajo/Actividad/ActivityManager";
import RRForm from "./../../components/PlanDeTrabajo/RRForm";
import { Comment } from "../../components/PlanDeTrabajo/Actividad/types";
import Checkbox from "../../components/ui/Input/Checkbox";
import Swal from "sweetalert2";
import { Estudiante } from "../../interfaces/estudiante.interface";
import { PlanDeTrabajo } from "../../interfaces/plantrabajo.interface";
import { IntensidadHoraria } from "./../../interfaces/intensidad.interface";
import { Input, Label, TextArea } from "../../components/ui";
import useComentario from "../../hooks/useComentario";
import { Comentario } from "../../interfaces";

interface PlanTrabProps {
  estudiante: Estudiante;
  planTrabajo: PlanDeTrabajo;
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
  planTrabajo,
  rol,
  isTutor,
  tutorApru,
  setTutorApru,
  coordApru,
  setCoorApru,
}) => {
  const {
    comentario,
    createComentario,
    deleteActComentario,
    deleteObjComentario,
    updateComentario,
  } = useComentario();

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

  console.log(planTrabajo);

  useEffect(() => {
    if (comentario != null) {
      setComments(comentario);
    }
  }, [comentario]);

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
        <div className="w-full flex flex-wrap">
          <div className="p-2 rounded border w-full mb-2 mr-2 ">
            <Label>Codigo</Label>
            <p>{estudiante?.codigo}</p>
          </div>
          <div className="p-2 rounded border w-full md:w-[calc(50%-0.5rem)] mb-2">
            <Label>Nombre</Label>
            <p>{estudiante?.primerNombre}</p>
          </div>
          <div className="p-2 rounded border w-full md:w-[calc(50%-0.5rem)] md:ml-2 mb-2">
            <Label>Apellido</Label>
            <p>{estudiante?.primerApellido}</p>
          </div>
          <div className="p-2 rounded border w-full md:w-[calc(50%-0.5rem)] mb-2">
            <Label>Tipo de Documento</Label>
            <p>{estudiante?.tipoDocumento?.nombre}</p>
          </div>
          <div className="p-2 rounded border w-full md:w-[calc(50%-0.5rem)] md:ml-2 mb-2 ">
            <Label>Documento</Label>
            <p>{estudiante?.numeroDocumento}</p>
          </div>
        </div>
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
          intensidadHoras={planTrabajo?.intensidadHoraria}
        />
      </Collapse>
      <Collapse
        rol={rol}
        title="Objetivos"
        comments={comments}
        setComments={setComments}
        autor="TUTOR"
      >
        <Objetivo rol={rol} obj={planTrabajo?.objetivo} />
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
