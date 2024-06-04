import { Controller, UseFormReturn, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { TfiDownload } from 'react-icons/tfi';

import { EmpresaSchema, empresaSchema } from '../../schemas';
import { ErrorMessage, Input, TextArea } from '../../components/ui';
import { fetchPostEmpresa } from '../../api/empresa.api';
import { TipoDocumentoListbox } from '../../components/documento-identidad';
import { fetchGetDocumentoConvenio } from '../../api/documento.api';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/Input/Form';
import { CiudadCombobox, DepartamentoCombobox, IndustriaCombobox, PaisCombobox } from '../../components/form';
import { PhoneInput } from '../../components/ui/PhoneInput';

export const RegistroPage = () => {
  const form: UseFormReturn<EmpresaSchema> = useForm<EmpresaSchema>({
    resolver: zodResolver(empresaSchema)
  });
  const { handleSubmit, control, watch, setValue, formState: { errors } } = form;
  const selectedPais = watch('paisId');
  const selectedDepartamento = watch('departamentoId');

  const onSubmit = async (data: EmpresaSchema) => {
    try {
      const response = await fetchPostEmpresa(data);
      // login(response.usuario);
      console.log(data);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Ocurrio un error");
    }
  };

  console.log(errors);

  const downloadDocumento = async () => {
    const response = await fetchGetDocumentoConvenio();
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `convenio.docx`);

    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Informacion de la empresa
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Esta información es indispensable para conocer la empresa.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Nombre */}
                <div className="col-span-full">
                  <FormField 
                    name="nombre" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>

                {/* Industria */}
                <div className="sm:col-span-4">
                  <FormField 
                    name="industriaId" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industria</FormLabel>
                        <FormControl>
                          <IndustriaCombobox {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>

                {/* Nit */}
                <div className="sm:col-span-2">
                  <FormField 
                    name="nit" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nit</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>

                {/* Pais */}
                <div className="sm:col-span-2">
                  <FormField 
                    name="paisId" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pais</FormLabel>
                        <FormControl>
                          <PaisCombobox 
                            {...field} 
                            onChange={(value) => {
                              field.onChange(value);
                              form.setValue('departamentoId', '');
                              form.setValue('ciudadId', '');
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>

                {/* Departamento */}
                <div className="sm:col-span-2">
                  <FormField 
                    name="departamentoId" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departamento</FormLabel>
                        <FormControl>
                          <DepartamentoCombobox 
                            paisId={selectedPais} 
                            {...field} 
                            onChange={(value) => {
                              field.onChange(value);
                              form.setValue('ciudadId', '');
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>

                {/* Ciudad */}
                <div className="sm:col-span-2">
                 <FormField 
                    name="ciudadId" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <CiudadCombobox departamentoId={selectedDepartamento} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>

                {/* Dirección */}
                <div className="sm:col-span-3">
                  <FormField 
                    name="direccion" 
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

                {/* Telefono */}
                <div className="sm:col-span-3">
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

                {/* Descripción */}
                <div className="col-span-full">
                  <FormField 
                    name="descripcion" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción (Opcional)</FormLabel>
                        <FormControl>
                          <TextArea rows={3} {...field}/>
                        </FormControl>
                        <FormDescription>Escribe una breve descripción de la empresa.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Representante legal
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Utilice una dirección permanente donde pueda recibir correo.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Nombre */}
                <div className="col-span-full">
                  <FormField 
                    name="representante.nombre" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>

                {/* Correo electronico */}
                <div className="sm:col-span-4">
                  <FormField 
                    name="representante.email" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo eléctronico</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>

                {/* Telefono */}
                <div className="sm:col-span-2">
                  <FormField 
                    name="representante.telefono" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefono</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>

                {/* Número de documento de identidad */}
                <div className="sm:col-span-3">
                  <FormField 
                    name="representante.numeroDocumento" 
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
                  <TipoDocumentoListbox
                    control={control}
                    name="representanteTipoDocumento"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="representanteTipoDocumento"
                  ></ErrorMessage>
                </div>

                {/* Fecha de expedición */}
                <div className="sm:col-span-3">
                  <FormField 
                    name="representante.fechaExpedicionDocumento" 
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
                    name="representante.lugarExpedicionDocumento" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lugar Expedición Documento</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>
              </div>
            </div>

            <div className="pb-10">
              <div className="font-medium">Documentos</div>
              <div className="my-4">
                <div
                  onClick={downloadDocumento}
                  className="flex items-center gap-3 bg-gray-100/80 text-gray-950 border text-sm border-gray-200 p-4 rounded-md cursor-pointer"
                >
                  <TfiDownload />
                  Descargar documento de convenio
                </div>
              </div>
              <div className="text-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-gray-300">
                    <thead>
                      <tr>
                        <th className="min-w-72 text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                          Nombre del Archivo a Subir
                        </th>
                        <th className="min-w-72 text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                          Subir
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 text-sm">Cámara de Comercio</td>
                        <td className="py-2 text-sm">
                          <Controller
                            control={control}
                            name="camara"
                            render={({ field }) => (
                              <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => {
                                  const file =
                                    e.target.files && e.target.files[0];
                                  if (file) field.onChange(file);
                                }}
                              />
                            )}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="camara"
                          ></ErrorMessage>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm">Rut</td>
                        <td className="py-2 text-sm">
                          <Controller
                            control={control}
                            name="rut"
                            render={({ field }) => (
                              <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => {
                                  const file =
                                    e.target.files && e.target.files[0];
                                  if (file) field.onChange(file);
                                }}
                              />
                            )}
                          />
                          <ErrorMessage errors={errors} name="rut"></ErrorMessage>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm">
                          Documento de identidad del representante legal
                        </td>
                        <td className="py-2 text-sm">
                          <Controller
                            control={control}
                            name="documentoIdentidad"
                            render={({ field }) => (
                              <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => {
                                  const file =
                                    e.target.files && e.target.files[0];
                                  if (file) field.onChange(file);
                                }}
                              />
                            )}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="documentoIdentidad"
                          ></ErrorMessage>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm">Solicitud de convenio</td>
                        <td className="py-2 text-sm">
                          <Controller
                            control={control}
                            name="convenio"
                            render={({ field }) => (
                              <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => {
                                  const file =
                                    e.target.files && e.target.files[0];
                                  if (file) field.onChange(file);
                                }}
                              />
                            )}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="convenio"
                          ></ErrorMessage>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </Form>
    </>
  );
};
