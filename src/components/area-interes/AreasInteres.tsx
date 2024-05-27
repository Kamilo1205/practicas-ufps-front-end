import { FC, Fragment, useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { Label } from "../ui";
import { HerramientaCheckbox } from "./HerramientaCheckbox";
import { AreaInteres } from "../../interfaces/area-interes";
import { Transition } from "@headlessui/react";

interface AreasInteresProps {
  control: any;
  areasInteres: AreaInteres[];
}

export const AreasInteres: FC<AreasInteresProps> = ({
  control,
  areasInteres,
}) => {
  const [selectedLevels, setSelectedLevels] = useState<Record<number, number>>(
    {}
  );

  const handleLevelChange = (areaIndex: number, level: number) => {
    setSelectedLevels((prevLevels) => ({
      ...prevLevels,
      [areaIndex]: level,
    }));
  };

  // Watch the levels for each area to determine if subareas should be shown
  const watchedLevels = useWatch({ control, name: "areasInteres" });

  useEffect(() => {
    if (watchedLevels) {
      const newSelectedLevels: Record<number, number> = {};
      watchedLevels.forEach((area: any, index: number) => {
        newSelectedLevels[index] = area.level;
      });
      setSelectedLevels(newSelectedLevels);
    }
  }, [watchedLevels]);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-max mb-6 text-sm text-gray-900 leading-6 grid gap-x-6 gap-y-1 grid-cols-12">
          <div className="col-span-full mt-1 text-sm text-gray-600 mb-3">
            <p>
              Seleccione su nivel de interes donde 1 es muy poco interesado y 5
              es muy interesado
            </p>
          </div>
          <div className="col-span-7">
            <Label>
              Areas de Interes (Seleccione su nivel de interes de 1 a 5)
            </Label>
          </div>
          {[1, 2, 3, 4, 5].map((level) => (
            <div className="col-span-1 items-center font-medium">{level}</div>
          ))}

          {areasInteres.map((areaInteres, index) => (
            <Fragment key={areaInteres.id}>
              <div className="col-span-7">{areaInteres.nombre}</div>
              {[1, 2, 3, 4, 5].map((level) => (
                <div className="col-span-1 items-center" key={level}>
                  <Controller
                    name={`areasInteres.${index}.level`}
                    control={control}
                    defaultValue={1}
                    render={({ field }) => (
                      <>
                        <input
                          type="radio"
                          {...field}
                          value={level}
                          checked={field.value == level}
                          onChange={() => {
                            field.onChange(level);
                            handleLevelChange(index, level);
                          }}
                          className="cursor-pointer"
                        />
                      </>
                    )}
                  />
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-900 leading-6">
        <div className="col-span-full mt-1 text-sm text-gray-600 mb-3">
          <p>
            Seleccione las herramientas y/o conocimientos que maneja de las
            siguientes subcategorias (solo si aplica).
          </p>
        </div>
        {areasInteres.map(
          (areaInteres, index) =>
            (
              <Transition
                as={Fragment}
                show={selectedLevels[index] >= 3 && areaInteres.areaSubArea?.length != 0}
                enter="transform ease-in-out duration-[800ms]"
                enterFrom="transform opacity-0"
                enterTo="transform opacity-100"
                leave="transition ease-in-out duration-[400ms]"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
              >
                <div key={areaInteres.id}>
                  <div className="font-medium">{areaInteres.nombre}</div>
                  <div>
                    {areaInteres?.areaSubArea?.map(
                      (areaSubArea, indexAreaSubArea) => (
                        <div className="sm:ml-6" key={areaSubArea.id}>
                          <div className="text-gray-950">
                            {areaSubArea.subAreasInteres.nombre}
                          </div>
                          <div className="sm:ml-4 my-3 flex gap-4">
                            {areaSubArea.herramientas.map(
                              (herramienta, indexHerramienta) => (
                                <Controller
                                  name={`areasInteres.${index}.areaSubArea.${indexAreaSubArea}.herramientas.${indexHerramienta}.selected`}
                                  control={control}
                                  defaultValue={true}
                                  render={({ field }) => (
                                    <>
                                      <HerramientaCheckbox
                                        key={herramienta.id}
                                        value={field.value}
                                        onChange={field.onChange}
                                        {...herramienta}
                                      />
                                    </>
                                  )}
                                />
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Transition>
            )
        )}
      </div>
    </>
  );
};

// {
//   areaSubArea.herramientas.map((herramienta) => (
//     <label key={herramienta.id} className="rounded-sm cursor-pointer bg-gray-100 px-3 py-1.5">
//       <input
//         type="checkbox"
//         className="hidden"
//         name={`herramienta-${herramienta.id}`}
//       />
//       {herramienta.nombre}
//     </label>
//   ))
// }
