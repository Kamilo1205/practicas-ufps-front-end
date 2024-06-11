import { useEffect, useState } from "react";
import { AreasDeInteresForm, HerramientasForm } from "../../components/area-interes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { estudianteSchema } from "../../schemas/estudianteSchema";
import { Form } from "../../components/ui/Input/Form";
import { TabComponent } from "../../components/ui/Tab/TabComponent";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { IoChevronDown } from "react-icons/io5";


const getSolicitudesPracticantes = async () => {
  return Promise.resolve([
    {
      id: 1,
      perfil: {
        areaConocimiento: 'Desarrollo de software',
        habilidades: 'Conocimiento en React, Node.js, MongoDB',
        herramientas: 'Visual Studio Code, Git, GitHub',
      }
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
  const [tab,setTab] = useState(0)
  const form = useForm({
    resolver: zodResolver(estudianteSchema)
  });

  //const selectedDepartamento = form.watch("departamentoResidenciaId");
  const watch = form.watch() as Record<string, any>;
//  const { createEstudiante, cargando, error } = useEstudiantes();

  const onSubmit = (data: any) => { 
    console.log(data)
  
  }

  useEffect(() => {
    getSolicitudesPracticantes().then(setSolicitudes);
  }, []);

  console.log(solicitudes)
  return (
    <>
      <div className="mb-10">
        <div className="text-gray-600 font-bold text-2xl mb-3">Solicitudes de practicantes</div>
        <span className="text-gray-600 font-light text-md">
          Aquí podrás ver las solicitudes de practicantes vigentes y finalizadas, así como crear una nueva solicitud.
        </span>
        <AlertComponent />
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

              <li className="flex justify-between gap-x-6 py-5">
                <Disclosure as="div" className="p-3 w-full">
                  <DisclosureButton className="group flex w-full items-center justify-between">       

                <div className="flex min-w-0 gap-x-4">
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time></p>
                    </div>
                    <IoChevronDown className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />

                  </DisclosureButton>
                </Disclosure>
              </li>
            </ul>
          </div>
        )
      }
      {
        tab === 1 && (
          <Form {...form}>
            <h2
              className="text-md font-bold mb-5"
            >Formulario de solicitud de practicantes</h2> 
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <AreasDeInteresForm />

              </div>
              <div>

                <div className="mt-10">
                  <div className="text-sm text-gray-900 mb-2">
                    Seleccione las herramientas y/o conocimientos que maneja de las
                    siguientes subcategorias (solo si aplica).
                  </div>
                  <HerramientasForm />
                </div>
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