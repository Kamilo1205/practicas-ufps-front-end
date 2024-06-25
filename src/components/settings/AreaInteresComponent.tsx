import { useState } from "react"

import { SubAreaFormComponent } from "./SubAreaFormComponent"
import { AreaInteres } from "../../interfaces"
import { Button } from "../ui"
import { DialogComponent } from "../ui/Dialog/DialogComponent"
import { SubAreaComponent } from "./SubAreaComponent"

interface AreaInteresComponentProps { 
  area: AreaInteres
  createAreaDeInteres: (newArea: Omit<AreaInteres, 'id'>) => Promise<void>
  updateAreaDeInteres: (id: string, updatedArea: Omit<AreaInteres, 'id'>) => Promise<void>
}

export const AreaInteresComponent = ({ area,createAreaDeInteres,updateAreaDeInteres }: AreaInteresComponentProps) => { 
  const [editar, setEditar] = useState(false)
  const [nombre, setNombre] = useState(area.nombre)
  const [subAreaSelected, setSubAreaSelected] = useState<AreaInteres | null>(null)

const [open, setOpen] = useState(false)
  const onUpdateArea = () => { 
    updateAreaDeInteres(area.id, {
      ...area,
      nombre,
      fechaActualizacion: new Date(),
    })
  }

  const onSelectSubArea = (subArea: AreaInteres) => { 
    setSubAreaSelected(subArea)
    setOpen(true)
  }

  return (<>
    <div className="p-6">
      <DialogComponent
        title="Sub Area de Interes"
        isOpen={open}
        onClose={() => setOpen(false)}
        size="lg"
        content={
          subAreaSelected ?
          <SubAreaComponent
          subArea={ subAreaSelected }
            />
            : 
            <p> Este mensaje no debería verse, por favor recargue la página e inténtelo nuevamente..</p>
        }

      />
      <div className="mt-1 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-base font-medium leading-6 text-gray-900">Nombre</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex justify-between text-base">
                {
                  editar ?
                    <input
                      type="text"
                      onChange={(e) => setNombre(e.target.value)}
                      defaultValue={area.nombre}
                      className="w-full mr-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /> :
                    <span>{area.nombre}</span>
                }
                <div>
                  {
                    editar ? 
                      <div className="space-x-1 flex">
                        <Button
                          onClick={onUpdateArea}
                          className="bg-green-500 cursor-pointer hover:bg-green-600"
                        >Guardar</Button>
                        <Button
                          onClick={() => {
                            setEditar(false)
                            setNombre(area.nombre)
                          }}
                          className="bg-red-600 cursor-pointer hover:bg-red-700">Cancelar
                        </Button>
                        </div>
                        
                     :
                      <button
                        onClick={() => setEditar(true)}
                        className="text-blue-600 cursor-pointer">Editar</button>
                  }
                </div>
              </div>
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-base font-medium leading-6 text-gray-900">Sub areas</dt>
            <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <SubAreaFormComponent
                padre={area}
                createAreaDeInteres={createAreaDeInteres} />
              {
                area.subAreas.length === 0 ?
                  <p className="text-md">.</p> :
                  area.subAreas.map((subArea) => {
                    return <div key={subArea.id} className="flex justify-between">
                      <span>{subArea.nombre}</span>
                      <span className="text-gray-500">{subArea.fechaCreacion.toLocaleDateString()}</span>
                    </div>
                  })
              }
              <ul>
                <span className="font-semibold">Haz click para ver en detalle y editar la sub area.</span>
                <li
                  onClick={() => onSelectSubArea({
                    id: '1',
                    nombre: 'Front end',
                    fechaCreacion: new Date(),
                    fechaActualizacion: new Date(),
                    subAreas: [],
                    areaPadre: area.id,
                    areaInteresHerramientas: [{
                      id: '1',
                
                    
                      herramienta: {
                        id: '1',
                        nombre: 'React',
                        fechaCreacion: new Date(),
                        fechaActualizacion: new Date(),
                       
                      },
                        fechaActualizacion: new Date(),
                        fechaCreacion: new Date()
                    },
                      {
                        id: '2',
                    
                        herramienta: {
                          id: '2',
                          nombre: 'Vue',
                          fechaCreacion: new Date(),
                          fechaActualizacion: new Date(),
                        },
                        fechaActualizacion: new Date(),
                        fechaCreacion: new Date()
                      }
                    ]
                    
                  })}
                  className="text-md cursor-pointer text-blue-600 hover:underline">Front end</li>
                <li
                  onClick={() => onSelectSubArea(area.subAreas[1])}
                  className="text-md cursor-pointer text-blue-600 hover:underline">Back end</li>
              </ul>
            </dd>
          </div>
        </dl>
        </div>

   

    </div>
  </>)
}