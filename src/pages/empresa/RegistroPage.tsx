import { UseFormReturn, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { TfiDownload } from 'react-icons/tfi';

import { EmpresaSchema, empresaSchema } from '../../schemas';
import { Button, Input, TextArea } from '../../components/ui';
import { fetchPostEmpresa } from '../../api/empresa.api';
import { fetchGetDocumentoConvenio } from '../../api/documento.api';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/Input/Form';
import { CiudadCombobox, DepartamentoCombobox, IndustriaCombobox, PaisCombobox, TipoDocumentoListbox } from '../../components/form';
import { PhoneInput } from '../../components/ui/PhoneInput';
import { FileInput } from '../../components/ui/Input/FileInput';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DialogComponent } from '../../components/ui/Dialog/DialogComponent';
import { RegistroDependencia } from './RegistroDependencia';
import Swal from 'sweetalert2';

export const RegistroPage = () => {
  const form: UseFormReturn<EmpresaSchema> = useForm<EmpresaSchema>({
    resolver: zodResolver(empresaSchema),
  });
  const selectedPais = form.watch("paisId");
  const selectedDepartamento = form.watch("departamentoId");
  const watch = form.watch() as Record<string, any>;
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(true);
  const [esDependencia, setEsDependencia] = useState<boolean | null>(null);


  const onSubmit = async (data: EmpresaSchema) => {
    setLoading(true);
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espere.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const response = await fetchPostEmpresa(data);
    if (response) {
      toast.success("Empresa registrada correctamente");
      setLoading(false);
      Swal.close();
      location.reload();

    }
  };

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

  if (loading) {
    return <div className="flex justify-center items-center h-screen content-center">
      <div className="animate-spin rounded-full h-11 w-11 border-t-2 border-b-2 border-blue-900"></div>
    </div>
  }

  return (
    <>
      <DialogComponent
        size='lg'
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        title='Formato de solicitud de convenio para rellenar'
        content={<>
          <p className='mt-2'>Al final del formulario se le pedirá que cargue la solicitud de convenio con los datos de su empresa, a continuación puede descargarlo.</p>
          <div className="my-4">
            <div
              onClick={downloadDocumento}
              className="flex items-center gap-3 bg-gray-100/80 text-gray-950 border text-sm border-gray-200 p-4 rounded-md cursor-pointer"
            >
              <TfiDownload />
              <span className='font-semibold'>Descargar formato de solicitud de convenio para rellenar</span>
            </div>
          </div>
          <button
            onClick={() => setOpenDialog(false)}
            className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600'
          >Cerrar
          </button>
        </>}
      />
      <div className='mb-5'>
        <p className='font-semibold'> ¿Es su empresa una dependencia de la UFPS?</p>
        <div className="mt-2">
          <select
            id="esDependencia-select"
            name="esDependencia"
            onChange={(e) => {
              const value = e.target.value;
              const esDependencia = value === 'Si' ? true : value === 'No' ? false : null;
              setEsDependencia(esDependencia)
            }}
            autoComplete="numero-practicantes"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
            <option itemType="text">Seleccionar...</option>
            <option>No</option>
            <option>Si</option>
          </select>
        </div>

      </div>
      {
        esDependencia !== null && <>
          {
            esDependencia ? (<>
              <RegistroDependencia />
            </>) : (<>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Informacion de la empresa
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Esta información es indispensable para conocer la empresa.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* Nombre Legal */}
                        <div className="sm:col-span-3">
                          <FormField
                            name="nombreLegal"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre Legal</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Nombre Comercial */}
                        <div className="sm:col-span-3">
                          <FormField
                            name="nombreComercial"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre Comercial (Opcional)</FormLabel>
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
                                      form.setValue("departamentoId", "");
                                      form.setValue("ciudadId", "");
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
                                      form.setValue("ciudadId", "");
                                    }} />
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
                        <div className="sm:col-span-2">
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
                                  <TextArea rows={3} {...field} />
                                </FormControl>
                                <FormDescription>
                                  Escribe una breve descripción de la empresa.
                                </FormDescription>
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
                        <div className="sm:col-span-3">
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

                        {/* Nombre */}
                        <div className="sm:col-span-3">
                          <FormField
                            name="representante.apellido"
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
                                  <PhoneInput {...field} />
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
                          <FormField
                            name="representante.tipoDocumentoId"
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
                            name="representante.lugarExpedicionDocumentoId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Lugar Expedición Documento</FormLabel>
                                <FormControl>
                                  <CiudadCombobox general {...field} />
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
                      <p>
                        A continuación debe cargar los documentos necesarios para el registro de su empresa.
                        <span className='font-semibold'> Debe descargar el formato de solicitud de convenio que debe llenar y cargar a continuación.</span>
                      </p>
                      <div className="my-4">
                        <div
                          onClick={downloadDocumento}
                          className="flex items-center gap-3 bg-gray-100/80 text-gray-950 border text-sm border-gray-200 p-4 rounded-md cursor-pointer"
                        >
                          <TfiDownload />
                          <span className='font-semibold'>Descargar formato de solicitud de convenio para rellenar</span>
                        </div>
                      </div>
                      <div className="sm:rounded-lg ring-1 ring-gray-300 overflow-x-auto sm:mx-0 -mx-12">
                        <table className="relative min-w-full">
                          <thead>
                            <tr>
                              <th scope="col" className="min-w-72 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Nombre del Archivo a Subir
                              </th>
                              <th scope="col" className="min-w-72 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 table-cell sm:pl-6">
                                Archivo Subido
                              </th>
                              <th scope="col" className="py-3.5 pl-4 pr-3 sm:pr-6">
                                <span className="sr-only">Seleccionar</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: "camara", label: "Cámara de Comercio" },
                              { name: "rut", label: "Rut" },
                              { name: "documentoIdentidad", label: "Documento de identidad del representante legal" },
                              { name: "convenio", label: "Solicitud de convenio" },
                            ].map((input) => (
                              <tr key={input.name}>
                                <td className="py-2 border-t border-gray-200 pl-4 pr-3 text-sm sm:pl-6">
                                  {input.label}
                                </td>
                                <td className="py-2 border-t border-gray-200 pl-4 pr-3 text-sm sm:pl-6">
                                  {watch[input.name]?.name || "Ningún archivo seleccionado"}
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

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button type="submit">
                      Guardar
                    </Button>
                  </div>
                </form>
              </Form>
            </>)
          }
        </>

      }
    </>
  );
};
