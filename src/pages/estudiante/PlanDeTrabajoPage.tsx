import React from "react";
import Collapse from "../../components/ui/Button/Collapse";
import Title from "../../components/ui/Tittle/Title";
import IntensidadHorariaTable from "./../../components/PlanDeTrabajo/IntensidadHorariaTable";
import Objetivos from "./../../components/PlanDeTrabajo/Objetivos";
import { ActivityManager } from "./../../components/PlanDeTrabajo/Actividad/ActivityManager";
import RRForm from "./../../components/PlanDeTrabajo/RRForm";

interface PlanTrabProps {
  estudiante: { numSemanas: number; intensidadHoras: [] };
  rol: boolean;
}

// Componente PlanDeTrabajo
const PlanDeTrabajoPage: React.FC<PlanTrabProps> = ({ estudiante, rol }) => {
  return (
    <>
      <Title titulo="Plan de Trabajo" />
      <Collapse title="Estudiante">
        <p>Detalles de la tarea 1.</p>
      </Collapse>
      <Collapse title="Empresa">
        <p>Detalles de la tarea 2.</p>
      </Collapse>
      <Collapse title="Intensidad Horaria">
        <IntensidadHorariaTable
          rol={rol}
          intensidadHoras={estudiante.intensidadHoras}
          numSemanas={estudiante.numSemanas}
        />
      </Collapse>
      <Collapse title="Objetivos">
        <Objetivos rol={rol} />
      </Collapse>
      <Collapse title="Actividades">
        <ActivityManager rol={rol} />
      </Collapse>
      <Collapse title="Requerimientos/Resultados">
        <RRForm rol={rol} />
      </Collapse>
    </>
  );
};

export default PlanDeTrabajoPage;
