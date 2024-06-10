import { FC, useEffect, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { HiMiniChevronDown } from 'react-icons/hi2';
import useCiudades from '../../hooks/useCiudades';

interface CiudadComboboxProps {
  value: string;
  onChange: (value: string) => void;
  departamentoId?: string;
}

export const CiudadCombobox: FC<CiudadComboboxProps> = ({ departamentoId, value = null, onChange }) => {
  const [query, setQuery] = useState<string>("");
  const { ciudades, fetchCiudades } = useCiudades();

  useEffect(() => {
    fetchCiudades(departamentoId);
  }, [departamentoId, fetchCiudades]);

  const filteredCiudades =
    query === ""
      ? ciudades
      : ciudades.filter((item) =>
          item.nombre.toLowerCase().includes(query.toLowerCase())
        );

  const displayValue = (ciudadId: string) => {
    const selectCiudad = ciudades.find((i) => i.id == ciudadId);
    return selectCiudad ? (!departamentoId ? `${selectCiudad?.departamento?.pais?.nombre}, ${selectCiudad?.departamento?.nombre}, ${selectCiudad?.nombre}`: `${selectCiudad?.nombre}`) : "";
  };      

  return (
    <Combobox immediate value={value} onChange={onChange}>
      <div className="relative">
        <ComboboxInput
          className={clsx(
            "w-full rounded-md py-1.5 text-gray-900 pr-8 pl-3 shadow-sm ring-1 ring-inset ring-gray-300 border-none text-sm leading-6",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          displayValue={displayValue}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar ciudad por nombre"
          autoComplete="off"
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          {/* <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" /> */}
          <HiMiniChevronDown className="size-2.4" />
        </ComboboxButton>
      </div>
      <Transition
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")}
      >
        <ComboboxOptions
          anchor="bottom"
          className="w-[var(--input-width)] [--anchor-max-height:14rem] absolute bg-white rounded-md border border-gray-200 p-1 [--anchor-gap:4px] empty:hidden"
        >
          {
            filteredCiudades.map((ciudad) => (
                <ComboboxOption
                  key={ciudad.id}
                  value={ciudad.id}
                  className="group flex cursor-pointer items-center gap-2 rounded-md py-1.5 px-3 select-none data-[focus]:bg-gray-200 data-[selected]:bg-gray-300/90"
                >
                  {
                    departamentoId 
                      ? <div className="text-sm/6 text-gray-900">{ciudad.nombre}</div> 
                      : <div className="flex flex-col text-gray-900">
                          <div className="text-sm/6">{ ciudad.nombre }</div>
                          <div className="flex gap-x-1 text-xs">
                            <div>{ ciudad.departamento?.pais?.nombre },</div>
                            <div>{ ciudad.departamento?.nombre }</div>
                          </div>
                        </div>
                  }                  
                </ComboboxOption>
            ))
          }
        </ComboboxOptions>
      </Transition>
    </Combobox>
  );
};
