import React, { useState } from "react";
import Collapse from "../../components/ui/Button/Collapse";
import Title from "../../components/ui/Tittle/Title";
import IntensidadHorariaTable from "./../../components/PlanDeTrabajo/IntensidadHorariaTable";
import Objetivos from "./../../components/PlanDeTrabajo/Objetivos";
import { ActivityManager } from "./../../components/PlanDeTrabajo/Actividad/ActivityManager";
import RRForm from "./../../components/PlanDeTrabajo/RRForm";
import { Comment } from "../../components/PlanDeTrabajo/Actividad/types";

interface PlanTrabProps {
  estudiante: { numSemanas: number; intensidadHoras: [] };
  rol: boolean;
}
const comentarios: Comment[] = [];
const PlanDeTrabajoPage: React.FC<PlanTrabProps> = ({ estudiante, rol }) => {
  const [comments, setComments] = useState(comentarios);
  return (
    <>
      <Title titulo="Plan de Trabajo" />
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
