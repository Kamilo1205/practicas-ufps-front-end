import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { estudianteSchema } from '../../schemas/estudianteSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/Input/Form';
import { Button, Input } from '../../components/ui';
import { PhoneInput } from '../../components/ui/PhoneInput';
import {
  CiudadCombobox,
  DepartamentoCombobox,
  EpsCombobox,
  GeneroListbox,
  TipoAfiliacionListbox,
  TipoDocumentoListbox,
} from '../../components/form';
import useEstudiantes from '../../hooks/useEstudiantes';
import { FileInput } from '../../components/ui/Input/FileInput';
import { AreasDeInteresForm, HerramientasForm } from '../../components/area-interes';

export const RegistroPage = () => {
  const form = useForm({ 
    resolver: zodResolver(estudianteSchema) 
  });

  const selectedDepartamento = form.watch("departamentoResidenciaId");
  const watch = form.watch() as Record<string, any>;
  const { createEstudiante, cargando, error } = useEstudiantes();

  console.log(error);
  console.log(form.formState.errors);
  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        areasInteres: Object.entries(data.areasInteres).map(([areaInteresId, nivelInteres]) => ({
          areaInteresId,
          nivelInteres: parseInt(nivelInteres as string, 10),
        })),
        herramientas: Object.entries(data.herramientas)
          .filter(([, value]) => value)
          .map(([herramientaId]) => herramientaId),
      };

      const response = await createEstudiante(formattedData);
      console.log(response);
      console.log("data", data);
    } catch (error) {
      console.log(error);
      alert("Ocurrio un error:" + error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-12 relative">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Informacion del estudiante
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Por favor, completa la siguiente información esencial para
                conocer mejor al estudiante.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Nombres */}
                <div className="sm:col-span-3">
                  <FormField
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre/s</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Apellidos */}
                <div className="sm:col-span-3">
                  <FormField
                    name="apellidos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellidos</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Fecha de Nacimiento */}
                <div className="lg:col-span-2 sm:col-span-3">
                  <FormField
                    name="fechaNacimiento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Genero */}
                <div className="lg:col-span-2 sm:col-span-3">
                  <FormField
                    name="genero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genero</FormLabel>
                        <FormControl>
                          <GeneroListbox {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Telefono */}
                <div className="lg:col-span-2 sm:col-span-3">
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

                {/* Departamento Residencia */}
                <div className="lg:col-span-2 sm:col-span-3">
                  <FormField
                    name="departamentoResidenciaId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departamento de Residencia</FormLabel>
                        <FormControl>
                          <DepartamentoCombobox
                            paisNombre="Colombia"
                            {...field}
                            onChange={(value) => {
                              field.onChange(value);
                              form.setValue("ciudadResidenciaId", "");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Ciudad */}
                <div className="lg:col-span-2 sm:col-span-3">
                  <FormField
                    name="ciudadResidenciaId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad de Residencia</FormLabel>
                        <FormControl>
                          <CiudadCombobox
                            departamentoId={selectedDepartamento}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Dirección */}
                <div className="sm:col-span-4">
                  <FormField
                    name="direccionResidencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Telefono Hogar */}
                <div className="sm:col-span-2">
                  <FormField
                    name="telefonoHogar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefono Hogar (Opcional)</FormLabel>
                        <FormControl>
                          <PhoneInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-full">
                  <p className="text-sm leading-6 text-gray-600">
                    Para hacer más eficiente el proceso de registro, le
                    solicitamos que revise minuciosamente la información que
                    planea proporcionar, asegurándose de que sea precisa y
                    válida, con el objetivo de evitar errores
                  </p>
                </div>

                {/* Número de documento de identidad */}
                <div className="sm:col-span-3">
                  <FormField
                    name="numeroDocumento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de documento de identidad</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tipo de documento */}
                <div className="sm:col-span-3">
                  <FormField
                    name="tipoDocumentoId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de documento de identidad</FormLabel>
                        <FormControl>
                          <TipoDocumentoListbox {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Fecha de expedición */}
                <div className="sm:col-span-3">
                  <FormField
                    name="fechaExpedicionDocumento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha Expedición Documento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Lugar de expedición */}
                <div className="sm:col-span-3">
                  <FormField
                    name="lugarExpedicionDocumentoId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lugar Expedición Documento</FormLabel>
                        <FormControl>
                          <CiudadCombobox {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-full">
                  <p className="text-sm leading-6 text-gray-600">
                    Para obtener la información sobre la fecha de afiliación a
                    su empresa prestadora de salud y obtener el certificado de
                    afiliación, por favor consulte el siguiente enlace:
                    <a
                      href="https://www.adres.gov.co/consulte-su-eps"
                      className="ml-1 text-gray-900 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Consulta sobre tu Afiliación
                    </a>
                    . Asegúrese de tener a mano la información necesaria para
                    completar la consulta en línea.
                  </p>
                </div>

                {/* Empresa Prestadora de Salud */}
                <div className="sm:col-span-3">
                  <FormField
                    name="epsId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Empresa Prestadora de Salud</FormLabel>
                        <FormControl>
                          <EpsCombobox {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tipo de afiliacion */}
                <div className="sm:col-span-3">
                  <FormField
                    name="tipoAfiliacionEpsId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Afiliación</FormLabel>
                        <FormControl>
                          <TipoAfiliacionListbox {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Fecha de Afiliación */}
                <div className="sm:col-span-3">
                  <FormField
                    name="fechaAfiliacionEps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Afiliación</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Nit de fondo de pensión */}
                <div className="sm:col-span-3">
                  <FormField
                    name="nitFondoPension"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nit de Fondo de Pensión (Opcional)
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-full">
                  <p className="text-sm leading-6 text-gray-600">
                    A continuación registre su información académica, así como
                    sus áreas de interés y los conocimientos/herramienstas que
                    manejan adecuadamente.
                  </p>
                </div>

                {/* Semestre Matriculado */}
                <div className="sm:col-span-3">
                  <FormField
                    name="semestreMatriculado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semestre Matriculado</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Codigo */}
                <div className="sm:col-span-3">
                  <FormField
                    name="codigo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Codigo</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Grupo de práctica matriculado */}
                <div className="sm:col-span-3">
                  <FormField
                    name="grupoMatriculado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grupo de Prácticas Matriculado</FormLabel>
                        <FormControl>
                          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6 text-sm">
                            <label className="flex items-center">
                              <input type="radio" {...field} value="grupoA" />
                              <span className="ml-2">Grupo A</span>
                            </label>
                            <label className="flex items-center">
                              <input type="radio" {...field} value="grupoB" />
                              <span className="ml-2">Grupo B</span>
                            </label>
                            <label className="flex items-center">
                              <input type="radio" {...field} value="grupoC" />
                              <span className="ml-2">Grupo C</span>
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="mt-10">
                <AreasDeInteresForm />
              </div>

              <div className="mt-10">
                <div className="text-sm text-gray-900 mb-2">
                  Seleccione las herramientas y/o conocimientos que maneja de las
                  siguientes subcategorias (solo si aplica).
                </div>
                <HerramientasForm />
              </div>

              <div className="mt-10 space-y-4">
                <div className="font-medium">Documentos</div>
                <div className="sm:rounded-lg ring-1 ring-gray-300 overflow-x-auto sm:mx-0 -mx-12">
                  <table className="relative min-w-full">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="min-w-72 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Nombre del Archivo a Subir
                        </th>
                        <th
                          scope="col"
                          className="min-w-72 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 table-cell sm:pl-6"
                        >
                          Archivo Subido
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 sm:pr-6">
                          <span className="sr-only">Seleccionar</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "documentoIdentidad",
                          label: "Documento de identidad",
                        },
                        {
                          name: "certificadoAfiliacionEps",
                          label: "Certificado de afiliación EPS",
                        },
                        { name: "horarioClase", label: "Horario de clase" },
                        { name: "hojaDeVida", label: "Hoja de vida" },
                      ].map((input) => (
                        <tr key={input.name}>
                          <td className="py-2 border-t border-gray-200 pl-4 pr-3 text-sm sm:pl-6">
                            {input.label}
                          </td>
                          <td className="py-2 border-t border-gray-200 pl-4 pr-3 text-sm sm:pl-6">
                            {watch[input.name]?.name ||
                              "Ningún archivo seleccionado"}
                          </td>
                          <td className="py-2 border-t border-gray-200 pl-4 pr-3 text-sm sm:pl-6">
                            <FormField
                              name={input.name}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <>
                                      <FileInput
                                        variant="button"
                                        accept="application/pdf"
                                        buttonClassName="w-32"
                                        onFileChange={(files) => {
                                          const file = files[0];
                                          if (file) field.onChange(file);
                                        }}
                                      >
                                        Seleccionar
                                      </FileInput>
                                    </>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </>
  );
};
