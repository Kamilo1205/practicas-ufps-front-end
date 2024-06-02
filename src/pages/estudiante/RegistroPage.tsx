import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { GeneroListbox } from '../../components/genero';
import { Button, ErrorMessage, Input, Label } from '../../components/ui';
import { AreaInteres } from '../../interfaces/area-interes';
import { TipoDocumentoListbox } from '../../components/documento-identidad';
import { EpsCombobox, TipoAfiliacionListbox } from '../../components/eps';
import { AreasInteres } from '../../components/area-interes/AreasInteres';
import { estudianteSchema } from '../../schemas/estudianteSchema';
import { fetchGetAreasDeInteresData } from '../../api/areasInteres.api';
import { fetchPostEstudiante } from '../../api/estudiante.api';

export const RegistroPage = () => {
  const [areasInteres, setAreasInteres] = useState<AreaInteres[]>([]);
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(estudianteSchema),
    values: {
      areasInteres: areasInteres.map(area => ({ 
        ...area, 
        level: 1,
        areaSubArea: area?.areaSubArea?.map(subArea => ({
          ...subArea,
          herramientas: subArea.herramientas.map(herramienta => ({
            ...herramienta,
            selected: false,
          })),
        }))
      })),
    },
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const areaInteres = await fetchGetAreasDeInteresData();
      setAreasInteres(areaInteres);
    };
    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const response = await fetchPostEstudiante(data);
      console.log(data);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Ocurrio un error:" + error);
    }
  };

  console.log(errors);

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
              {/* Primer Nombre */}
              <div className="sm:col-span-3">
                <Label htmlFor="primerNombre">Primer Nombre</Label>
                <div className="mt-2">
                  <Input
                    id="primerNombre"
                    className="capitalize"
                    autoComplete="primerNombre"
                    {...register("primerNombre")}
                  />
                  <ErrorMessage errors={errors} name="primerNombre"></ErrorMessage>
                </div>
              </div>

              {/* Segundo Nombre */}
              <div className="sm:col-span-3">
                <Label htmlFor="segundoNombre">Segundo Nombre</Label>
                <div className="mt-2">
                  <Input
                    id="segundoNombre"
                    className="capitalize"
                    autoComplete="segundoNombre"
                    {...register("segundoNombre")}
                  />
                  <ErrorMessage errors={errors} name="segundoNombre"></ErrorMessage>
                </div>
              </div>

              {/* Primer Apellido */}
              <div className="sm:col-span-3">
                <Label htmlFor="primerApellido">Primer Apellido</Label>
                <div className="mt-2">
                  <Input
                    id="primerApellido"
                    className="capitalize"
                    autoComplete="primerApellido"
                    {...register("primerApellido")}
                  />
                  <ErrorMessage errors={errors} name="primerApellido"></ErrorMessage>
                </div>
              </div>

              {/* Segundo Nombre */}
              <div className="sm:col-span-3">
                <Label htmlFor="segundoApellido">Segundo Apellido</Label>
                <div className="mt-2">
                  <Input
                    id="segundoApellido"
                    className="capitalize"
                    autoComplete="segundoApellido"
                    {...register("segundoApellido")}
                  />
                  <ErrorMessage errors={errors} name="segundoApellido"></ErrorMessage>
                </div>
              </div>

              {/* Fecha de Nacimiento */}
              <div className="sm:col-span-3 lg:col-span-2">
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

              {/* Genero */}
              <div className="sm:col-span-3 lg:col-span-2">
                <GeneroListbox control={control} name="genero" />
                <ErrorMessage
                  errors={errors}
                  name="genero"
                ></ErrorMessage>
              </div>

              {/* Numero Movil */}
              <div className="sm:col-span-3 lg:col-span-2">
                <Label htmlFor="telefono">Número móvil</Label>
                <div className="mt-2">
                  <Input
                    id="telefono"
                    autoComplete="telefono"
                    {...register("telefono")}
                  />
                  <ErrorMessage errors={errors} name="telefono"></ErrorMessage>
                </div>
              </div>

              {/* Departamento de Residencia */}
              <div className="sm:col-span-3 lg:col-span-2">
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

              {/* Municipio de Residencia */}
              <div className="sm:col-span-3 lg:col-span-2">
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

              {/* Direccion */}
              <div className="sm:col-span-3 lg:col-span-2">
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

              {/* Telefono Hogar */}
              <div className="sm:col-span-3 lg:col-span-2">
                <Label htmlFor="telefonoHogar">Teléfono Hogar (Opcional)</Label>
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

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <p className="text-sm leading-6 text-gray-600">
                 Para hacer más eficiente el proceso de registro, le solicitamos que 
                 revise minuciosamente la información que planea proporcionar, asegurándose 
                 de que sea precisa y válida, con el objetivo de evitar errores
                </p>
              </div>

              {/* Numero Documento */}
              <div className="sm:col-span-3">
                <Label htmlFor="numeroDocumento">Número Documento</Label>
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

              {/* Tipo Documento */}
              <div className="sm:col-span-3">
                <TipoDocumentoListbox control={control} name="tipoDocumento" />
                <ErrorMessage
                  errors={errors}
                  name="tipoDocumento"
                ></ErrorMessage>
              </div>

              {/* Lugar Expedicion */}
              <div className="sm:col-span-3 lg:col-span-2">
                <Label htmlFor="lugarExpedicionDocumento">Lugar Expedición</Label>
                <div className="mt-2">
                  <Input
                    id="lugarExpedicionDocumento"
                    autoComplete="lugarExpedicionDocumento"
                    {...register("lugarExpedicionDocumento")}
                  />
                  <ErrorMessage errors={errors} name="lugarExpedicionDocumento"></ErrorMessage>
                </div>
              </div>

              {/* Fecha Expedicion */}
              <div className="sm:col-span-3 lg:col-span-2">
                <Label htmlFor="fechaExpedicionDocumento">Fecha de Expedición</Label>
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
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <p className="text-sm leading-6 text-gray-600">
                  Para obtener la información sobre la fecha de afiliación a su empresa prestadora de salud y obtener el certificado de afiliación, 
                  por favor consulte el siguiente enlace:
                    <a href="https://www.adres.gov.co/consulte-su-eps" className="ml-1 text-gray-900 font-medium" target="_blank" rel="noopener noreferrer">
                      Consulta sobre tu Afiliación
                    </a>.
                  Asegúrese de tener a mano la información necesaria para completar la consulta en línea.
                </p>
              </div>

              {/* Empresa Prestadora de Salud */}
              <div className="sm:col-span-3">
                <EpsCombobox control={control} name="eps" />
                <ErrorMessage errors={errors} name="eps" />
              </div>

              {/* Tipo Afiliacion */}
              <div className="sm:col-span-3">
                <TipoAfiliacionListbox control={control} name="tipoAfiliacionEps"/>
                <ErrorMessage errors={errors} name="tipoAfiliacionEps" />
              </div>

              {/* Fecha Afiliacion */}
              <div className="sm:col-span-3 lg:col-span-2">
                <Label htmlFor="fechaAfiliacionEps">Fecha de Afiliación</Label>
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

              {/* Nit de fondo de pension */}
              <div className="sm:col-span-3">
                <Label htmlFor="nitFondoPension">NIT de fondo de pensión (Opcional)</Label>
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
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <p className="text-sm leading-6 text-gray-600">
                  A continuación registre su información académica, así como sus áreas de interés
                  y los conocimientos/herramienstas que manejan adecuadamente.
                </p>
              </div>

              {/* Semestre Matriculado */}
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

              {/* Codigo */}
              <div className="sm:col-span-3 lg:col-span-2">
                <Label htmlFor="codigo">Código</Label>
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

              {/* Grupo de Practicas */}
              <div className="sm:col-span-full">
                <Label htmlFor="grupoMatriculado">Grupo de Prácticas Matriculado</Label>
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

            <div className="mt-8">
              <AreasInteres control={control} areasInteres={areasInteres} />
            </div>


          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
