import { useForm } from 'react-hook-form';
import { Button, ErrorMessage, FileUpload, Input, Label } from '../../components/ui';
import { GeneroListbox } from '../../components/genero/GeneroListbox';
import { TipoDocumentoListbox } from '../../components/documento-identidad/TipoDocumentoListbox';

export const RegistroPage = () => {
  const { register, handleSubmit, control, setValue, trigger, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // const response = await fetchPostEmpresa(data);
      // login(response.usuario);
      console.log(data);
    } catch (error) {
      alert("Ocurrio un error:" + error);
    }
  };

  return (
    <div className="py-20 px-12 sm:py-24 sm:px-24">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Informacion del estudiante
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Por favor, completa la siguiente información esencial para conocer
              mejor al estudiante.
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
                <Label htmlFor="codigo">Codigo</Label>
                <div className="mt-2">
                  <Input
                    id="codigo"
                    type="number"
                    autoComplete="codigo"
                    {...register("codigo")}
                  />
                  <ErrorMessage errors={errors} name="codigo"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                <div className="mt-2">
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    autoComplete="fechaNacimiento"
                    {...register("fechaNacimiento")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="fechaNacimiento"
                  ></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <GeneroListbox control={control} name="genero" />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="departamentoResidencia">Departamento</Label>
                <div className="mt-2">
                  <Input
                    id="departamentoResidencia"
                    autoComplete="departamentoResidencia"
                    {...register("departamentoResidencia")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="departamentoResidencia"
                  ></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="municipioResidencia">Municipio</Label>
                <div className="mt-2">
                  <Input
                    id="municipioResidencia"
                    autoComplete="municipioResidencia"
                    {...register("municipioResidencia")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="municipioResidencia"
                  ></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-2">
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

              <div className="sm:col-span-2">
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

              <div className="sm:col-span-2">
                <Label htmlFor="telefonoHogar">Telefono Hogar (Opcional)</Label>
                <div className="mt-2">
                  <Input
                    id="telefonoHogar"
                    autoComplete="telefonoHogar"
                    {...register("telefonoHogar")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="telefonoHogar"
                  ></ErrorMessage>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label htmlFor="numeroDocumento">Numero Documento</Label>
                <div className="mt-2">
                  <Input
                    id="numeroDocumento"
                    type="number"
                    autoComplete="numeroDocumento"
                    {...register("numeroDocumento")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="numeroDocumento"
                  ></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <TipoDocumentoListbox control={control} name="tipoDocumento" />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="lugarExpedicion">Lugar Expedición</Label>
                <div className="mt-2">
                  <Input
                    id="lugarExpedicion"
                    autoComplete="lugarExpedicion"
                    {...register("lugarExpedicion")}
                  />
                  <ErrorMessage errors={errors} name="lugarExpedicion"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="fechaExpedicionDocumento">Fecha de Expedicion</Label>
                <div className="mt-2">
                  <Input
                    id="fechaExpedicionDocumento"
                    type="date"
                    autoComplete="fechaExpedicionDocumento"
                    {...register("fechaExpedicionDocumento")}
                  />
                  <ErrorMessage errors={errors} name="fechaExpedicionDocumento"></ErrorMessage>
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

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-3">
                
              </div>
            </div>
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
