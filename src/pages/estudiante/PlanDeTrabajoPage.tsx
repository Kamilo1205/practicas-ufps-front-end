import React from "react";
import Collapse from "../../components/ui/Button/Collapse";
import Title from "../../components/ui/Tittle/Title";
import IntensidadHorariaTable from "../../components/estudiantes/IntensidadHorariaTable";
import Objetivos from "./../../components/estudiantes/Objetivos";
import { ActivityManager } from "../../components/estudiantes/Actividad/ActivityManager";

// Componente PlanDeTrabajo
const PlanDeTrabajoPage: React.FC = () => {
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
        <IntensidadHorariaTable />
      </Collapse>
      <Collapse title="Objetivos">
        <Objetivos />
      </Collapse>
      <Collapse title="Actividades">
        <ActivityManager />
      </Collapse>
      <Collapse title="Requerimientos/Resultados">
        <p>Detalles de la tarea 3.</p>
      </Collapse>
    </>
  );
};

export default PlanDeTrabajoPage;
