import { FC } from "react";

const LoadingSpinner: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin rounded-full border-8 border-blue-200 border-t-8 border-t-blue-600"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4">
          <span className="text-blue-600 font-bold p-4">Cargando...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
