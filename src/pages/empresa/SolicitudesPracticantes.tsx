import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAuth } from "../../contexts";
import useAreasDeInteres from "../../hooks/useAreasInteres";
import { useSolicitudes } from "../../hooks/useSolicitudes";

import { HerramientasForm } from "../../components/area-interes";
import { DialogComponent } from "../../components/ui/Dialog/DialogComponent";
import { EmptyStateMessage } from "../../components/estudiantes";
import { Form } from "../../components/ui/Input/Form";
import { SolicitudComponent } from "../../components/solicitudes/SolicitudComponent";
import { TabComponent } from "../../components/ui/Tab/TabComponent";

import { Solicitud } from "../../schemas/solicitudSchema";
import { TablaSolicitudesComponent } from "../../components/solicitudes/TablaSolicitudesComponent";

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
              <p>Solamente puede solicitar un máximo de   <span className="font-bold">3 practicantes</span> por semestre.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;

export const SolicitudesPracticantes = () => {

  const { solicitudes, createSolicitud, eliminarSolicitud } = useSolicitudes()
  const [tab, setTab] = useState(0)
  const [mostrarSolicitud, setMostrarSolicitud] = useState(false)
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<Solicitud | null>(null)
  const cantidadPracticantes = solicitudes.reduce((acumulador, numPracticantes) =>
    acumulador + numPracticantes.cantidadPracticantes, 0)
  console.log('solicitudes', solicitudes)

  const { areas } = useAreasDeInteres()
  const { user } = useAuth()
  //console.log(user)

  //console.log(areas)

  const form = useForm({
    defaultValues: {
      areasInteres: [],
      numeroPracticantes: "1",
      remuneracion: false,
      herramientas: [],
      id: user?.id
    },
    resolver: zodResolver(z.object({

      areaConocimiento: z.string().optional(),
      herramientas: z.array(z.string()).optional(),
      numeroPracticantes: z.string().refine((value) => {
        const parsedInt = parseInt(value)
        return !isNaN(parsedInt)
      }, { message: 'Se debe seleccionar un número.' }).
        refine((value) => {
          const parsedInt = parseInt(value)
          return parsedInt > 0 && parsedInt <= 3
        }, { message: 'Debe solicitar un mínimo de 1 y máximo de 3 practicantes.' }),
      remuneracion: z.boolean(),
      areasInteres: z.array(z.string())
        .min(1, { message: 'Debe seleccionar al menos una área de interés.' })
        .max(3, { message: 'Solo puede seleccionar un máximo de 3 áreas de interés.' }),
    }))
  });

  console.log('errores', form.formState.errors)
  console.log(form.getValues())
  //console.log(form.getValues())
  //const selectedDepartamento = form.watch("departamentoResidenciaId");
  // const watch = form.watch() as Record<string, any>;
  //  const { createEstudiante, cargando, error } = useEstudiantes();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('data', data)
    createSolicitud({
      areasInteresIds: data.areasInteres,
      herramientasIds: data.herramientas,
      cantidadPracticantes: String(data.numeroPracticantes),
      esRenumerado: data.remuneracion ? 'true' : 'false'
    })
    //console.log('solicitudRequest',solicitudRequest)
  }

  const onCancelarSolictud = (solicitudId: string) => {
    eliminarSolicitud(solicitudId)
  }

  const onMostrarSolicitud = (solicitud: Solicitud) => {
    setSolicitudSeleccionada(solicitud)
    setMostrarSolicitud(true)
  }

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
              name: 'Solicitudes de practicantes finalizadas'
            }
          ]}
        />
      </div>
      {
        tab === 0 && (
          <TablaSolicitudesComponent
            operable
            solicitudes={solicitudes.filter(solicitud => !solicitud.fechaEliminacion)}
            onCancelarSolictud={onCancelarSolictud}
            onMostrarSolicitud={onMostrarSolicitud}
          />
        )
      }
      {
        tab === 1 && (
          cantidadPracticantes >= 3 ?
            <EmptyStateMessage
              message="Ya haz alcanzado el máximo de practicantes que puedes solicitar por semestre."
              submesage=""

            /> : <Form {...form}>
              <h2
                className="text-md font-bold mb-5"
              >Formulario de solicitud de practicantes</h2>
              <AlertComponent />

              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                  <div className="flex space-x-3">
                    <label htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900 self-center"
                    >Número de practicantes solicitados para el perfil
                    </label>
                    <div className="mt-2">
                      <select

                        id="numero-practicantes-solicitud"
                        {...form.register("numeroPracticantes")}
                        autoComplete="numero-practicantes"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option itemType="number">1</option>
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
                          <input id="push-everything" type="radio"
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

                </div>
                <div className="mt-3">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Seleccione las áreas de interés de los practicantes que necesita.
                    </legend>
                    <div className="mt-6 space-y-2">
                      {
                        areas.map((area) =>
                          !area?.fechaEliminacion && !area?.areaPadre && <div key={area.id} className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id={area.id}

                                type="checkbox"
                                {...form.register(`areasInteres.${area.id}`)}
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
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />

                            </div>
                            <div className="text-sm leading-6">
                              <label htmlFor={area.id} className="font-normal text-gray-900">{area.nombre}</label>

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
                                  form.formState.errors.areasInteres.root?.message

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
                    <div className="text-sm text-gray-900 mb-5">
                      Seleccione las herramientas y/o conocimientos que el practicante debe manejar de las
                      siguientes sub categorías. <span className="font-semibold">Esto es opcional, puede no seleccionar nada</span>.
                    </div>
                    <HerramientasForm form={form} />

                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                >
                  Enviar solicitud
                </button>
              </form>
            </Form>
        )
      }
      {
        tab === 2 && (
          <div>
            <h2>Solicitudes de practicantes finalizadas</h2>

            <TablaSolicitudesComponent
              solicitudes={solicitudes.filter(solicitud => solicitud.fechaEliminacion)}
              onCancelarSolictud={onCancelarSolictud}
              onMostrarSolicitud={onMostrarSolicitud}
            />

          </div>

        )}


    </>)
}