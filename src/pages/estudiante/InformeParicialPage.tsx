import { FC, useEffect, useState } from "react";
import { ActivityManager } from "../../components/PlanDeTrabajo/Actividad/ActivityManager";
import { TextArea } from "../../components/ui";
import { Label } from "./../../components/ui/Label/Label";
import { TiInfoLarge } from "react-icons/ti";
import { TiInfoLargeOutline } from "react-icons/ti";
import { TfiSave } from "react-icons/tfi";
import Swal from "sweetalert2";
import { PlanDeTrabajo } from "../../interfaces/plantrabajo.interface";
import usePlantrabajo from "../../hooks/usePlanTrabajo";
import { useAuth } from "../../contexts";
import Checkbox from "../../components/ui/Input/Checkbox";
import LoadingSpinner from "../../components/ui/Pagination/LoadingSpiner";
import FileUploadInforme from "../../components/PlanDeTrabajo/FileUploadInforme";
import { primerInforme } from "../../interfaces/primerInforme";

interface InfoProps {
  rol: boolean;
  plantrabajo: PlanDeTrabajo;
}

const InformeParicialPage: FC<InfoProps> = ({ rol, plantrabajo }) => {
  const [OpenView, setOpenView] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setID] = useState("");
  const [adap, setAdap] = useState("");
  const [tol, setTol] = useState("");
  const [nueR, setNuer] = useState("");
  const [fuer, setFuer] = useState("");
  const [comp, setComp] = useState("");
  const [concl, setConcl] = useState("");
  const {
    createPrimerInforme,
    updateInformePrimer,
    aprobarInformeEmpresa,
    aprobarInformeTutor,
  } = usePlantrabajo();

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
    aprobarInformeTutor(plantrabajo?.primerInforme?.id).then((response) => {
      if (response === "ok") {
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
    aprobarInformeEmpresa(plantrabajo?.primerInforme?.id).then((response) => {
      if (response === "ok") {
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

  const saveDoc = () => {
    if (!plantrabajo.primerInforme) {
      const informe: primerInforme = {
        adaptacion: adap || " ",
        compromisoEficiencia: comp || " ",
        conclusion: concl || " ",
        fueronAsumidas: fuer || " ",
        tolerancia: tol || " ",
        nuevasResponsabilidades: nueR || " ",
      };

      createPrimerInforme(informe).then((response) => {
        if (response.ok === "ok") {
          Swal.fire({
            title: "Información guardada",
            text: "Los datos han sido guardados correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          if (response.data.id) setID(response.data.id);
        } else {
          Swal.fire({
            title: "Ha ocurrido un error",
            text: "No se guardo la Información",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      });
    } else {
      const informe: primerInforme = {
        id: id,
        adaptacion: adap || " ",
        compromisoEficiencia: comp || " ",
        conclusion: concl || " ",
        fueronAsumidas: fuer || " ",
        tolerancia: tol || " ",
        nuevasResponsabilidades: nueR || " ",
      };

      updateInformePrimer(id, informe).then((response) => {
        if (response === "ok") {
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
    }
  };
  useEffect(() => {
    const primerInforme = plantrabajo?.primerInforme;
    if (plantrabajo === undefined) {
      setLoading(true);
    } else if (primerInforme != null) {
      setLoading(true);
      setID(primerInforme.id);
      setAdap(primerInforme.adaptacion);
      setTol(primerInforme.tolerancia);
      setNuer(primerInforme.nuevasResponsabilidades);
      setComp(primerInforme.compromisoEficiencia);
      setFuer(primerInforme.fueronAsumidas);
      setConcl(primerInforme.conclusion);

      // Verificar la aprobación del tutor empresarial
      if (primerInforme.tutorEmpresarialAprobo != null) {
        setAprobacionCoordinador(true);
      }

      // Verificar la aprobación del tutor institucional
      if (primerInforme.tutorInstitucionalAprobo != null) {
        setAprobacionTutor(true);
      }
      setLoading(false);
    } else setLoading(false);
  }, [plantrabajo?.primerInforme]);
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
    <>
      <div className="border rounded p-3">
        <div className="text-gray-600 font-bold text-2xl mb-2 mt-2 flex justify-center">
          Desarrollo de la Práctica
        </div>
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
        <div className="border" />
        <ActivityManager
          rol={rol}
          informeP={true}
          actividades={plantrabajo?.seccionActividades?.actividades}
        />
        <div className="border" />
        <div className="mt-2 p-2">
          <Label>Adaptación</Label>
          <TextArea
            rows={5}
            placeholder={
              "El estudiante debe indicar cuales fueron los patrones de comportamiento que tuvo que ajustar para adaptarse a las normas imperantes en la empresa y que dificultad se le presento al momento de realizar ciertos cambios"
            }
            style={{ marginBottom: "20px" }}
            value={adap}
            onChange={(e) => setAdap(e.target.value)}
            disabled={!rol}
          />

          <Label>Tolerancia al trabajo bajo presión</Label>
          <TextArea
            rows={5}
            placeholder={
              "El estudiante debe indicar cuales fueron los patrones de comportamiento que tuvo que ajustar para adaptarse a las normas imperantes en la empresa y que dificultad se le presento al momento de realizar ciertos cambios"
            }
            style={{ marginBottom: "15px" }}
            value={tol}
            onChange={(e) => setTol(e.target.value)}
            disabled={!rol}
          />
        </div>

        <div className="border mb-4" />
        <div className="w-full flex" style={{ alignItems: "center" }}>
          <div className="w-full">
            <Label> Capacidad para asumir nuevas responsabilidades</Label>
          </div>
          <div className="flex justify-end">
            <button
              className=" text-white px-2 py-2 cursor-pointer 
             hover:scale-105 
             active:scale-95 
             transition-transform 
             duration-150 
             ease-in-out"
              style={{
                borderRadius: "50px",
                background: OpenView ? "rgb(0,98,173)" : "rgb(0,144,255)",
              }}
              onClick={() => setOpenView(!OpenView)}
            >
              {OpenView ? (
                <TiInfoLargeOutline style={{ width: "20px", height: "20px" }} />
              ) : (
                <TiInfoLarge style={{ width: "20px", height: "20px" }} />
              )}
            </button>
          </div>
        </div>
        <div className="mt-3 mb-4 overflow-auto">
          {OpenView ? (
            <div
              className="text-gray-400 font-light mb-5 mt-2 flex justify-center"
              style={{ fontStyle: "italic" }}
            >
              El estudiante debe describir la manera en la cual tuvo nuevas
              responsabilidades y la forma como fueron asumidas, indicando su
              nivel de interés, compromiso y eficiencia para el desarrollo de
              nuevas actividades desarrolladas.
            </div>
          ) : (
            ""
          )}
          <table className="min-w-full border border-gray-300 bg-white text-left">
            <tr className="bg-slate-100">
              <th className="border border-gray-300 p-2">
                <Label>
                  Nuevas responsabilidades (Descripción de cada una de ellas)
                </Label>
              </th>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <TextArea
                  rows={4}
                  value={nueR}
                  onChange={(e) => setNuer(e.target.value)}
                  disabled={!rol}
                />
              </td>
            </tr>
            <tr className="bg-slate-100">
              <th className="border border-gray-300 p-2">
                <Label>Fueron asumidas(Descripción de cada una de ellas)</Label>
              </th>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <TextArea
                  rows={4}
                  value={fuer}
                  onChange={(e) => setFuer(e.target.value)}
                  disabled={!rol}
                />
              </td>
            </tr>
            <tr className="bg-slate-100">
              <th className="border border-gray-300 p-2">
                <Label>
                  Compromiso y eficiencia para el desarrollo de nuevas
                  actividades desrrolladas
                </Label>
              </th>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <TextArea
                  rows={4}
                  value={comp}
                  onChange={(e) => setComp(e.target.value)}
                  disabled={!rol}
                />
              </td>
            </tr>
          </table>
        </div>
        <div className="border mt-5 mb-3" />
        <div className="mt-5 mb-4">
          <Label>Conclusión</Label>
          <TextArea
            rows={5}
            placeholder="La conclusión es la parte o sección final de un trabajo, en la cual se hace un breve resumen de los puntos principales abordados en el trabajo, se exponen los resultados y se destacan los hallazgos más importantes, aportes obtenidos o logros alcanzados a partir del proceso de su labor. Así mismo, presentar indicaciones concretas de la manera en la que se debe proceder según los resultados obtenidos, con el fin de darle continuidad a los mismos."
            value={concl}
            onChange={(e) => setConcl(e.target.value)}
            disabled={!rol}
          />
        </div>
        <div className="w-full flex ">
          <div className="w-full flex justify-end mt-2">
            {!rol ? (
              <></>
            ) : (
              <button
                className="bg-blue-500 p-2 text-white rounded flex  cursor-pointer 
             hover:scale-105F 
             active:scale-95 
             transition-transform 
             duration-150 
             ease-in-out ml-2"
                onClick={saveDoc}
              >
                <TfiSave className="mt-1 mr-1" />
                Guardar
              </button>
            )}
          </div>
        </div>
        <div className="border mt-5 mb-3" />
        {plantrabajo?.primerInforme?.id && (
          <>
            <Label>Diagrama de Grannt</Label>
            <div className="mt-5 mb-3" />
            <div className="w-full flex">
              <FileUploadInforme
                rol={rol}
                id={plantrabajo?.primerInforme?.id}
                urls={plantrabajo.primerInforme?.diagramaGanttUrl}
              />
            </div>
            <div className="border mt-5 mb-3" />
          </>
        )}
      </div>
    </>
  );
};

export default InformeParicialPage;
