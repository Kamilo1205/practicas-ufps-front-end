import { useForm } from 'react-hook-form';
import { Button, ErrorMessage, FileUpload, Input, Label } from '../../components/ui';
import { GeneroListbox } from '../../components/genero';
import { TipoDocumentoListbox } from '../../components/documento-identidad';
import { EpsCombobox, TipoAfiliacionListbox } from '../../components/eps';
import { AreasInteres } from '../../components/area-interes/AreasInteres';

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
              <div className="sm:col-span-3">
                <Label htmlFor="primerNombre">Primer Nombre</Label>
                <div className="mt-2">
                  <Input
                    id="primerNombre"
                    autoComplete="primerNombre"
                    {...register("primerNombre")}
                  />
                  <ErrorMessage errors={errors} name="primerNombre"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="segundoNombre">Segundo Nombre</Label>
                <div className="mt-2">
                  <Input
                    id="segundoNombre"
                    autoComplete="segundoNombre"
                    {...register("segundoNombre")}
                  />
                  <ErrorMessage errors={errors} name="segundoNombre"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="primerApellido">Primer Apellido</Label>
                <div className="mt-2">
                  <Input
                    id="primerApellido"
                    autoComplete="primerApellido"
                    {...register("primerApellido")}
                  />
                  <ErrorMessage errors={errors} name="primerApellido"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="segundoApellido">Segundo Apellido</Label>
                <div className="mt-2">
                  <Input
                    id="segundoApellido"
                    autoComplete="segundoApellido"
                    {...register("segundoApellido")}
                  />
                  <ErrorMessage errors={errors} name="segundoApellido"></ErrorMessage>
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
                <Label htmlFor="departamentoResidencia">Departamento de Residencia</Label>
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
                <Label htmlFor="municipioResidencia">Municipio de Residencia</Label>
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
                <Label htmlFor="telefono">Numero móvil</Label>
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
              <div className="col-span-full">
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Para obtener la información sobre la fecha de afiliación a su empresa prestadora de salud y obtener el certificado de afiliación, 
                  por favor consulte el siguiente enlace:
                    <a href="https://www.adres.gov.co/consulte-su-eps" className="ml-1 text-gray-900 font-medium" target="_blank" rel="noopener noreferrer">
                      Consulta sobre tu Afiliación
                    </a>.
                  Asegúrese de tener a mano la información necesaria para completar la consulta en línea.
                </p>
              </div>

              <div className="sm:col-span-3">
                <EpsCombobox control={control} name="eps" />
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="fechaAfiliacionEps">Fecha de Afiliacion</Label>
                <div className="mt-2">
                  <Input
                    id="fechaAfiliacionEps"
                    type="date"
                    autoComplete="fechaAfiliacionEps"
                    {...register("fechaAfiliacionEps")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="fechaAfiliacionEps"
                  ></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <TipoAfiliacionListbox control={control} name="tipoAfiliacionEps"/>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="nitFondoPension">NIT de fondo de pension (Opcional)</Label>
                <div className="mt-2">
                  <Input
                    id="nitFondoPension"
                    autoComplete="nitFondoPension"
                    {...register("nitFondoPension")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="nitFondoPension"
                  ></ErrorMessage>
                </div>
              </div>

              <div className="col-span-full">
                <Label htmlFor="certificadoAfiliacionEps">Certificado de Afiliación</Label>
                <FileUpload
                  id="certificadoAfiliacionEps"
                  onFileChange={(file) => onFileChange("certificadoAfiliacionEps", file)}
                />
                <ErrorMessage errors={errors} name="certificadoAfiliacionEps"></ErrorMessage>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label htmlFor="semestreMatriculado">Semestre Matriculado</Label>
                <div className="mt-2">
                  <Input
                    id="semestreMatriculado"
                    type="number"
                    autoComplete="semestreMatriculado"
                    {...register("semestreMatriculado")}
                  />
                  <ErrorMessage errors={errors} name="semestreMatriculado"></ErrorMessage>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="grupoMatriculado">Grupo de Practicas Matriculado</Label>
                <div className="mt-3.5 sm:flex sm:gap-x-16 sm:items-center">
                  <div className="flex items-center">
                    <input id="grupoA" className="cursor-pointer" type="radio" {...register("grupoMatriculado")} value="grupoA" defaultChecked/>
                    <Label htmlFor="grupoA" className="ml-3">Grupo A</Label>
                  </div>
                  <div className="flex items-center">
                    <input id="grupoB" className="cursor-pointer" type="radio" {...register("grupoMatriculado")} value="grupoB"/>
                    <Label htmlFor="grupoB" className="ml-3">Grupo B</Label>
                  </div>
                  <div className="flex items-center">
                    <input id="grupoC" className="cursor-pointer" type="radio" {...register("grupoMatriculado")} value="grupoC"/>
                    <Label htmlFor="grupoC" className="ml-3">Grupo C</Label>
                  </div>
                  <ErrorMessage errors={errors} name="grupoMatriculado"></ErrorMessage>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <AreasInteres />
              </div>
            </div>
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};