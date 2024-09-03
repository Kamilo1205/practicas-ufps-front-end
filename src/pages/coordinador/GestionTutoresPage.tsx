import { useEffect, useState } from "react";
import { TabComponent } from "../../components/ui/Tab/TabComponent"
import { TablaPaginadaComponent } from "../../components/ui/Table/TablaPaginadaComponent";
import useEmpresas from "../../hooks/useEmpresas";
import { EmptyStateMessage } from "../../components/estudiantes";

const Tabs = [
  {
    id: 0,
    name: "Tutores",
  },


]

export const GestionTutoresPage = () => {
  const [tab, setTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTutores, setTotalTutores] = useState(0);
  const [tutores, setTutores] = useState([])

  const { getTodosLosTutores, } = useEmpresas()
  console.log(tutores)

  useEffect(() => {
    //TODO: Verificar si se necesita hacer petición a la API o el hoock ya trae los datos.
    getTodosLosTutores().then((response) => {
      setTutores(response);
      setTotalTutores(response.length);
    });

  }, [])

  return (<>
    <div className="mb-10">
      <div className="text-gray-600 font-bold text-2xl">Gestión de tutores</div>
    </div>
    <TabComponent
      tabListI={Tabs}
      activeTab={tab}
      setTab={setTab}
    />

    {
      tab === 0 && (
        <>
          {
            tutores.length === 0 ? (
              <EmptyStateMessage
                message="No hay tutores registrados"
                submesage="Puede registrar un nuevo tutor para una empresa"
                buttonText="Agregar tutor"
                setOpen={() => { }}
              />
            )
              :
              <TablaPaginadaComponent
                itemsPerPage={5}
                encabezados={["Nombre", "Empresa", "Email", "Teléfono", "Estado"]}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={totalTutores}
                filas={tutores.map((tutor) => [
                  `${tutor?.nombre} ${tutor?.apellidos}`,
                  tutor?.empresa?.nombreLegal,
                  tutor?.usuario?.email,
                  tutor?.telefono,
                  tutor?.usuario?.estaActivo ? "Activo" : "Inactivo"

                ])}
              />
          }

        </>
      )
    }
  </>)
}