import { useState, useRef, useEffect } from "react";
import { Label } from "../ui";
import { TextArea } from "./../ui/Input/TextArea";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { TfiSave } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

interface TableRow {
  resultado: string;
  indicador: string;
}

const RRForm = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleNoEdit = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    Swal.fire({
      title: "Información guardada",
      text: "Los datos han sido guardados correctamente.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const [rows, setRows] = useState<TableRow[]>([
    {
      resultado:
        "Calidad del Producto: Producto con mayor estabilidad y fiabilidad.",
      indicador:
        "Número de defectos resueltos con respecto al total identificado.\nCantidad de Requerimientos en estado Terminado.",
    },
    {
      resultado:
        "Eficiencia de Pruebas: Ejecución eficiente de pruebas con menor tiempo y recursos.",
      indicador: "Tiempo promedio requerido para ejecutar pruebas.",
    },
    {
      resultado: "Trazabilidad de Requerimientos",
      indicador:
        "Porcentaje de casos de prueba trazados por requisitos.\nNúmero de requerimientos trabajados durante semana/mes.\nTiempo promedio requerido para implementar cambios post-pruebas.",
    },
    {
      resultado: "Cumplimiento de Entrega",
      indicador: "Cantidad de Requerimientos entregados a tiempo.",
    },
  ]);

  const addRow = () => {
    setRows([...rows, { resultado: "", indicador: "" }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleTextareaInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Resetea la altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura al contenido
  };

  const handleRowChange = (e, index, field) => {
    const newRows = [...rows];
    newRows[index][field] = e.target.value;
    setRows(newRows);
  };

  useEffect(() => {
    rows.forEach((_, index) => {
      const resultadoTextarea = document.getElementById(`resultado-${index}`);
      const indicadorTextarea = document.getElementById(`indicador-${index}`);
      if (resultadoTextarea) {
        resultadoTextarea.style.height = "auto";
        resultadoTextarea.style.height = `${resultadoTextarea.scrollHeight}px`;
      }
      if (indicadorTextarea) {
        indicadorTextarea.style.height = "auto";
        indicadorTextarea.style.height = `${indicadorTextarea.scrollHeight}px`;
      }
    });
  }, [rows]);

  return (
    <div className="mb-10">
      <div className="flex w-full">
        <div className="flex w-full justify-end">
          {!isEditing ? (
            <button
              className="bg-green-500 text-white px-3 py-2 rounded-lg flex
                cursor-pointer 
                hover:scale-105 
                active:scale-95 
                transition-transform 
                duration-150 
                ease-in-out"
              onClick={handleEdit}
            >
              <MdEdit className="mt-1 mr-1" />
              Editar
            </button>
          ) : (
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-lg flex
                cursor-pointer 
                hover:scale-105 
                active:scale-95 
                transition-transform 
                duration-150 
                ease-in-out"
              onClick={handleNoEdit}
            >
              <VscChromeClose />
            </button>
          )}
        </div>
      </div>

      <Label>Requerimiento Técnicos</Label>
      <TextArea rows={5} disabled={!isEditing} />

      <div className="mt-3 mb-4 overflow-auto">
        <table className="min-w-full border border-gray-300 bg-white text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">
                <Label>Resultado/Producto esperado</Label>
              </th>
              <th className="border-b border-gray-300 p-2">
                <Label>Indicador</Label>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">
                  <textarea
                    id={`resultado-${index}`}
                    value={row.resultado}
                    onChange={(e) => handleRowChange(e, index, "resultado")}
                    onInput={handleTextareaInput}
                    disabled={!isEditing}
                    className="w-full border-none bg-transparent outline-none rounded"
                    placeholder="Resultado/Producto Esperado"
                    style={{ resize: "none", overflow: "hidden" }}
                  />
                </td>
                <td className="border-b border-gray-300 p-1">
                  <textarea
                    id={`indicador-${index}`}
                    value={row.indicador}
                    onChange={(e) => handleRowChange(e, index, "indicador")}
                    disabled={!isEditing}
                    className="w-full border-none bg-transparent outline-none rounded"
                    placeholder="Indicador"
                    style={{
                      resize: "vertical",
                      overflowY: "auto",
                      height: "100px",
                    }}
                  />
                </td>
                {isEditing && (
                  <td className="border border-gray-300  text-center">
                    <button
                      onClick={() => handleDeleteRow(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {isEditing && (
          <button
            onClick={addRow}
            className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 flex"
            style={{ alignItems: "center", color: "white" }}
          >
            <IoMdAdd style={{ width: "18px", height: "18px" }} />
            Agregar Fila
          </button>
        )}
      </div>

      {isEditing && (
        <div className="flex w-full justify-end mt-4 mb-5">
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded-lg flex
             cursor-pointer 
             hover:scale-105 
             active:scale-95 
             transition-transform 
             duration-150 
             ease-in-out"
            onClick={handleSave}
          >
            <TfiSave className="mt-1 mr-1" />
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default RRForm;
