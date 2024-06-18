import { useEffect, useState } from "react";
import {  HerramientasForm } from "../../components/area-interes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../components/ui/Input/Form";
import { TabComponent } from "../../components/ui/Tab/TabComponent";
import { BiArrowToRight, BiCheckCircle, BiChevronDown } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { DialogComponent } from "../../components/ui/Dialog/DialogComponent";
import { SolicitudComponent } from "../../components/solicitudes/SolicitudComponent";
import { BsXLg } from "react-icons/bs";
import Swal from "sweetalert2";
import useAreasDeInteres from "../../hooks/useAreasInteres";
import { z } from "zod";
import { HerramientaCheckbox } from "../../components/area-interes/HerramientaCheckbox";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useAuth } from "../../contexts";


const getSolicitudesPracticantes = async () => {
  return Promise.resolve([
    {
      id: 1,
      estado: true,
      empresa: {
        nombre: 'Empresa 1',
        nit: '123456789',

      },
      perfil: {
        areaConocimiento: 'Desarrollo de software',
        habilidades: 'Conocimiento en React, Node.js, MongoDB',
        herramientas: 'Visual Studio Code, Git, GitHub',
      },
      numeroPracticantes: 1,
      remunerado: true,
    },
  ])
}


const AlertComponent = () => {
  return (
    <div className="grid bg-yellow-50 p-3 rounded-sm mt-2">
      <div className="grid gap-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-yellow-400">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
          <div className="ml-5 text-left">
            <h3 className="text-md leading-5 font-medium text-yellow-700">¡Atención!</h3>
            <div className="mt-2 text-sm text-yellow-600">
              <p>Solamente puede solicitar un maximo de   <span className="font-bold">3 practicantes</span> por semestre.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;

export const SolicitudesPracticantes = () => { 

  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [tab, setTab] = useState(0)
  const [mostrarSolicitud, setMostrarSolicitud] = useState(false)
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<any>(null)


  const {areas} = useAreasDeInteres()
  const {user} = useAuth()
  //console.log(user)

  console.log(areas)
  
  const form = useForm({
    defaultValues: {
      areasInteres: [],
      numeroPracticantes: 1,
      remuneracion: false,
      herramientas: [],
      id: user?.id
    },
    resolver: zodResolver(z.object({
    
      areaConocimiento: z.string().optional(),
      herramientas: z.array(z.object({
        id: z.string(),
        nombre: z.string()
      })),
      numeroPracticantes: z.number().min(1,{message:'Debe solicitar minimo 1 practicante.'}).max(3, { message: 'Solo puede solicitar un maximo de 3 practicantes.' }),
      remuneracion: z.boolean(),
      areasInteres: z.array(z.string())
        .min(1,{ message: 'Debe seleccionar al menos una área de interes.' })
        .max(3, { message: 'Solo puede seleccionar un maximo de 3 áreas de interes.' }),
    }))
  });

  console.log(form.formState.errors)
  //console.log(form.getValues())
  //const selectedDepartamento = form.watch("departamentoResidenciaId");
 // const watch = form.watch() as Record<string, any>;
//  const { createEstudiante, cargando, error } = useEstudiantes();

  const onSubmit = (data: any) => { 
    console.log('data',data)
   
    //console.log('solicitudRequest',solicitudRequest)
  }

  const onCancelarSolictud = () => { 
    Swal.fire({
      title: '¿Estás seguro de cancelar la solicitud?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cancelar solicitud!',
      cancelButtonText: 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Solicitud cancelada!',
          'Tu solicitud ha sido cancelada.',
          'success'
        )
      }
    })
  }


  useEffect(() => {
    getSolicitudesPracticantes().then(setSolicitudes);
  }, []);

  console.log(solicitudes)
  return (
    <>
      <DialogComponent
        isOpen={mostrarSolicitud}
        onClose={() => setMostrarSolicitud(false)}
        content={
          <SolicitudComponent
            solicitud={solicitudSeleccionada}
          />
        }
        title=""
        size="2xl"
      />
      <div className="mb-10">
        <div className="text-gray-600 font-bold text-2xl mb-3">Solicitudes de practicantes</div>
        <span className="text-gray-600 font-light text-md">
          Aquí podrás ver las solicitudes de practicantes vigentes y finalizadas, así como crear una nueva solicitud.
        </span>
      </div>

      <div>
        <TabComponent
          activeTab={tab}
          setTab={setTab}
          tabListI={[
            {
              name: 'Solicitudes de practicantes vigentes'
            },
            {
              name: 'Crear solicitud'
            },
            {
              name:'Solicitudes de practicantes finalizadas'
            }
          ]}
        />
      </div>
      {
        tab === 0 && (
          <div>
            
            
            <ul role="list" className="divide-y divide-gray-100">
              {
                solicitudes.map((solicitud) => (
                  <li
                    key={solicitud.id||0}
                    
                    className="flex justify-between gap-x-6 py-5">
                    <div
                      onClick={() => setMostrarSolicitud(true)}
                      className="flex min-w-0 gap-x-4 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                        className="h-8 w-8 text-yellow-400 self-center">
                        <title>Solicitud pendiente</title>
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                      </svg>
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">Solicitud de 1 practicante</p>
                        <p className="mt-1 truncate text-xs leading-5 text-blue-500 flex content-center">
                          Ver solicitud
                          <BiArrowToRight className="self-center" />
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">    
                      <button
                        onClick={onCancelarSolictud}
                        className="self-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                          className="h-10 w-10 text-red-400 cursor-pointer">
                          <BsXLg />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))
}
              
              <li className="flex justify-between gap-x-6 py-5 cursor-pointer">
                <div className="flex min-w-0 gap-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-10 w-10 text-green-400">
                    <title>Solicitud aprovada</title>
                    <BiCheckCircle />
                  </svg>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">Solicitud de 2 practicantes</p>
                    <p className="mt-1 truncate text-xs leading-5 text-blue-500 flex content-center">
                      Ver solicitud
                      <BiArrowToRight className="self-center" />
                    </p>
                  </div>
                </div>
                
              </li>
            </ul>
            <div className="flex flex-col space-y-0">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-green-400">
                  <BiCheckCircle />
                </svg>
                <div className="text-green-600 font-bold text-sm mb-3">Solicitudes de practicantes asignadas</div>
              </div>
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-yellow-400">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
                <div className="text-yellow-600 font-bold text-sm mb-3">Solicitudes de practicantes pendientes de asignación</div>
              </div>
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-red-400">
                  <MdCancel />
                </svg>
                <div className="text-red-600 font-bold text-sm mb-3">Solicitudes de practicantes rechazadas</div>
              </div>
            </div>
          </div>
        )
      }
      {
        tab === 1 && (
          <Form {...form}>
            <h2
              className="text-md font-bold mb-5"
            >Formulario de solicitud de practicantes</h2> 
            <AlertComponent />

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mt-3">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Seleccione las áreas de interés de los practicantes que necesita.
                  </legend>
                  <div className="mt-6 space-y-2">
                    {
                      areas.map((area) =>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input id={area.id} name={area.id} type="checkbox"
                              value={area.id}
                              checked={form.watch("areasInteres").includes(area.id)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                if (checked) {
                                  form.setValue("areasInteres", [...form.watch("areasInteres"), area.id])
                                } else {
                                  form.setValue("areasInteres", form.watch("areasInteres").filter((id: string) => id !== area.id))
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                            
                          </div>
                          <div className="text-sm leading-6">
                            <label htmlFor={area.id} className="font-normal text-gray-900">{ area.nombre}</label>
                           
                          </div>
                          <div>
                            
                          </div>
                        </div>
                      )
                    }
                    <div>
                      <label htmlFor="">
                        {
                          form.formState.errors.areasInteres ? (
                            <span className="text-red-500 text-sm">
                              {
                              form.formState.errors.areasInteres.message 
                            
                            }</span>
                          ) : null
                        }
                      </label>
                    </div>
                    
                  </div>
                </fieldset>

              </div>
              <div>

                <div className="mt-10 mb-3">
                  <div className="text-sm text-gray-900 mb-2">
                    Seleccione las herramientas y/o conocimientos que maneja de las
                    siguientes subcategorias (solo si aplica).
                  </div>
                  <HerramientasForm />
                  <div className="divide-y mt-3">
                   
                   
                      <Disclosure>
                      <DisclosureButton
                        className="text-sm font-semibold leading-6 text-gray-900 flex w-full justify-between p-3">
                        <span>Frontend</span>       
                        <BiChevronDown className="h-5 w-5 text-gray-400" />
                      </DisclosureButton>
                      <DisclosurePanel>
                        <div className="flex space-x-1 p-3">
                          <HerramientaCheckbox nombre="HTML" />
                          <HerramientaCheckbox nombre="CSS" />
                          <HerramientaCheckbox nombre="React" />
                          <HerramientaCheckbox nombre="Angular" />
                          <HerramientaCheckbox nombre="Vue" />
                        </div>
                      </DisclosurePanel>
                      
                      </Disclosure>
                      
                    <Disclosure>
                      <DisclosureButton
                        className="text-sm font-semibold leading-6 text-gray-900 flex w-full justify-between p-3">
                        <span>Backend</span>
                        <BiChevronDown className="h-5 w-5 text-gray-400" />
                      </DisclosureButton>
                      <DisclosurePanel>
                        <div className="flex space-x-1 p-3">
                          <HerramientaCheckbox nombre="Node js" />
                          <HerramientaCheckbox nombre="Spring" />
                          <HerramientaCheckbox nombre="Nest" />
                          <HerramientaCheckbox nombre="C#" />
                          <HerramientaCheckbox nombre="GO" />
                        </div>
                      </DisclosurePanel>

                    </Disclosure>
                    
                  </div>
                </div>
              </div>
              <div>
                <div className="flex space-x-3">
                  <label htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900 self-center"
                  >Número de practicantes solicitados para el perfil
                  </label>
                  <div className="mt-2">
                    <select id="country" name="country" autoComplete="numero-practicantes" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>

                </div>
              </div>
              <div>
                <div>
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">¿Tendrá algún tipo de remuneración?</legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Incentivo monetario de cualquier tipo (salario, subsidio, comisión...).</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-x-3">
                        <input id="push-everything" name="push-notifications" type="radio"
                          checked={form.watch("remuneracion")}
                          onChange={() => form.setValue("remuneracion", true)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                          <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">Si</label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input id="push-email" name="push-notifications" type="radio"
                          checked={!form.watch("remuneracion")}
                          onChange={() => form.setValue("remuneracion", false)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                          <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">No</label>
                      </div>
                      
                    </div>
                  </fieldset>

                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                >
                  Enviar solicitud
                </button>
              </div>
            </form>
          </Form>
        )
      }
      {
        tab === 2 && (
          <div>
            <h2>Solicitudes de practicantes finalizadas</h2>
          </div>
)}


  </>)
}