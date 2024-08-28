import React, { FC, useState } from "react";
import { BiArrowToRight, BiCheck } from "react-icons/bi";
import usePlantrabajo from "../../hooks/usePlanTrabajo";
import Swal from "sweetalert2";
import { FaCloudDownloadAlt, FaCloudUploadAlt } from "react-icons/fa";
import LoadingMini from "../ui/Pagination/LoadingMini";

interface UploadedFile {
  name: string;
  url?: string;
}
interface props {
  rol?: boolean;
  urls?: string;
}
const FileUpload: FC<props> = ({ rol = false, urls }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const { updateGranttPlan } = usePlantrabajo();
  const [isloading, setIsloading] = useState<boolean>(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file){
      Swal.fire({
        title: "Ha ocurrido un error",
        text: "Selecciona un archivo",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;}

    try {
      setIsloading(true);
      updateGranttPlan(file).then((response) => {
        if (response == "false") {
          Swal.fire({
            title: "Ha ocurrido un error",
            text: "No se guardo la Información",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        } else {
          setUploadedFile({
            name: file.name,
            url: response?.diagramaGanttUrl,
          });
          Swal.fire({
            title: "Información guardada",
            text: "Los datos han sido guardados correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        }
        setIsloading(false);
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsloading(false);
    }
  };

  return (
    <div className=" mx-auto my-1bg-white rounded-lg w-full">
      {rol ? (
        <>
          <div className="flex flex-col md:flex-row justify-between md:space-x-6">
            <div className="w-full md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Selecciona un archivo
              </label>
              <input
                type="file"
                accept=".jpg,.png,.mpp,.pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500 truncate">
                {uploadedFile?.name || "No se ha seleccionado ningún archivo"}
              </p>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <button
                onClick={handleUpload}
                className=" flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-3"
              >
                <FaCloudUploadAlt className="h-5 w-5 mr-2" />
                Subir
                <div className="ml-2">
                  {isloading ? <LoadingMini /> : <></>}
                </div>
              </button>
              {urls || uploadedFile?.url ? (
                <div>
                  <a
                    href={`http://localhost:3000/google-drive/${
                      urls || uploadedFile?.url
                    }`}
                    download
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    <FaCloudDownloadAlt className="h-5 w-5 mr-2" />
                    Decargar
                  </a>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {urls ? (
            <div>
              <a
                href={"http://localhost:3000/google-drive/" + urls}
                className="text-blue-400 flex hover:underline"
              >
                Descargar Diagrama de Gantt
                <span className="self-center ml-2">
                  <BiArrowToRight />
                </span>
              </a>
            </div>
          ) : (
            <>No se encontró el archivo del diagrama de Gantt.</>
          )}
        </>
      )}
    </div>
  );
};

export default FileUpload;
