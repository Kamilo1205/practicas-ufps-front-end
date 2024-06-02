import React, { InputHTMLAttributes, forwardRef, useState } from 'react';

interface InputProps {
  onFileChange: (file: FileList) => void;
  id: string;
}
  
export const FileUpload: React.FC<InputProps> = ({ onFileChange, id }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith('application/pdf')) {
      setError('El archivo tiene que ser un pdf'); 
      return false;
    }
    if (file.size > 10 * 1024 * 1024) { // 10 MB en bytes
      setError('El pdf debe tener un tamaño menor a 10 MB');
      return false;
    }
    setError(null);
    return true;
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const isValido = validateFile(files[0]);
      if (isValido) {
        onFileChange(files);
        setFile(files[0]);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const isValido = validateFile(files[0]);
      if (isValido) {
        onFileChange(files);
        setFile(files[0]);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div 
        className="mt-2 cursor-pointer flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="text-center">
          <div className="mt-4 flex flex-col sm:flex-row text-sm leading-6 text-gray-600">
            <label
              htmlFor={id}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Sube un archivo</span>
              <input
                id={id}
                type="file"
                className="sr-only"
                onChange={handleFileChange} 
              />
            </label>
            <p className="pl-1">o arrastra y suelta aquí.</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">PDF hasta 10MB</p>
        </div>
      </div>

      {
        file && (
          <div className="mt-2 p-3 text-sm bg-gray-200 text-gray-800 rounded-md">
             {
              file.name
             } 
          </div>
        )
      }
      {
        error && <p className="text-red-500 text-sm mt-1 px-1">{ error }</p>
      }
    </div>
  );
};
