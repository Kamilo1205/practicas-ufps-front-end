import { useEffect, useState } from "react";
import { fetchGetEstudiantes } from "../../api/estudiante.api";
import { Avatar, Button, Pagination } from "../../components/ui";
import { EmptyStateMessage } from "../../components/estudiantes/EmptyStateMessage";
//import { useLocation, useNavigate } from "react-router-dom";
import { Estudiante } from "../../interfaces/estudiante.interface";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { TabComponent } from "../../components/ui/Tab/TabComponent";
import { DialogComponent } from "../../components/ui/Dialog/DialogComponent";
import { AgregarEstudianteForm } from "../../components/estudiantes/AgregarEstudianteForm";
import { TablaPaginadaComponent } from "../../components/ui/Table/TablaPaginadaComponent";

export const grupos = [
  {
    id: 1,
    name: "Grupo A",
  },
  {
    id: 2,
    name: "Grupo B",
  },
  {
    id: 3,
    name: "Grupo C",
  },
  
]

const Tabs = [
  {
    id: 0,
    name: "Activos",
    grupo : ""
  },
  {
    id: 1,
    name: "Grupo A",
    grupo: "Grupo A"
  },
  {
    id: 2,
    name: "Grupo B",
    grupo : "Grupo B"
  },
  {
    id: 3,
    name: "Grupo C",
    grupo : "Grupo C"
  },
  {
    id: 4,
    name: "Inactivos",
  },

]

export const EstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0); // Número total de ítems
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Suponiendo que el backend maneja 10 ítems por página
  const [agregarEstudiante, setAgregarEstudiante] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0); 

  //const navigate = useNavigate();
  //const location = useLocation();

  

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetEstudiantes({grupo:Tabs[tab].grupo});
      setEstudiantes(response);
      console.log(response);
    };
    fetchData();
  }, [tab]);

  return (
    <>
      <div className="mb-10">
        <div className="text-gray-600 font-bold text-2xl">Estudiantes</div>
      </div>
      <DialogComponent
        isOpen={agregarEstudiante}
        onClose={() => setAgregarEstudiante(false)}
        content={
          <AgregarEstudianteForm onClose={()=>setAgregarEstudiante(false)} />
        }
        title="Agregar estudiantes"
      />
      <div className="overflow-x-auto mb-4">
        <ul role="list" className="divide-y divide-gray-100">
          <li className="flex justify-between gap-x-6 py-2">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <Button onClick={()=>setAgregarEstudiante(true)}>
                <HiOutlineUserPlus className="size-5 mr-2" />
                Agregar estudiantes
              </Button>
            </div>
          </li>
          
          </ul>
      </div> 
      <TabComponent
        tabListI={Tabs}
        activeTab={tab}
        setTab={setTab}
      />
      {estudiantes.length == 0 ? (
        <EmptyStateMessage />
      ) : (
          <div>
            
            <>
              <TablaPaginadaComponent
                encabezados={["Nombre", "Semestre", "Codigo", "Dirección", "Telefono", "Grupo", "Estado"]}
                filas={
                  estudiantes.map((estudiante) => [
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
                    </div>,
                    estudiante.semestreMatriculado,
                    estudiante.codigo,
                    <div>
                      <div>{estudiante.direccion}</div>
                      <div>
                        {estudiante.ciudadResidencia.nombre},{" "}
                        {estudiante.ciudadResidencia.departamento.nombre}
                      </div>
                    </div>,
                    estudiante.telefono,
                    estudiante.grupo,
                    estudiante?.usuario?.estaActivo ? (
                      <span className="text-green-700 font-medium text-xs py-1 px-2 ring-1 ring-green-600/20 bg-green-100 rounded-md items-center inline-flex border-green-600 ring-inset">
                        Activo
                      </span>
                    ) : (
                      <span className="text-red-700 font-medium text-xs py-1 px-2 ring-1 ring-red-600/20 bg-red-100 rounded-md items-center inline-flex border-red-600 ring-inset">
                        Inactivo
                      </span>
                    ),
                  ])
                }
                totalItems = {totalItems}
                currentPage = {currentPage}
                itemsPerPage = {itemsPerPage}
              />
            </>
           
        </div>
      )}
    </>
  );
};


//new Date(estudiante.fechaCreacion).toLocaleDateString()


/**
 *  <div className="overflow-x-auto">
              
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
                    Grupo
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
                    <td className="text-sm whitespace-nowrap capitalize text-gray-500 px-2">
                      {estudiante.grupo}
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
 */