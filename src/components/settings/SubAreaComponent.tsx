
import useAreasDeInteres from "../../hooks/useAreasInteres"
import { AreaInteres } from "../../interfaces"
import { Badge } from "../ui/Badge/Badge"
import { HerramientaFormComponent } from "./HerramientaComponentForm"
import { BiX } from "react-icons/bi"

interface SubAreaComponentProps { 
  subArea: AreaInteres

}

export const SubAreaComponent = ({subArea}:SubAreaComponentProps) => { 

  const { createAreaDeInteres } = useAreasDeInteres()
  const onDeleteHerramienta = (id: string) => { 
    console.log('delete herramienta', id)
  }

  return (<>
    <div className="p-6">
      <div className="mt-1 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-base font-medium leading-6 text-gray-900">Nombre</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span>{subArea.nombre}</span>
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-base font-medium leading-6 text-gray-900">Herramientas</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <HerramientaFormComponent createAreaDeInteres={createAreaDeInteres} padre={subArea} />
              <ul className="flex flex-wrap space-x-1 space-y-1 md:space-y-0">
                {
                  subArea.areaInteresHerramientas.map((areaInteresHerramienta) => {
                    return <li key={areaInteresHerramienta.id}>
                      <Badge className="border bg-transparent border-green-600 font-semibold text-base flex w-fit space-x-2">
                        <span className="text-black">{areaInteresHerramienta.herramienta.nombre}</span>
                        <button
                          onClick={() => onDeleteHerramienta(areaInteresHerramienta.id)}
                          className="text-red-500">
                          <BiX className="w-7 h-7" />
                        </button>
                      </Badge>
                    </li>
                  })
                }
              </ul>
            </dd>
          </div>
         
        </dl>
      </div>
    </div>
  </>)
}