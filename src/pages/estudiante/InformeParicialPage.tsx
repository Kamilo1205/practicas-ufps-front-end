import { useState } from "react";
import { ActivityManager } from "../../components/PlanDeTrabajo/Actividad/ActivityManager";
import { TextArea } from "../../components/ui";
import { Label } from "./../../components/ui/Label/Label";
import { RiEyeCloseFill } from "react-icons/ri";
import { BiShowAlt } from "react-icons/bi";

interface InfoProps {
  rol:boolean;
}
const InformeParicialPage = () => {
  const [OpenView, setOpenView] = useState(false);
  return (
    <>
      <div className="border rounded p-3">
        <div className="text-gray-600 font-bold text-2xl mb-2 mt-2 flex justify-center">
          Desarrollo de la Práctica
        </div>
        <div className="border" />
        <ActivityManager rol={false} informeP={true} />
        <div className="border" />
        <div className="mt-2 p-2">
          <Label>Adaptación</Label>
          <TextArea
            rows={5}
            placeholder={
              "El estudiante debe indicar cuales fueron los patrones de comportamiento que tuvo que ajustar para adaptarse a las normas imperantes en la empresa y que dificultad se le presento al momento de realizar ciertos cambios"
            }
            style={{ marginBottom: "20px" }}
          />

          <Label>Tolerancia al trabajo bajo presión</Label>
          <TextArea
            rows={5}
            placeholder={
              "El estudiante debe indicar cuales fueron los patrones de comportamiento que tuvo que ajustar para adaptarse a las normas imperantes en la empresa y que dificultad se le presento al momento de realizar ciertos cambios"
            }
            style={{ marginBottom: "15px" }}
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
                borderRadius: "10px",
                background: OpenView ? "rgb(67,67,67)" : "gray",
              }}
              onClick={() => setOpenView(!OpenView)}
            >
              {OpenView ? (
                <RiEyeCloseFill style={{ width: "20px", height: "20px" }} />
              ) : (
                <BiShowAlt style={{ width: "20px", height: "20px" }} />
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
                <TextArea rows={4} />
              </td>
            </tr>
            <tr className="bg-slate-100">
              <th className="border border-gray-300 p-2">
                <Label>Fueron asumidas(Descripción de cada una de ellas)</Label>
              </th>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <TextArea rows={4} />
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
                <TextArea rows={4} />
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
          />
        </div>
      </div>
    </>
  );
};

export default InformeParicialPage;
