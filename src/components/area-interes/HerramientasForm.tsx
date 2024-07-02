import { Fragment } from 'react';
import useAreasDeInteres from '../../hooks/useAreasInteres';
import { Checkbox, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Controller, UseFormReturn } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi2';

interface HerramientasFormProps {
  form: UseFormReturn<{
    areasInteres: never[];
    numeroPracticantes: number;
    remuneracion: boolean;
    herramientas: never[];
    id: string | undefined;
  }, any, undefined>;

}

export const HerramientasForm = ({ form }: HerramientasFormProps) => {
  const { areas } = useAreasDeInteres();
  const handleCheckboxChange = (checked: boolean, herramientaId: string) => {
    const currentValues = form.getValues('herramientas');
    if (checked) {
      form.setValue('herramientas', [...currentValues, herramientaId]);
    } else {
      form.setValue('herramientas', currentValues.filter((id) => id !== herramientaId));
    }
  };


  return (
    <div className="text-sm">
      {areas
        .filter((area) => area.subAreas?.length > 0
          && !area.areaPadre
          && !area.fechaEliminacion
          && area.subAreas.some((subArea) => subArea.areaInteresHerramientas.length > 0)
          && form.getValues('areasInteres').includes(area.id)
        )
        .map((area) => (
          <Fragment key={area.id}>
            <div className="font-medium text-gray-900">{area.nombre}</div>
            <div className="sm:pl-2">
              {
                area.subAreas.map((subArea) => (
                  subArea.areaInteresHerramientas.length > 0 && <Fragment key={subArea.id}>
                    <Disclosure>
                      <DisclosureButton
                        className="text-sm font-semibold leading-6 text-gray-900 flex w-full justify-between p-3">
                        <div>{subArea.nombre}</div>
                        <BiChevronDown className="h-5 w-5 text-gray-400" />
                      </DisclosureButton>
                      <DisclosurePanel>
                        <div className="flex p-4 gap-4 flex-wrap">
                          {subArea.areaInteresHerramientas.map(({ herramienta }) => (
                            !herramienta.fechaEliminacion && <Controller
                              key={herramienta.id}
                              name="herramientas"
                              control={form.control}
                              render={({ field }) => (
                                <Checkbox
                                  {...field}
                                  checked={form.getValues('herramientas').includes(herramienta.id)}
                                  onChange={(checked) => handleCheckboxChange(checked, herramienta.id)}
                                  className="group flex items-center gap-x-2 pl-2 pr-4 py-1.5 rounded-md cursor-pointer select-none p-1 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus-visible:outline-0 data-[checked]:ring-indigo-500 data-[checked]:bg-indigo-50/50"
                                >
                                  <div className="bg-gray-100 size-4 rounded-full group-data-[checked]:bg-indigo-100">
                                    <HiCheck className="hidden text-red-800 size-4 fill-black group-data-[checked]:block" />
                                  </div>
                                  {herramienta.nombre}
                                </Checkbox>
                              )}
                            />
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  </Fragment>
                ))}
            </div>
          </Fragment>
        ))}
    </div>
  );
}
