import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

interface AgregarDocenteFromProps {
  onClose: (val: boolean) => void
  crearNuevoDocente: (docente: { id: string, nombres: string, email: string, apellidos: string }) => void

}

export const AgregarDocenteForm = ({ onClose, crearNuevoDocente, }: AgregarDocenteFromProps) => {

  const form = useForm({
    resolver: zodResolver(z.object({
      nombre: z.string().min(1, 'El nombre es obligatorio').default(''),
      apellido: z.string().min(1, 'El apellido es obligatorio').default(''),
      correo: z.string()
        .email('El correo no es valido')
        .endsWith('@ufps.edu.co', {
          message: 'Debe ser un correo institucional (@ufps.edu.co)'
        })
        .default('')
    }))
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    crearNuevoDocente(
      { id: '5', nombres: data.nombre, email: data.correo, apellidos: data.apellido }
    )

    onClose(false)
  }



  return (
    <div className="flex flex-col">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm leading-6 text-gray-600"></p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="nombre-docente" className="block text-sm font-medium leading-6 text-gray-900">Nombre <span className="text-red-600">*</span></label>
              <div className="mt-2">
                <input
                  {...form.register('nombre')}
                  type="text" name="nombre" id="nombre-docente" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              {
                form.formState.errors.nombre &&
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.nombre?.message?.toString()}
                </p>
              }
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Apellido <span className="text-red-600">*</span></label>
              <div className="mt-2">
                <input
                  {...form.register('apellido')}
                  type="text" name="apellido" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

              </div>
              {
                form.formState.errors.apellido &&
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.apellido?.message?.toString()}
                </p>
              }
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="correo" className="block text-sm font-medium leading-6 text-gray-900">Correo institucional  <span className="text-red-600">*</span></label>
              <div className="mt-2">
                <input
                  {...form.register('correo')}
                  placeholder="correo@ufps.edu.co" type="email" name="correo" id="correo" autoComplete="correo" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

              </div>
              {
                form.formState.errors.correo &&
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.correo?.message?.toString()}
                </p>
              }
            </div>


          </div>
          <div className="mt-5 flex w-full justify-end space-x-5">
            <button
              onClick={() => { onClose(false) }}
              type="button"
              className="p-2 bg-red-500 text-white rounded-md">Cancelar</button>
            <button type="submit" className="p-2 bg-blue-600 text-white rounded-md">Registrar</button>
          </div>
        </div>

      </form>
    </div>
  )
}