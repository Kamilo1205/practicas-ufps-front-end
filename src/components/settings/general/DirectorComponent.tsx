import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Director } from "../../../interfaces/director.interface"

interface Props {
  director: Director
  crearDirector: (director: Director) => void
}

export const DirectorSetttingComponent = ({ director, crearDirector }: Props) => {
  const [editar, setEditar] = useState({
    email: false,
    nombres: false,
    apellidos: false
  })

  const form = useForm({
    resolver: zodResolver(z.object({
      email: z.string({
        required_error: 'El email es requerido'
      }).email().endsWith('@ufps.edu.co', { message: 'El email debe ser de la UFPS' }),
      nombres: z.string({
        required_error: 'El nombre es requerido'
      }),
      apellidos: z.string({
        required_error: 'El apellido es requerido'
      })

    }))
  })


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    crearDirector({
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email
    })
    setEditar({
      email: false,
      nombres: false,
      apellidos: false
    })
  }


  return (<>
    <div className=" flex flex-col space-y-2">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2">
        <div className="flex justify-between">

          {
            !editar.nombres && (director.nombres ? (<span>{director.nombres}</span>)
              :
              (
                <span>Nombre aún sin registrar</span>
              ))
          }
          {
            editar.nombres ? (
              <>
                <div>
                  <input
                    type="text"
                    defaultValue={director.nombres}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                    placeholder="Nombre del director"
                    {...form.register('nombres')}
                  />
                  <div className="text-red-500 text-sm">
                    {form.formState.errors.nombres?.message?.toString()}
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-green-500 hover:bg-green-700 px-2 rounded-md">
                  Guardar
                </button>
                <button
                  onClick={() => setEditar({ email: false, apellidos: false, nombres: false })}
                  className="text-white bg-red-500 hover:bg-red-700 px-2 rounded-md">
                  Cancelar
                </button>
              </>
            ) : (
              <div>
                <button
                  onClick={() => setEditar({
                    email: true,
                    nombres: true,
                    apellidos: true
                  })}
                  className="text-blue-600">Editar</button>
              </div>
            )
          }
        </div>
        <div className="flex justify-between">

          {
            !editar.apellidos && (director.apellidos ? (<span>{director.apellidos}</span>)
              :
              (
                <span>Nombre aún sin registrar</span>
              ))
          }
          {
            editar.apellidos ? (
              <>
                <div>
                  <input
                    type="text"
                    defaultValue={director.apellidos}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                    placeholder="Apellidos del director"
                    {...form.register('apellidos')}
                  />
                  <div className="text-red-500 text-sm">
                    {form.formState.errors.apellidos?.message?.toString()}
                  </div>
                </div>

              </>
            ) : (
              <div>

              </div>
            )
          }
        </div>

        <div className="flex justify-between">
          {
            !editar.email && (director.email ? (<span>{director.email}</span>)
              :
              (
                <span>Email aún sin registrar</span>
              )
            )
          }
          {
            editar.email ? (
              <>
                <div>
                  <input
                    type="email"
                    defaultValue={director.email}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                    placeholder="director@ufps.edu.co"
                    {...form.register('email')}
                  />
                  <div className="text-red-500 text-sm">
                    {form.formState.errors.email?.message?.toString()}
                  </div>
                </div>

              </>
            ) : (
              <div>

              </div>
            )
          }

        </div>
      </form>
    </div >
  </>)

}