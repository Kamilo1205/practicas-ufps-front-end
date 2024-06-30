import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { AreaInteres } from "../../interfaces"
import { Button } from "../ui"
import { BiPlus } from "react-icons/bi"

interface SubAreaFormComponentProps { 
  createAreaDeInteres: (newArea: Omit<AreaInteres, 'id'>) => Promise<void>
  padre: AreaInteres | string
}

export const SubAreaFormComponent = ({createAreaDeInteres,padre}:SubAreaFormComponentProps) => {
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
    const padreId = typeof padre === 'string' ? padre : padre.id
    createAreaDeInteres({
      nombre: data.nombre,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      subAreas: [],
      areaInteresHerramientas: [],
      areaPadre: padreId
    })
  }
  
  return <>
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
            placeholder="Nombre del nueva sub area."
          />
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
        <span className="hidden lg:inline-block text-nowrap">Agregar sub area</span>
      </Button>
    </form>
  </>
 }