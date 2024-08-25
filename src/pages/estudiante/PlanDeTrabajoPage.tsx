import React, { useEffect, useState } from "react";
import Collapse from "../../components/ui/Button/Collapse";
import Title from "../../components/ui/Tittle/Title";
import IntensidadHorariaTable from "./../../components/PlanDeTrabajo/IntensidadHorariaTable";
import Objetivo from "./../../components/PlanDeTrabajo/Objetivos";
import { ActivityManager } from "./../../components/PlanDeTrabajo/Actividad/ActivityManager";
import RRForm from "./../../components/PlanDeTrabajo/RRForm";
import { Comment } from "../../components/PlanDeTrabajo/Actividad/types";
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
import { Resultado } from "../../interfaces/resultado.interface";
import { string } from "zod";
import Checkbox from "./../../components/ui/Input/Checkbox";
import FileUpload from "./../../components/PlanDeTrabajo/FileUpload";

interface PlanTrabProps {
  estudiante: Estudiante;
  planTrabajo: PlanDeTrabajo;
  rol: boolean;
  isTutor?: boolean;
}
const comentarios: Comment[] = [];
const PlanDeTrabajoPage: React.FC<PlanTrabProps> = ({
  estudiante,
  planTrabajo,
  rol,
  isTutor,
}) => {
  const [comments, setComments] = useState(comentarios);
  const {
    aprobarPlanEmpresa,
    aprobarPlanTutor,
    updatedRequerimientos,
    updatedResultado,
  } = usePlantrabajo();
  console.log(planTrabajo)

  const { user } = useAuth();
  const roles = user?.roles;
  const rolesNecesarios = ["tutor", "coordinador"];

  const esEstudiante = roles?.some((role) => role.nombre === "estudiante");
  const esTutorYEmpresa = rolesNecesarios.every((rolNecesario) =>
    roles?.some((role) => role.nombre === rolNecesario)
  );
  const esOnlyTutor = roles?.some((role) => role.nombre === "tutor");
  const esOnlyCoodinador = roles?.some((role) => role.nombre === "coordinador");

  const [aprobacionTutor, setAprobacionTutor] = useState(false);
  const [aprobacionCoordinador, setAprobacionCoordinador] = useState(false);
  const handleCheckboxChangeTutor = () => {
    aprobarPlanTutor(planTrabajo?.id).then((response) => {
      if (response != "ok") {
        setAprobacionTutor(true);
      } else {
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "No se guardo la Información",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const handleCheckboxChangeCoordinador = () => {
    aprobarPlanEmpresa(planTrabajo.id).then((response) => {
      if (response != "ok") {
        setAprobacionCoordinador(true);
      } else {
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "No se guardo la Información",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const updatedReque = (idPlan: string, reque: string) => {
    updatedRequerimientos(idPlan, reque).then((response) => {
      if (response === "mal") {
        return "mal";
      }
    });
    return "ok";
  };
  const updatedResul = (idPlan: string, rows: Resultado[], ok: string) => {
    console.log(ok);
    updatedResultado(idPlan, rows).then((response) => {
      if (response == "ok" && ok == "ok") {
        Swal.fire({
          title: "Información guardada",
          text: "Los datos han sido guardados correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "No se guardo la Información",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    });
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
  useEffect(() => {
    if (planTrabajo?.tutorInstitucional !== null) {
      setAprobacionCoordinador(true);
    }
  }, [planTrabajo?.tutorInstitucional]);
  useEffect(() => {
    if (planTrabajo?.tutorEmpresarial !== null) {
      setAprobacionTutor(true);
    }
  }, [planTrabajo?.tutorEmpresarial]);
  return (
    <>
      <Title titulo="Plan de Trabajo" />

      {esEstudiante && (
        <div>
          <div className="w-full flex rounded border mb-4">
            <div className="w-full flex justify-start mt-3">
              <div className="text-xl mb-4 ml-2 font-light">
                Aprobación de Tutor Empresa
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Checkbox checked={aprobacionTutor} isEstudiante={true} />
            </div>
          </div>
          <div className="w-full flex rounded border mb-4">
            <div className="w-full flex justify-start mt-3">
              <div className="text-xl mb-4 ml-2 font-light">
                Aprobación de Tutor Practicas
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Checkbox checked={aprobacionCoordinador} isEstudiante={true} />
            </div>
          </div>
        </div>
      )}
      {esTutorYEmpresa ? (
        <div>
          <div className="w-full flex rounded border mb-4">
            <div className="w-full flex justify-start mt-3">
              <div className="text-xl mb-4 ml-2 font-light">
                Aprobación de Tutor Empresa
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Checkbox
                onChange={handleCheckboxChangeTutor}
                checked={aprobacionTutor}
              />
            </div>
          </div>
          <div className="w-full flex rounded border mb-4">
            <div className="w-full flex justify-start mt-3">
              <div className="text-xl mb-4 ml-2 font-light">
                Aprobación de Tutor Practicas
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Checkbox
                onChange={handleCheckboxChangeCoordinador}
                checked={aprobacionCoordinador}
              />
            </div>
          </div>
        </div>
      ) : esOnlyTutor ? (
        <div>
          <div className="w-full flex rounded border mb-4">
            <div className="w-full flex justify-start mt-3">
              <div className="text-xl mb-4 ml-2 font-light">
                Aprobación de Tutor Empresa
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Checkbox
                onChange={handleCheckboxChangeCoordinador}
                checked={aprobacionTutor}
              />
            </div>
          </div>
        </div>
      ) : esOnlyCoodinador ? (
        <div>
          <div className="w-full flex rounded border mb-4">
            <div className="w-full flex justify-start mt-3">
              <div className="text-xl mb-4 ml-2 font-light">
                Aprobación de Tutor Empresa
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Checkbox isEstudiante={true} checked={aprobacionTutor} />
            </div>
          </div>
          <div className="w-full flex rounded border mb-4">
            <div className="w-full flex justify-start mt-3">
              <div className="text-xl mb-4 ml-2 font-light">
                Aprobación de Tutor Practicas
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Checkbox
                onChange={handleCheckboxChangeCoordinador}
                checked={aprobacionCoordinador}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
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
        <RRForm
          rol={rol}
          updatedReque={updatedReque}
          updatedResul={updatedResul}
          resultado={planTrabajo?.resultados}
          reques={planTrabajo?.requerimientosTecnicos}
          idPlan={planTrabajo?.id}
        />
      </Collapse>
      <Collapse
        rol={rol}
        title="Diagrama de Grantt"
        comments={comments}
        setComments={setComments}
        autor="TUTOR"
        isComment={false}
      >
        <div className="w-full flex">
          <FileUpload rol={rol} />
          <div className="w-full"></div>
        </div>
      </Collapse>
    </>
  );
};

export default PlanDeTrabajoPage;
