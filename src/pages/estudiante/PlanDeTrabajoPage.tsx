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
import CollapseObj from "../../components/ui/Button/CollapseObj";
import CollapseAct from "../../components/ui/Button/CollapseAct";
import { useAuth } from "./../../contexts/AuthContext";
import usePlantrabajo from "../../hooks/usePlanTrabajo";

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
  const [comments, setComments] = useState(comentarios);
  const { aprobarPlanEmpresa, aprobarPlanTutor } = usePlantrabajo();
  const handleCheckboxChange = (checked: boolean) => {
    console.log("Checkbox is now", checked ? "checked" : "unchecked");
    if (isTutor) {
      aprobarPlanTutor(planTrabajo?.id).then((response) => {
        console.log(response);
      });
      Swal.fire({
        title: "Información Guardada",
        text: "Los datos han sido guardados correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      aprobarPlanEmpresa(planTrabajo.id);
      Swal.fire({
        title: "Información Guardada",
        text: "Los datos han sido guardados correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const [comentarioObj, setComentarioObj] = useState<Comentario[]>([]);
  const [comentarioAct, setComentarioAct] = useState<Comentario[]>([]);

  useEffect(() => {
    if (planTrabajo != null) {
      if (planTrabajo.seccionActividades != null) {
        if (planTrabajo.seccionActividades.comentarios != null) {
          setComentarioAct(planTrabajo.seccionActividades.comentarios);
        }
      }
      if (planTrabajo.objetivo != null) {
        if (planTrabajo.objetivo.comentarios != null) {
          setComentarioObj(planTrabajo.objetivo.comentarios);
        }
      }
    }
  }, [planTrabajo]);
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
      <CollapseObj
        rol={rol}
        title="Objetivos"
        comments={comentarioObj}
        setComments={setComentarioObj}
        obj={planTrabajo?.objetivo}
        autor="TUTOR"
      >
        <Objetivo rol={rol} obj={planTrabajo?.objetivo} />
      </CollapseObj>
      <CollapseAct
        rol={rol}
        title="Actividades"
        comments={comentarioAct}
        setComments={setComentarioAct}
        act={planTrabajo?.seccionActividades}
        autor="TUTOR"
      >
        <ActivityManager
          rol={rol}
          actividades={planTrabajo?.seccionActividades?.actividades}
        />
      </CollapseAct>
      <Collapse
        rol={rol}
        title="Requerimientos/Resultados"
        comments={comments}
        setComments={setComments}
        autor="TUTOR"
        isComment={false}
      >
        <RRForm rol={rol} />
      </Collapse>
    </>
  );
};

export default PlanDeTrabajoPage;
