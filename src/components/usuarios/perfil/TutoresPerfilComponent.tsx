import { useState } from "react"
import { Avatar } from "../../ui"
import { IoCheckmark } from "react-icons/io5"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../ui/Input/Form"
import { PhoneInput } from "../../ui/PhoneInput"

interface Tutor {
  id: string | number
  nombre: string
  apellido: string
  email: string
  telefono: string
  direccion: string
  estado: string
  imagenUrl?: string
}

interface SolicitudPendienteProps { 
  tutor:Tutor
}

const EditarNombreTutorComponent = ({nombre, apellido}:{nombre:string, apellido:string}) => {

  const form = useForm({
    resolver: zodResolver(z.object({
      nombre: z.string().min(1, 'El nombre es obligatorio').default(''),
      apellido: z.string().min(1, 'El apellido es obligatorio').default(''),
    }))
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => { 
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="col-span-6 md:col-span-3">
        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
        <div className="mt-2">
          <input
            {...form.register('nombre')}
            type="text" name="nombre" id="first-name"
            autoComplete="given-name"
            defaultValue={nombre}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {
            form.formState.errors.nombre &&
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.nombre?.message?.toString()}
            </p>
          }
        </div>
      </div>

      <div className="col-span-6 md:col-span-3">
        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Apellidos</label>
        <div className="">
          <input
            {...form.register('apellido')}
            defaultValue={apellido}
            type="text" name="apellido" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        {
          form.formState.errors.apellido &&
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.apellido?.message?.toString()}
          </p>
        }
      </div>
      <button
        type="submit"
        className="mt-1 px-2 py-1 bg-indigo-600 rounded-lg text-white w-full flex justify-center">
        <IoCheckmark size={'1.5em'} />
      </button> 
    </form>
  )
}

const EditarEmailTutorComponent = ({ email }: { email: string }) => {
  const form = useForm({
    resolver: zodResolver(z.object({
      email: z.string().min(1, 'El correo es obligatorio').email('El correo no es válido').default(email),
    }))
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }
  return (
    <form className="flex space-x-1" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="col-span-6 md:col-span-4">
        <div className="">
          <input
            id="email"
            defaultValue={email}
            {...form.register('email')}
            name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          {
            form.formState.errors.email &&
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.email?.message?.toString()}
            </p>
          }
        </div>
      </div>
      <button type='submit' className="px-2 bg-indigo-600 rounded-lg text-white">
        <IoCheckmark size={'1.5em'} />
      </button> 
    </form>
  )
}

const EditarTelefonoTutorComponent = ({ telefono }: { telefono: string }) => { 

  const form = useForm({
    values: { telefono },
    resolver: zodResolver(z.object({
      telefono: z.string().min(1, 'El teléfono es obligatorio').default(telefono),
    }))
  })


  const onSubmit: SubmitHandler<FieldValues> = (data) => { 
    console.log(data)
  }

  return (
    <Form {...form}>
    <form className="flex space-x-1 px-2" onSubmit={form.handleSubmit(onSubmit)}>
    <div className="">
      <FormField
        name="telefono"
        render={({ field }) => (
          <FormItem>  
            <FormControl>
              <PhoneInput  {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        </div>
        <button type='submit' className="px-2 bg-indigo-600 rounded-lg text-white">
          <IoCheckmark size={'1.5em'} />
        </button>
      </form>
    </Form>
      )
}

const EditarDireccionTutorComponent = ({ direccion }: { direccion: string }) => { 
  const form = useForm({
    values: { direccion },
    resolver: zodResolver(z.object({
      direccion: z.string().min(1, 'La dirección es obligatoria').default(direccion),
    }))
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => { 
    console.log(data)
  }
  return (<form className="flex space-x-1 " onSubmit={form.handleSubmit(onSubmit)}>
    <div className="">
      <div className="">
        <input defaultValue={direccion} type="text" name="street-address" id="street-address" autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      {
        form.formState.errors.direccion &&
        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.direccion?.message?.toString()}
        </p>
      }
    </div>
    <button type='submit' className="px-2 bg-indigo-600 rounded-lg text-white">
      <IoCheckmark size={'1.5em'} />
    </button>
  </form>)
}

export const TutoresPerfilComponent = ({ tutor }: SolicitudPendienteProps) => {

  //const [tutorItem, setTutorItem] = useState<Tutor>(tutor)
  
  const [isEditing, setIsEditing] = useState({
    nombre: false,
    apellido: false,
    email: false,
    telefono: false,
    direccion: false,
    estado: false,
  
  })

  const onEditar = (campo: string, val:boolean) => { 
    setIsEditing({ ...isEditing, [campo]: val })
  }

  return (<>
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Solicitud de practicante</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nombre</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex space-x-2 justify-between">
                {
                  tutor.imagenUrl ? <div className="shrink-0 w-11 h-11">
                    <Avatar url={tutor.imagenUrl} alt="Foto del tutor" />
                  </div>: <></>
                }
                <span className="self-center">
                  {
                    isEditing.nombre ?
                    <EditarNombreTutorComponent nombre={tutor.nombre } apellido={tutor.apellido} />
                      : <>{tutor.nombre} {tutor.apellido}</>                  }
                </span>
                <button
                  onClick={() => onEditar('nombre', !isEditing.nombre)}
                  className={`${isEditing.nombre ? 'text-red-400' : 'text-blue-400'}`}
                >
                  {isEditing.nombre ? 'Cancelar' : 'Editar'}
                </button>
              </div>
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Estado</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex justify-between">
                {
                  isEditing.estado ?
                    <div>
                      <div className="flex space-x-2">
                        <select id="estado-tutor-edit"
                          name="estado"
                          autoComplete="estado-tutor"
                          defaultValue={tutor.estado}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                          <option>Activo</option>
                          <option>Inactivo</option>
                        
                        </select>
                        <button className="px-2 bg-indigo-600 rounded-lg text-white">
                          <IoCheckmark size={'1.5em'} />
                        </button> 
                      </div>
                    </div>
                    : <>{tutor.estado}</>  
                }
                
                <button
                  onClick={() => onEditar('estado', !isEditing.estado)}
                  className={`${isEditing.estado ? 'text-red-400':'text-blue-400'}`}
                >
                 {isEditing.estado ? 'Cancelar' : 'Editar'}
                </button>
              </div>
              
            </dd>
          </div>
          
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Correo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex justify-between">
                
                {
                  isEditing.email ?
                    <EditarEmailTutorComponent email={tutor.email} />
                    : <>{tutor.email}</>
                }
                <button
                  onClick={() => onEditar('email', !isEditing.email)}
                  className={`${isEditing.email ? 'text-red-400' : 'text-blue-400'}`}
                >
                  {isEditing.email ? 'Cancelar' : 'Editar'}
                </button>
              </div>
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Telefono</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex justify-between">
                {
                  isEditing.telefono ?
                    <EditarTelefonoTutorComponent telefono={tutor.telefono} />
                    : <>{tutor.telefono}</>
                }

                <button
                  onClick={() => onEditar('telefono', !isEditing.telefono)}
                  className={`${isEditing.telefono ? 'text-red-400' : 'text-blue-400'}`}
                >
                  {isEditing.telefono ? 'Cancelar' : 'Editar'}
                </button>
              </div>
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Dirección de trabajo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex justify-between">
                {
                  isEditing.direccion ?
                    <EditarDireccionTutorComponent direccion={tutor.direccion} />
                    : <>{tutor.direccion}</>
              }

                <button
                  onClick={() => onEditar('direccion', !isEditing.direccion)}
                  className={`${isEditing.direccion ? 'text-red-400' : 'text-blue-400'}`}
                >
                  {isEditing.direccion ? 'Cancelar' : 'Editar'}
                </button>
              </div>
            </dd>
          </div>
          


        </dl>
      </div>
    </div>
  </>)
 }