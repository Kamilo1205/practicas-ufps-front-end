import { FC, useEffect, useState } from "react";
import TablaGestion from "./../../components/ui/Table/TablaGestion";
import { TextArea } from "./../../components/ui/Input/TextArea";
import { MdEdit } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { TfiSave } from "react-icons/tfi";
import Swal from "sweetalert2";
import { PlanDeTrabajo } from "./../../interfaces/plantrabajo.interface";
import LoadingSpinner from "../../components/ui/Pagination/LoadingSpiner";

interface EvaluacionProp {
  rol: boolean;
  planTrabajo?: PlanDeTrabajo;
  evaluacionCreate: (evaluacionCreate: Evaluacion) => void;
  evaluacionUpdate: (evaluacionUpdate: Evaluacion) => void;
}
const EvaluacionEstudiante: FC<EvaluacionProp> = ({
  rol = true,
  planTrabajo,
  evaluacionCreate,
  evaluacionUpdate,
}) => {
  const eval1 = [
    "1. Asesoría en el inicio del proceso de práctica profesional",
    "2. Gestión para ayudar a conseguir la práctica profesional",
    "3. Asignación del asesor académico (docente)",
    "4. Seguimiento al proceso de práctica profesional",
    "5. Disposición en la atención",
  ];
  const eval2 = [
    "1. Actitud y comunicación con el estudiante",
    "2. Conocimiento profesional y práctico",
    "3. Actividades o funciones asignadas",
    "4. Disposición para compartir conocimiento y explicar cómo realizar las actividades asignadas.",
    "5. Disposición para trabajo en conjunto",
  ];
  const eval3 = [
    "1. Inducción",
    "2. Condición del puesto de trabajo asignado",
    "3. Dotación de herramientas y/o útiles para el desarrollo de sus actividades.",
    "4. Transferencia de conocimientos y actividades de capacitación.",
    "5. Orientación general de los procesos de la empresa.",
    "6. Clima y cultura organizacional",
    "7. Trato y comunicación con los integrantes de la empresa",
  ];
  const eval4 = [
    "1. Aplicación de conocimientos teóricos y/o prácticos aprendidos durante la formación académica.",
    "2. Aprendizaje de nuevos conocimientos",
    "3. Ampliación de conocimientos sobre comercio internacional",
    "4. Preparación para el ejercicio profesional",
    "5. Satisfacción frente a la práctica profesional realizada",
  ];

  const columnas = [
    "Deficiente (0.0-1.9)",
    "Insuficiente (2.0-2.7)",
    "Aceptable (2.8-3.4)",
    "Satisfactorio (3.5-4.2)",
    "Excelente (4.3-5.0)",
  ];

  const [evaluacion1, setEvaluacion1] = useState(
    Array(eval1.length).fill(Array(columnas.length).fill(false))
  );
  const [evaluacion2, setEvaluacion2] = useState(
    Array(eval2.length).fill(Array(columnas.length).fill(false))
  );
  const [evaluacion3, setEvaluacion3] = useState(
    Array(eval3.length).fill(Array(columnas.length).fill(false))
  );
  const [evaluacion4, setEvaluacion4] = useState(
    Array(eval4.length).fill(Array(columnas.length).fill(false))
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [comentarios, setComentarios] = useState("");
  const save = () => {
    setIsEditing(!isEditing);

    const evaluacionUpdat: Evaluacion = {
      id: planTrabajo?.evaluacion?.id,
      procesoDeGestion: evaluacion1,
      jefeInmediato: evaluacion2,
      empresa: evaluacion3,
      aporteRealizacion: evaluacion4,
      comentarios: comentarios || " ",
    };

    const evaluacionCrear: Evaluacion = {
      procesoDeGestion: evaluacion1,
      jefeInmediato: evaluacion2,
      empresa: evaluacion3,
      aporteRealizacion: evaluacion4,
      comentarios: comentarios || " ",
    };

    if (planTrabajo?.evaluacion != null) {
      evaluacionUpdate(evaluacionUpdat);
    } else {
      evaluacionCreate(evaluacionCrear);
    }
  };
  const handleCerrar = () => {
    Swal.fire({
      title: "¿Estás seguro que deseas salir?",
      text: `Se perderan los cambios, si aun no los haz guardado`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Volver",
    }).then((result) => {
      if (result.isConfirmed) {
        setEvaluacion1(
          planTrabajo?.evaluacion?.procesoDeGestion ||
            Array(eval1.length).fill(Array(columnas.length).fill(false))
        );
        setEvaluacion2(
          planTrabajo?.evaluacion?.jefeInmediato ||
            Array(eval2.length).fill(Array(columnas.length).fill(false))
        );
        setEvaluacion3(
          planTrabajo?.evaluacion?.empresa ||
            Array(eval3.length).fill(Array(columnas.length).fill(false))
        );
        setEvaluacion4(
          planTrabajo?.evaluacion?.aporteRealizacion ||
            Array(eval4.length).fill(Array(columnas.length).fill(false))
        );
        setComentarios(planTrabajo?.evaluacion?.comentarios || "");
        setIsEditing(false);
      }
    });
  };

  useEffect(() => {
    if (planTrabajo?.evaluacion != null) {
      setLoading(true);
      setEvaluacion1(planTrabajo?.evaluacion?.procesoDeGestion);
      setEvaluacion2(planTrabajo?.evaluacion?.jefeInmediato);
      setEvaluacion3(planTrabajo?.evaluacion?.empresa);
      setEvaluacion4(planTrabajo?.evaluacion?.aporteRealizacion);
      setComentarios(planTrabajo?.evaluacion?.comentarios);
      setLoading(false);
    }
  }, [planTrabajo?.evaluacion]);

  if (loading) {
    return (
      <div
        style={{
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div>
      <div className="flex w-full mb-10">
        <div className="text-gray-600 font-bold text-2xl mb-2 mt-2 w-full">
          Evaluacion de Practicas
        </div>
        {rol && (
          <div
            className="flex w-full justify-end"
            style={{ alignItems: "center" }}
          >
            {!isEditing ? (
              <button
                className="bg-green-500 text-white px-2 py-2 rounded-lg flex
                cursor-pointer 
                hover:scale-105 
                active:scale-95 
                transition-transform 
                duration-150 
                ease-in-out"
                onClick={() => setIsEditing(!isEditing)}
              >
                <MdEdit className="mt-1 mr-1" />
                Editar
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-2 py-2 rounded-lg flex
                cursor-pointer 
                hover:scale-105 
                active:scale-95 
                transition-transform 
                duration-150 
                ease-in-out"
                onClick={handleCerrar}
              >
                <VscChromeClose />
              </button>
            )}
          </div>
        )}
      </div>

      <TablaGestion
        titulo="1.	PROCESO DE GESTIÓN ACADÉMICA Y ADMINISTRATIVA DEL PROGRAMA ING-SISTEMAS"
        filas={eval1}
        columnas={columnas}
        selecciones={evaluacion1}
        setSelecciones={setEvaluacion1}
        editable={isEditing}
      />
      <div className="mb-10" />
      <TablaGestion
        titulo="2. JEFE INMEDIATO EN LA EMPRESA (TUTOR)"
        filas={eval2}
        columnas={columnas}
        selecciones={evaluacion2}
        setSelecciones={setEvaluacion2}
        editable={isEditing}
      />
      <div className="mb-10" />
      <TablaGestion
        titulo="3. EMPRESA"
        filas={eval3}
        columnas={columnas}
        selecciones={evaluacion3}
        setSelecciones={setEvaluacion3}
        editable={isEditing}
      />
      <div className="mb-10" />
      <TablaGestion
        titulo="4.	APORTE DE LA REALIZACIÓN DE LA PRÁCTICA AL ESTUDIANTE"
        filas={eval4}
        columnas={columnas}
        selecciones={evaluacion4}
        setSelecciones={setEvaluacion4}
        editable={isEditing}
      />
      <div className="mb-10" />
      <table className="min-w-full border border-gray-400">
        <thead>
          <tr className="bg-slate-200">
            <th colSpan={6} className="justify-center w-full">
              5. COMENTARIOS
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <TextArea
                disabled={!isEditing}
                rows={6}
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {rol && (
        <div
          className="flex w-full justify-end mt-4"
          style={{ alignItems: "center" }}
        >
          {!isEditing ? (
            <></>
          ) : (
            <button
              className="bg-blue-500 text-white px-2 py-2 rounded-lg flex
                cursor-pointer 
                hover:scale-105 
                active:scale-95 
                transition-transform 
                duration-150 
                ease-in-out"
              onClick={save}
            >
              <TfiSave className="mt-1 mr-1" />
              Guardar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EvaluacionEstudiante;
