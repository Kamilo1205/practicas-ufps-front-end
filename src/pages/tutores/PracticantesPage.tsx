import { useEffect, useState } from "react";
import { EmptyStateMessage } from "../../components/estudiantes";
import { TablaPaginadaComponent } from "../../components/ui/Table/TablaPaginadaComponent";
import useEmpresas from "../../hooks/useEmpresas";
import { IoAlertCircle } from "react-icons/io5";
import { BiArrowToRight, BiCheck } from "react-icons/bi";
import PlanDeTrabajoVista from "../../components/PlanDeTrabajo/Coordinador-Empresa/PlanDeTrabajoVista";
import InformeParcialVista from "../../components/VistasCoorDTutor/InformeParcialVista";
import InformeFinalVista from "../../components/VistasCoorDTutor/InformeFinalVista";
import { Avatar } from "../../components/ui";
import { EstudianteI } from "../../interfaces/responses.interface";
import Swal from "sweetalert2";
import { primerInforme } from "./../../interfaces/primerInforme";

export const PracticantesPage = () => {
  const { getPracticantesAsignadosATutor } = useEmpresas();
  const [practicantes, setPracticantes] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0); // Número total de ítems
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Suponiendo que el backend maneja 10 ítems por página
  const [filtro, setFiltro] = useState<string>("");

  const [estudianteSeleccionado, setEstudianteSeleccionado] =
    useState<EstudianteI | null>(null);
  const [estudiantesCargados, setEstudiantesCargados] =
    useState<boolean>(false);
  const [openPlan, setOpenPlan] = useState(false);
  const [openInfoP, setOpenInfoP] = useState(false);
  const [openInfoF, setOpenInfoF] = useState(false);

  console.log(practicantes);
  console.log(
    practicantes[0]?.estudiante?.planesDeTrabajo.find((a) => a.semestre.actual)
  );
  useEffect(() => {
    Swal.fire({
      title: "Cargando practicantes",
      text: "Por favor espere...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    getPracticantesAsignadosATutor()
      .then((res) => {
        console.log(res);
        Swal.close();
        setPracticantes(res || []);
        setTotalItems(res.length || 0);
      })
      .catch((err) => {
        Swal.close();
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="mb-10">
        <div className="text-gray-600 font-bold text-2xl">
          Practicantes asignados
        </div>
      </div>
      {practicantes && practicantes?.length === 0 ? (
        <EmptyStateMessage
          message="No hay practicantes asignados"
          submesage=""
          buttonText=""
          showButton={false}
          setOpen={() => {}}
        />
      ) : (
        <>
          <TablaPaginadaComponent
            filtrar
            setCurrentPage={setCurrentPage}
            filtro={filtro}
            setFiltro={setFiltro}
            encabezados={[
              "Codigo",
              "Nombre",
              "Plan de trabajo",
              "Primer informe",
              "Segundo informe",
              "Estado",
            ]}
            filas={practicantes.map((estudiante) => [
              estudiante?.estudiante?.codigo,
              <div className="flex items-center">
                <div className="shrink-0 w-11 h-11">
                  <Avatar url={estudiante?.estudiante?.imagenUrl} />
                </div>
                <div className="ml-4 cursor-pointer">
                  <div className="text-gray-900 font-medium">
                    {`${estudiante?.estudiante?.primerNombre} ${estudiante?.estudiante?.segundoNombre} ${estudiante?.estudiante?.primerApellido} ` ||
                      "Nombre aun no registrado"}
                  </div>
                  <div className="text-gray-500 mt-1">
                    {estudiante?.estudiante?.usuario?.email}
                  </div>
                </div>
              </div>,

              <div className="flex justify-center cursor-pointer w-full pr-6">
                {
                  //TODO: Diferenciar cuando el plan está completo o no.
                  //TODO: Implementar vizualización del plan de trabajo.
                  !estudiante?.estudiante?.planesDeTrabajo.find(
                    (a) => a.semestre.actual
                  ) ? (
                    <div className="flex justify-center pr-6">
                      <IoAlertCircle className="text-yellow-500 w-5 h-5" />
                      <span>Pendiente</span>
                    </div>
                  ) : (
                    <div onClick={() => setOpenPlan(!openPlan)}>
                      <BiCheck className="text-green-500 w-5 h-5" />
                      <span className="text-blue-400 flex">
                        Ver
                        <span className="self-center">
                          <BiArrowToRight />
                        </span>
                        {openPlan && (
                          <PlanDeTrabajoVista
                            rol="coordinador"
                            initialOpen={true}
                            estudiante={estudiante.estudiante}
                            plantrabajo2={estudiante?.estudiante?.planesDeTrabajo.find(
                              (a) => a.semestre.actual
                            )}
                            isTutor={true}
                          />
                        )}
                      </span>
                    </div>
                  )
                }
              </div>,
              <div className="flex justify-center cursor-pointer w-full pr-6">
                {!estudiante?.estudiante?.planesDeTrabajo.find(
                  (a) => a.semestre.actual
                )?.primerInforme ? (
                  <div className="flex justify-center pr-6">
                    <IoAlertCircle className="text-yellow-500 w-5 h-5" />
                    <span>Pendiente</span>
                  </div>
                ) : (
                  <div onClick={() => setOpenInfoP(!openInfoP)}>
                    <BiCheck className="text-green-500 w-5 h-5" />
                    <span className="text-blue-400 flex">
                      Ver
                      <span className="self-center">
                        <BiArrowToRight />
                      </span>
                      {openInfoP && (
                        <InformeParcialVista
                          rol="coordinador"
                          initialOpen={true}
                          estudiante={estudiante?.estudiante}
                          plantrabajo2={estudiante?.estudiante?.planesDeTrabajo?.find(
                            (a) => a.semestre.actual
                          )}
                          isTutor={true}
                        />
                      )}
                    </span>
                  </div>
                )}
              </div>,
              <div className="flex justify-center cursor-pointer w-full pr-6">
                {!estudiante?.estudiante?.planesDeTrabajo.find(
                  (a) => a.semestre.actual
                )?.informeFinal ? (
                  <div className="flex justify-center pr-6">
                    <IoAlertCircle className="text-yellow-500 w-5 h-5" />
                    <span>Pendiente</span>
                  </div>
                ) : (
                  <div onClick={() => setOpenInfoF(!openInfoF)}>
                    <BiCheck className="text-green-500 w-5 h-5" />
                    <span className="text-blue-400 flex">
                      Ver
                      <span className="self-center">
                        <BiArrowToRight />
                      </span>
                      {openInfoF && (
                        <InformeFinalVista
                          rol="coordinador"
                          initialOpen={true}
                          estudiante={estudiante}
                          plantrabajo2={estudiante?.estudiante?.planesDeTrabajo?.find(
                            (a) => a.semestre.actual
                          )}
                          isTutor={true}
                        />
                      )}
                    </span>
                  </div>
                )}
              </div>,
              estudiante?.estudiante?.usuario?.estaActivo ? (
                <span className="text-green-700 font-medium text-xs py-1 px-2 ring-1 ring-green-600/20 bg-green-100 rounded-md items-center inline-flex border-green-600 ring-inset">
                  Activo
                </span>
              ) : (
                <span className="text-red-700 font-medium text-xs py-1 px-2 ring-1 ring-red-600/20 bg-red-100 rounded-md items-center inline-flex border-red-600 ring-inset">
                  Inactivo
                </span>
              ),
            ])}
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </>
  );
};
