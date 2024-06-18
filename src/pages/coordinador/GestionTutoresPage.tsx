import { useEffect, useState } from "react";
import { TabComponent } from "../../components/ui/Tab/TabComponent"
import { TablaPaginadaComponent } from "../../components/ui/Table/TablaPaginadaComponent";
import useEmpresas from "../../hooks/useEmpresas";

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


  const {tutores,getTodosLosTutores} = useEmpresas()
  console.log(tutores)

  useEffect(() => {
    getTodosLosTutores().then((data) => {
      setTotalTutores(data.length)
    })
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
          <TablaPaginadaComponent
            encabezados={["Nombre", "Empresa", "Email", "Estado"]}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={totalTutores}
            filas={tutores.map((tutor) => [
              `${tutor.nombre} ${tutor.apellidos}`,
              tutor.empresa.nombre,
              tutor.email,
              tutor.activo ? "Activo" : "Inactivo"
            
            ])}
          />
        </>
      )
    }
  </>)
 }