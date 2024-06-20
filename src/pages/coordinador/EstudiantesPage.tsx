import { useEffect, useState } from "react";
import { fetchEstudiantes as fetchGetEstudiantes } from "../../api/estudiante.api";
import { Avatar, Button,  } from "../../components/ui";
import { EmptyStateMessage } from "../../components/estudiantes/EmptyStateMessage";
//import { useLocation, useNavigate } from "react-router-dom";
import { Estudiante } from "../../interfaces/estudiante.interface";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { TabComponent } from "../../components/ui/Tab/TabComponent";
import { DialogComponent } from "../../components/ui/Dialog/DialogComponent";
import { AgregarEstudianteForm } from "../../components/estudiantes/AgregarEstudianteForm";
import { TablaPaginadaComponent } from "../../components/ui/Table/TablaPaginadaComponent";
import { EstudiantePerfilComponent } from "../../components/usuarios/perfil/EstudiantePerfilComponent";
import { BiArrowToRight, BiCheck } from "react-icons/bi";
import { IoAlertCircle } from "react-icons/io5";

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
  const [estudiantes, setEstudiantes] = useState<{ estudiantes: Estudiante[], total: number }>({
    estudiantes: [],
    total: 0,
  
  });
  console.log(estudiantes)
  const [totalItems, setTotalItems] = useState<number>(0); // Número total de ítems
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Suponiendo que el backend maneja 10 ítems por página
  const [agregarEstudiante, setAgregarEstudiante] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0);
  const [mostrarPerfil, setMostrarPerfil] = useState<boolean>(false);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<Estudiante | null>(null);
  const [filtro, setFiltro] = useState<string>("");
  //const navigate = useNavigate();
  //const location = useLocation();

  useEffect(() => {
    setCurrentPage(1);
  }, [filtro]);

  useEffect(() => {
    const fetchData = async () => {
      //TODO: Ajustar cuando se hagan los cambios en el backend.
      //TODO: Implementar peti para que solo traiga inactivos.
      //const {data,total} = await fetchGetEstudiantes(currentPage,itemsPerPage,Tabs[tab].grupo, filtro);
      const data = await fetchGetEstudiantes(currentPage, itemsPerPage, Tabs[tab].grupo ? Tabs[tab].grupo : '', filtro);
      
      setEstudiantes({
        estudiantes: data || [],
        total: 100
      
      });
      //console.log(data);
    };
    fetchData();
  }, [tab,filtro,currentPage,itemsPerPage]);

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
      <DialogComponent
        isOpen={mostrarPerfil}
        onClose={() => setMostrarPerfil(false)}
        content={
          estudianteSeleccionado &&
          <EstudiantePerfilComponent
            estudiante={estudianteSeleccionado}
          />|| <div>No hay información del estudiante seleccionado.</div>
        }
        title=""
        size="2xl"
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
      {estudiantes.estudiantes.length == 0 ? (
        <EmptyStateMessage
          setOpen={setAgregarEstudiante}
        />
      ) : (
          <div>
            
            <>
              <TablaPaginadaComponent
                filtro={filtro}
                setFiltro={setFiltro}
                encabezados={["Nombre", "Codigo", "Plan de trabajo", "Primer informe", "Segundo informe", "Estado"]}
                filas={
                  estudiantes.estudiantes.map((estudiante) => [
                    <div className="flex items-center">
                      <div className="shrink-0 w-11 h-11">
                        <Avatar url={estudiante?.usuario?.imagenUrl} />
                      </div>
                      <div className="ml-4 cursor-pointer"
                        onClick={() => {
                          setEstudianteSeleccionado(estudiante)

                        setMostrarPerfil(true)
                      }}>
                        
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
                    estudiante.codigo,
                    <div className="flex justify-center cursor-pointer w-full pr-6">
                      {
                        //TODO: Diferenciar cuando el plan está completo o no.
                        //TODO: Implementar vizualización del plan de trabajo.
                      }
                      <div>
                        <BiCheck className="text-green-500 w-5 h-5" />
                      </div>
                      <span className="text-blue-400 flex">Ver <span className="self-center"><BiArrowToRight/></span></span>
                    </div>,
                    <div className="flex justify-center pr-6">
                      <IoAlertCircle className="text-yellow-500 w-5 h-5" />
                      <span>Pendiente</span>
                    </div>,
                    <div className="flex justify-center pr-6">
                      <IoAlertCircle className="text-yellow-500 w-5 h-5" />
                      <span>Pendiente</span>
                    </div>,
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
