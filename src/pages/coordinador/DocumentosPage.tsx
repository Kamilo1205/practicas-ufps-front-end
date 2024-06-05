import { FcFolder } from "react-icons/fc";

export const DocumentosPage = () => {
  return (
    <>
      <div className="mb-10">
        <div className="text-gray-600 font-bold text-2xl">Documentos</div>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col select-none text-sm text-gray-900 font-medium items-center justify-center size-40 rounded-md cursor-pointer hover:bg-gray-50">
          <FcFolder className="size-7/12" />
          Empresas
        </div>
        <div className="flex flex-col select-none text-sm text-gray-900 font-medium items-center justify-center size-40 rounded-md cursor-pointer hover:bg-gray-50">
          <FcFolder className="size-7/12" />
          Estudiantes
        </div>
      </div>
    </>
  );
};
