import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import {  z } from "zod"

const director = {
  nombre: '',
  email: ''
}
export const DirectorSetttingComponent = () => {
  const [editar, setEditar] = useState({ email: false })
  
  const form = useForm({
    resolver: zodResolver(z.object({
      email: z.string({
        required_error: 'El email es requerido'
      }).email().endsWith('@ufps.edu.co',{message: 'El email debe ser de la UFPS'})
    
    }))
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => { 
    console.log(data)
    setEditar({ email: false })
  }

  return (<>
    <div className=" flex flex-col space-y-2">
      <div>
       
        {
          director.nombre ? (<span>{director.nombre}</span>)
            :
            (
              <span>Nombre aún sin registrar</span>
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex space-x-2">
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
              <button
                type="submit"
                className="text-white bg-green-500 hover:bg-green-700 px-2 rounded-md">
                Guardar
              </button>
              <button
                onClick={() => setEditar({ email: false })}
                className="text-white bg-red-500 hover:bg-red-700 px-2 rounded-md">
                Cancelar
              </button>
            </form>
          ) : (
              <div>
                <button
                  onClick={() => setEditar({ email: true })}
                  className="text-blue-600">Editar</button>
              </div>
          )
        }
        
      </div>
    </div>
  </>)

}