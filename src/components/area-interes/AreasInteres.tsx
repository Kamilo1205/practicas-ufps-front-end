import { FC, Fragment, useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { Label } from "../ui";
import { HerramientaCheckbox } from "./HerramientaCheckbox";
import { AreaInteres } from "../../interfaces/area-interes.interface";
import { Transition, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { IoChevronDown, } from "react-icons/io5";

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
            <div key={`level-${level}`} className="col-span-1 items-center font-medium">{level}</div>
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
                enter="duration-200 ease-out"
                enterFrom="opacity-0 -translate-y-6"
                enterTo="opacity-100 translate-y-0"
                leave="duration-300 ease-out"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-6"
                as={Fragment}
                show={areaInteres.areaSubArea?.length != 0}//selectedLevels[index] >= 3 && 
                key={`Tansition-${areaInteres.id}`}
              >
                <div key={areaInteres.id}>
                  <div className="font-medium">{areaInteres.nombre}</div>
                  <div>
                    {areaInteres?.areaSubArea?.map(
                      (areaSubArea, indexAreaSubArea) => (
                        <div className="sm:ml-1 mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl bg-white/5" key={areaSubArea.id}>
                          <Disclosure as="div" className="p-3" defaultOpen={indexAreaSubArea === 0}>
                            <DisclosureButton className="group flex w-full items-center justify-between">
                              {areaSubArea.subAreasInteres.nombre}
                              <IoChevronDown className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                            </DisclosureButton>
                            <DisclosurePanel>
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
                              </DisclosurePanel>
                          </Disclosure>
                          
                          
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
