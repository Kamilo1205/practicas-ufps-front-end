import React, { FC, useState } from "react";
import axios from "axios";
import { BiArrowToRight, BiCheck } from "react-icons/bi";

interface UploadedFile {
  name: string;
  url: string;
}
interface props {
  rol?: boolean;
}
const FileUpload: FC<props> = ({rol = false}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedFileData: UploadedFile = response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-1bg-white rounded-lg w-full">
      {rol ? (
        <>
          <h2 className="text-2xl font-semibold "></h2>
          <div className="flex justify-between">
            <div className="w-1/2 pr-2">
              <input
                type="file"
                accept=".jpg,.png,.mpp,.pdf"
                onChange={handleFileChange}
                className="mb-4"
              />
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Subir
              </button>
            </div>
            <div className="w-1/2 pl-2 flex items-center justify-center">
              {uploadedFile && (
                <div>
                  <a
                    href={uploadedFile.url}
                    download={uploadedFile.name}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Download {uploadedFile.name}
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>
          <span className="text-blue-400 flex">
            Descargar Diagrama de Gantt
            <span className="self-center">
              <BiArrowToRight />
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
