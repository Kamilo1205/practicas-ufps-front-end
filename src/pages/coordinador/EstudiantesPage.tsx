import { useEffect, useState } from "react";
import { fetchGetEstudiantes } from "../../api/estudiante.api";
import { Avatar, Button, Pagination } from "../../components/ui";
import { EmptyStateMessage } from "../../components/estudiantes/EmptyStateMessage";
//import { useLocation, useNavigate } from "react-router-dom";
import { Estudiante } from "../../interfaces/estudiante.interface";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { TabComponent } from "../../components/ui/Tab/TabComponent";

export const EstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0); // Número total de ítems
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Suponiendo que el backend maneja 10 ítems por página
  //const navigate = useNavigate();
  //const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetEstudiantes();
      setEstudiantes(response);
      console.log(response);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-10">
        <div className="text-gray-600 font-bold text-2xl">Estudiantes</div>
      </div>
      <div className="overflow-x-auto">
        <ul role="list" className="divide-y divide-gray-100">
          <li className="flex justify-between gap-x-6 py-2">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">Grupo A</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <Button >
                <HiOutlineUserPlus className="size-5 mr-2" />
                Agregar estudiantes
              </Button>
            </div>
          </li>
          <li className="flex justify-between gap-x-6 py-2">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">Grupo B</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <Button >
                <HiOutlineUserPlus className="size-5 mr-2" />
                Agregar estudiantes
              </Button>
            </div>
          </li>
          <li className="flex justify-between gap-x-6 py-2">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">Grupo C</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <Button >
                <HiOutlineUserPlus className="size-5 mr-2" />
                Agregar estudiantes
              </Button>
            </div>
          </li>
          </ul>
      </div> 
      <div className="mt-5">
        <TabComponent />

      </div>
      {estudiantes.length == 0 ? (
        <EmptyStateMessage />
      ) : (
          <div>
            <TabComponent/>
            <div className="overflow-x-auto">
              
            <table className="min-w-full border-gray-300">
              <thead>
                <tr>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Nombre
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Semestre
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Codigo
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Dirección
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Telefono
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Fecha creación
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="border-gray-300 divide-y border-y">
                {estudiantes.map((estudiante) => (
                  <tr key={estudiante.id} className="cursor-pointer">
                    <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                      <div className="flex items-center">
                        <div className="shrink-0 w-11 h-11">
                          <Avatar url={estudiante?.usuario?.imagenUrl} />
                        </div>
                        <div className="ml-4">
                          <div className="text-gray-900 font-medium">
                            {
                              `${estudiante.primerNombre } ${estudiante.segundoNombre} ${estudiante.primerApellido} ${estudiante.segundoApellido}` 
                              || "Nombre aun no registrado"
                            }
                          </div>
                          <div className="text-gray-500 mt-1">
                            {estudiante?.usuario?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm whitespace-nowrap capitalize text-gray-500">
                        {estudiante.semestreMatriculado}
                    </td>
                    <td className="text-sm whitespace-nowrap capitalize text-gray-500">
                      <div>{estudiante.codigo}</div>
                    </td>
                    <td className="text-sm whitespace-nowrap capitalize text-gray-500">
                      <div>{estudiante.direccion}</div>
                      <div>
                        {estudiante.departamentoResidencia},{" "}
                        {estudiante.municipioResidencia }
                      </div>
                    </td>
                    <td className="text-sm whitespace-nowrap capitalize text-gray-500">
                      {estudiante.telefono}
                    </td>
                    <td className="text-sm whitespace-nowrap capitalize text-gray-500">
                      {new Date(estudiante.fechaCreacion).toLocaleDateString()}
                    </td>
                    <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                      {estudiante?.usuario?.estaActivo ? (
                        <span className="text-green-700 font-medium text-xs py-1 px-2 ring-1 ring-green-600/20 bg-green-100 rounded-md items-center inline-flex border-green-600 ring-inset">
                          Activo
                        </span>
                      ) : (
                        <span className="text-red-700 font-medium text-xs py-1 px-2 ring-1 ring-red-600/20 bg-red-100 rounded-md items-center inline-flex border-red-600 ring-inset">
                          Inactivo
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            paginate={() => {}}
          />
        </div>
      )}
    </>
  );
};
