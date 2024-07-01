import { useEffect, useState } from "react";
import useAreasDeInteres from "../../hooks/useAreasInteres";
import { Button, Pagination } from "../ui";
import { BiPlus } from "react-icons/bi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DisclosureComponent } from "../ui/Disclosure/DisclousreComponent";
import { AreaInteres } from "../../interfaces";
import { LuSearchCheck } from "react-icons/lu";


import { MdDelete } from "react-icons/md";
import { AreaInteresComponent } from "./AreaInteresComponent";




export const AreasDeInteresSettingComponent = () => { 

  const [filtro, setFiltro] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [areasPaginadas, setAreasPaginadas] = useState<AreaInteres[]>([])
  const itemsPerPage = 5
  const [totalItems, setTotalItems] = useState(0)

  const { areas, createAreaDeInteres,deleteAreaDeInteres,updateAreaDeInteres,createHerramienta} = useAreasDeInteres()
console.log(areas)
  const form = useForm({
    resolver: zodResolver(z.object({
      nombre: z.string().min(3, {
        message: 'El nombre debe tener al menos 3 caracteres'
      }).max(50, {
        message: 'El nombre debe tener menos de 50 caracteres'
      
      }).max(50)
    
    }))
  })
  
  const onCreacteArea: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
   
    createAreaDeInteres({
      nombre: data.nombre,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      subAreas: [],
      areaInteresHerramientas: [],
      
    })
  }


  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    if (filtro === '') {
      
      const areasHabilitadas = areas.filter((area) => !area.fechaEliminacion && !area.areaPadre)
      
      setAreasPaginadas(areasHabilitadas.slice(indexOfFirstItem, indexOfLastItem))
      setTotalItems(areasHabilitadas.length)
     
    }
    else {
      let areasFiltradas = areas.filter((area) => area.nombre.toLowerCase().includes(filtro.toLowerCase()))
      areasFiltradas = areasFiltradas.filter((area) => !area.fechaEliminacion && !area.areaPadre)
      areasFiltradas = areasFiltradas.slice(indexOfFirstItem, indexOfLastItem)
      setAreasPaginadas(areasFiltradas)
      setTotalItems(areasFiltradas.length)

    }
    

  },[filtro,areas,currentPage])

  return (<div>
    
    <div className="text-gray-600 font-semibold text-lg mb-5">Agregar nueva area de interés</div>
    <div className="w-full mb-5">
      <div className="w-full">
        <form
          onSubmit={form.handleSubmit(onCreacteArea)}
          className="flex space-x-1 mb-5 w-full">
          <div className="flex w-full"> 
            <div className="relative rounded-md shadow-sm w-full">
              
              <input
                {...form.register('nombre')}
                type="text"
                name="nombre" id="nombre-area"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Nombre del nuevo area de interés." />
              {
                form.formState.errors.nombre && <span className="text-red-500 text-sm">
                  {form.formState.errors.nombre.message?.toString()}
                </span>
              }
            </div>
          </div>
          <Button
            type="submit"
            variant="outline"
            className="w-fit text-gray-600 font-semibold text-sm border-indigo-500 hover:bg-indigo-500 hover:text-white h-fit"
          >
            
            <BiPlus className="text-xl" />
            <span className="hidden lg:inline-block text-nowrap">Agregar area</span>
          </Button>
        </form>
        
      </div>
      
    </div>
    <div className="mt-5">
      <div className="flex justify-end">
        <div className="w-fit flex content-center">
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">
                <LuSearchCheck />
              </span>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Buscar un area de interés" />

          </div>
        </div>
      </div>
      {
        
        areasPaginadas.map((area) => {
          return !area.fechaEliminacion &&!area.areaPadre &&<DisclosureComponent
            key={area.id}
            title={
              <div className="flex justify-between w-full">
                <span className="hover:text-gray-500 hover:underline">{area.nombre}</span>
                <button
                  onClick={()=>deleteAreaDeInteres(area.id )}
                  className="text-red-500 flex">
                  <span className="hidden lg:inline-block">Eliminar</span>
                  <MdDelete className="text-xl lg:hidden" title="Eliminar area"/>
                </button>
              </div>
              
            }
          >
            <AreaInteresComponent
              area={area}
              createAreaDeInteres={createAreaDeInteres}
              updateAreaDeInteres={updateAreaDeInteres}
              createHerramienta={createHerramienta}

            /> 
          </DisclosureComponent>

        })
        
        }
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems | 0}
          itemsPerPage={itemsPerPage}
          paginate={setCurrentPage}
        />
      
    </div>
  </div>)
} 
