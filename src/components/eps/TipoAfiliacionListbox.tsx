import { FC, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import clsx from "clsx";
import { HiMiniChevronDown } from "react-icons/hi2";
import { Label } from "../ui";
import { TipoAfiliacionEps } from "../../interfaces/tipo-afiliacion-eps.interface";
import { fetchGetTipoAfiliacionEpsData } from "../../api/tipoAfiliacionEps.api";

interface TipoAfiliacionListboxProps {
  control: any;
  name: string;
}

export const TipoAfiliacionListbox: FC<TipoAfiliacionListboxProps> = ({ control, name }) => {
  const [tipoAfiliaciones, setTipoAfiliaciones] = useState<TipoAfiliacionEps[]>([]);
  const listboxId = `${name}-listbox`;

  useEffect(() => {
    const fetchData = async () => {
      const tipoAfiliaciones = await fetchGetTipoAfiliacionEpsData();
      setTipoAfiliaciones(tipoAfiliaciones);
    };
    fetchData();
  }, []);

  return (
    <>
      <Label htmlFor={listboxId}>Tipo Afiliacion</Label>
      <div className="mt-2">
        <Controller
          control={control}
          name={name}
          defaultValue={null}
          render={({ field }) => (
            <Listbox value={field.value} onChange={field.onChange}>
              <ListboxButton
                id={listboxId}
                className={clsx(
                  "relative block w-full rounded-md py-1.5 text-gray-900 pr-8 pl-3 shadow-sm ring-1 ring-inset ring-gray-300 text-left text-sm leading-6 capitalize",
                  "focus:outline-none data-[focus]:ring-2  data-[focus]:ring-inset data-[focus]:ring-indigo-600 truncate"
                )}
              >
                {field.value
                  ? field.value.nombre
                  : "Seleccione un tipo de afiliacion a EPS"}
                <HiMiniChevronDown
                  className="group pointer-events-none absolute top-2.5 right-2.5"
                  aria-hidden="true"
                />
              </ListboxButton>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions
                  anchor="bottom"
                  className="w-[var(--button-width)] rounded-md border border-gray-200 bg-white p-1 [--anchor-gap:4px] focus:outline-none"
                >
                  {tipoAfiliaciones.map((tipoAfiliacion) => (
                    <ListboxOption
                      key={tipoAfiliacion.id}
                      value={tipoAfiliacion}
                      className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-200 data-[selected]:bg-gray-300/90"
                    >
                      <div className="text-sm capitalize">
                        {tipoAfiliacion.nombre}
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </Listbox>
          )}
        />
      </div>
    </>
  );
};
