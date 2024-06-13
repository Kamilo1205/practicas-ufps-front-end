import { Fragment } from 'react';
import useAreasDeInteres from '../../hooks/useAreasInteres';
import { HerramientaCheckbox } from './HerramientaCheckbox';
import { FormControl, FormField, FormItem } from '../ui/Input/Form';

export const HerramientasForm = () => {
  const { areas } = useAreasDeInteres();

  return (
    <div className="text-sm">
      {areas
        .filter((area) => area.subAreas?.length > 0)
        .map((area) => (
          <Fragment key={area.id}>
            <div className="font-medium text-gray-900">{area.nombre}</div>
            <div className="sm:pl-2">
              {area.subAreas.map((subArea) => (
                <Fragment key={subArea.id}>
                  <div>{subArea.nombre}</div>
                  <div className="flex p-4 gap-4">
                    {subArea.areaInteresHerramientas.map(({ herramienta }) => (
                      <FormField
                        key={herramienta.id}
                        name={`herramientas.${herramienta.id}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <HerramientaCheckbox
                                key={herramienta.id}
                                {...field}
                                onChange={(checked) => field.onChange(checked)}
                                value={field.value || false}
                                {...herramienta}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </Fragment>
        ))}
    </div>
  );
}
