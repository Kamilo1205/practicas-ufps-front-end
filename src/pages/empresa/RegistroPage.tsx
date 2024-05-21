import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { TfiDownload } from 'react-icons/tfi';
import { z } from 'zod';

import { empresaSchema } from '../../schemas';
import { ErrorMessage, FileUpload, Input, Label, TextArea } from '../../components/ui';
import { fetchPostEmpresa } from '../../api/empresa.api';
import { TipoDocumentos } from '../../components/documento-identidad';
import { fetchGetDocumentoConvenio } from '../../api/documento.api';
import { useAuth } from '../../contexts';

export const RegistroPage = () => {
  const { login } = useAuth();
  const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm<z.infer<typeof empresaSchema>>({
    resolver: zodResolver(empresaSchema),
  });

  const onSubmit = async (data: z.infer<typeof empresaSchema>) => {
    try {
      const response = await fetchPostEmpresa(data);
      login(response.usuario);
    } catch (error) {
      toast.error('Ocurrio un error');
    }
  };

  const downloadDocumento = async() => {
    const response = await fetchGetDocumentoConvenio();
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `convenio.docx`);

    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  const onFileChange = (campo: 'documentoIdentidad' | 'camara' | 'rut' | 'convenio', files: FileList) => {
    setValue(campo, files);
    trigger(campo);
  };

  return (
    <div className="py-20 px-12 sm:py-24 sm:px-24">
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
              <div className="sm:col-span-4">
                <Label htmlFor="nombre">Nombre</Label>
                <div className="mt-2">
                  <Input
                    id="nombre"
                    autoComplete="nombre"
                    {...register("nombre")}
                  />
                  <ErrorMessage errors={errors} name="nombre"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="nit">Nit</Label>
                <div className="mt-2">
                  <Input id="nit" autoComplete="nit" {...register("nit")} />
                  <ErrorMessage errors={errors} name="nit"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-full">
                <Label htmlFor="industria">Industria</Label>
                <div className="mt-2">
                  <Input
                    id="industria"
                    autoComplete="industria"
                    {...register("industria")}
                  />
                  <ErrorMessage errors={errors} name="industria"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="pais">Pais</Label>
                <div className="mt-2">
                  <Input id="pais" autoComplete="pais" {...register("pais")} />
                  <ErrorMessage errors={errors} name="pais"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="departamento">Departamento</Label>
                <div className="mt-2">
                  <Input
                    id="departamento"
                    autoComplete="departamento"
                    {...register("departamento")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="departamento"
                  ></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <div className="mt-2">
                  <Input
                    id="ciudad"
                    autoComplete="ciudad"
                    {...register("ciudad")}
                  />
                  <ErrorMessage errors={errors} name="ciudad"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="direccion">Dirección</Label>
                <div className="mt-2">
                  <Input
                    id="direccion"
                    autoComplete="direccion"
                    {...register("direccion")}
                  />
                  <ErrorMessage errors={errors} name="direccion"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="telefono">Telefono</Label>
                <div className="mt-2">
                  <Input
                    id="telefono"
                    autoComplete="telefono"
                    {...register("telefono")}
                  />
                  <ErrorMessage errors={errors} name="telefono"></ErrorMessage>
                </div>
              </div>

              <div className="col-span-full">
                <Label htmlFor="descripcion">Descripcion (Opcional)</Label>
                <div className="mt-2">
                  <TextArea
                    id="descripcion"
                    rows={3}
                    {...register("descripcion")}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Escribe una breve descripción de la empresa.
                </p>
                <ErrorMessage errors={errors} name="descripcion"></ErrorMessage>
              </div>

              <div className="col-span-full">
                <Label htmlFor="rut">Rut</Label>
                <FileUpload
                  id="rut"
                  onFileChange={(file) => onFileChange("rut", file)}
                />
                <ErrorMessage errors={errors} name="rut"></ErrorMessage>
              </div>

              <div className="col-span-full">
                <Label htmlFor="camara">Camara de comercio</Label>
                <FileUpload
                  id="camara"
                  onFileChange={(file) => onFileChange("camara", file)}
                />
                <ErrorMessage errors={errors} name="camara"></ErrorMessage>
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
              <div className="col-span-full">
                <Label htmlFor="representanteNombre">Nombre</Label>
                <div className="mt-2">
                  <Input
                    id="representanteNombre"
                    autoComplete="representanteNombre"
                    {...register("representanteNombre")}
                  />
                  <ErrorMessage errors={errors} name="representanteNombre"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-4">
                <Label htmlFor="representanteEmail">Correo electronico</Label>
                <div className="mt-2">
                  <Input
                    id="representanteEmail"
                    autoComplete="representanteEmail"
                    {...register("representanteEmail")}
                  />
                  <ErrorMessage errors={errors} name="representanteEmail"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="representanteTelefono">Telefono</Label>
                <div className="mt-2">
                  <Input
                    id="representanteTelefono"
                    autoComplete="representanteTelefono"
                    {...register("representanteTelefono")}
                  />
                  <ErrorMessage errors={errors} name="representanteTelefono"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="representanteNumeroIdentidad">Numero documento de identidad</Label>
                <div className="mt-2">
                  <Input
                    id="representanteNumeroIdentidad"
                    autoComplete="representanteNumeroIdentidad"
                    {...register("representanteNumeroIdentidad")}
                  />
                  <ErrorMessage errors={errors} name="representanteNumeroIdentidad"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <TipoDocumentos id="representanteTipoDocumentoId" {...register("representanteTipoDocumentoId")} />
                <ErrorMessage errors={errors} name="representanteTipoDocumentoId"></ErrorMessage>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="representanteFechaExpedicion">Fecha de expedición</Label>
                <div className="mt-2">
                  <Input
                    id="representanteFechaExpedicion"
                    type="date"
                    autoComplete="representanteFechaExpedicion"
                    {...register("representanteFechaExpedicion")}
                  />
                  <ErrorMessage errors={errors} name="representanteFechaExpedicion"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="representanteLugarExpedicion">Lugar expedición</Label>
                <div className="mt-2">
                  <Input
                    id="representanteLugarExpedicion"
                    autoComplete="representanteLugarExpedicion"
                    {...register("representanteLugarExpedicion")}
                  />
                  <ErrorMessage errors={errors} name="representanteLugarExpedicion"></ErrorMessage>
                </div>
              </div>

              <div className="col-span-full">
                <Label htmlFor="documentoIdentidad">Documento de Identidad</Label>
                <FileUpload
                  id="documentoIdentidad"
                  onFileChange={(file) => onFileChange("documentoIdentidad", file)}
                />
                <ErrorMessage errors={errors} name="documentoIdentidad"></ErrorMessage>
              </div>
            </div>
          </div>
          <div className="pb-10">
            <div className="col-span-full mb-4">
              <div
                onClick={downloadDocumento}
                className="flex items-center gap-3 bg-gray-100/80 text-gray-950 border text-sm border-gray-200 p-4 rounded-md cursor-pointer">
                <TfiDownload /> 
                Descargar documento de convenio
              </div>
            </div>
            <div className="col-span-full">
                <Label htmlFor="convenio">Convenio</Label>
                <FileUpload
                  id="convenio"
                  onFileChange={(file) => onFileChange("convenio", file)}
                />
                <ErrorMessage errors={errors} name="convenio"></ErrorMessage>
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
    </div>
  );
};
