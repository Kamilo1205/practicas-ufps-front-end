import { useEffect, useState } from "react"
import { TabComponent } from "../../components/ui/Tab/TabComponent"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/Input/Form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { tutorSchema } from "../../schemas/tutorSchema"
import { PhoneInput } from "../../components/ui/PhoneInput"
import { Avatar, Pagination } from "../../components/ui"
import { DialogComponent } from "../../components/ui/Dialog/DialogComponent"
import { TutoresPerfilComponent } from "../../components/usuarios/perfil/TutoresPerfilComponent"
import { set } from "zod"


const tabsList = [
  {
    name: 'Tutores',
  },
  {
    name: 'Registrar un nuevo tutor'
  }
]

interface Tutor { 
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string
  direccion: string
  imagenUrl: string
  estado: string

}

const getTutores = async () => {
  return Promise.resolve([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juanP@correo.com',
      telefono: '123456789',
      direccion: 'Calle 123',
      imagenUrl: '',
      estado: 'Activo',
    },
    {
      id: 2,
      nombre: 'Maria',
      apellido: 'Gomez',
      email: 'mariag@correo.com',
      telefono: '123456789',
      direccion: 'Calle 123',
      imagenUrl: 'https://randomuser.me/api/portraits',
      estado: 'Activo',
    }
  ])
 }

export const TutoresPage = () => {

  const [tab, setTab] = useState(0)
  const [tutores, setTutores] = useState<Tutor[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(5)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [mostrarSolicitud, setMostrarSolicitud] = useState(false)
  const [tutorSeleccionado, setTutorSeleccionado] = useState<Tutor | null>(null)
  const form = useForm({
    resolver: zodResolver(tutorSchema)
  });


  console.log(form.getValues())

  const onSubmit = (data: any) => { 
    console.log(data)
  }

  const onEditTutor = (tutor:Tutor) => {
    setTutorSeleccionado(tutor)
    setMostrarSolicitud(true)
  }

  useEffect(() => { 
    getTutores().then((data) => {
      setTutores(data)
    })
  },[])
  return (
    <>
      <DialogComponent
        isOpen={mostrarSolicitud}
        onClose={() => setMostrarSolicitud(false)}
        content={
          <TutoresPerfilComponent
            tutor={tutorSeleccionado}
          />
        }
        title=""
        size="lg"
      />
      <div className="mb-10">
        <div className="text-gray-600 font-bold text-2xl mb-3">Administración de tutores</div>
        
      </div>
      <TabComponent
        activeTab={tab}
        setTab={setTab}
        tabListI={tabsList}
      />
      <div>
        {
          tab === 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full border-gray-300">
                  <thead>
                    <tr>
                      <th className="min-w-[28rem] text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Nombre</th>
                      <th className="min-w-24 text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Estado</th>
                      <th className="min-w-24 text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Telefono</th>

                      <th className="min-w-32 text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Dirección</th>
                      <th/>
                    </tr>
                  </thead>
                  <tbody className="border-gray-300 divide-y border-y">
                    {
                      tutores.map((usuario) => (
                        <tr key={usuario.id} className="">
                          <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                            <div className="flex items-center">
                              <div className="shrink-0 w-11 h-11">
                                <Avatar url={usuario.imagenUrl} />
                              </div>
                              <div className="ml-4">
                                <div className="text-gray-900 font-medium">{`${usuario.nombre} ${usuario.apellido}` || 'Nombre aun no registrado'}</div>
                                <div className="text-gray-500 mt-1">{usuario.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                            {
                              usuario.estado === 'Activo'
                                ? <span className="text-green-700 font-medium text-xs py-1 px-2 ring-1 ring-green-600/20 bg-green-100 rounded-md items-center inline-flex border-green-600 ring-inset">Activo</span>
                                : <span className="text-red-700 font-medium text-xs py-1 px-2 ring-1 ring-red-600/20 bg-red-100 rounded-md items-center inline-flex border-red-600 ring-inset">Inactivo</span>
                            }
                          </td>
                          <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                            {usuario.telefono}
                          </td>
                          <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                            {
                              usuario.direccion
                            }
                          </td>
                          <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                            <button
                              onClick={() => onEditTutor(usuario)}
                              className="text-indigo-600 hover:text-indigo-900">Editar</button>
                          </td>
                          
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} paginate={setCurrentPage} />
            
            </>
          )
        }
        {
          tab === 1 && (
            <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Información personal</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Una vez registrado el tutor podrá ingresar con el correo creado y será notificado.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-6 md:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                        <div className="mt-2">
                          <input
                            {...form.register('nombre')}
                            type="text" name="nombre" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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

                      <div className="col-span-6 md:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo</label>
                        <div className="mt-2">
                          <input
                            {...form.register('email')}
                            id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          {
                            form.formState.errors.email &&
                            <p className="text-red-500 text-sm mt-1">
                              {form.formState.errors.email?.message?.toString()}
                            </p>
                          }
                        </div>
                      </div>
                      {/* Telefono */}
                      <div className="col-span-6 md:col-span-2">
                        <FormField
                          name="telefono"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefono</FormLabel>
                              <FormControl>
                                <PhoneInput {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                     
                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Dirección de trabajo</label>
                        <div className="mt-2">
                          <input type="text" name="street-address" id="street-address" autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        {
                          form.formState.errors.direccion &&
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.direccion?.message?.toString()}
                          </p>
                        }
                      </div>


                      
                      
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6 w-full">
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrar</button>
                  </div>
                </form>
              </Form>
              
            </>
          )
        }
      </div>
    </>
  )
}


/**
 * <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                        <div className="mt-2">
                          <select id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                      </div>
 */