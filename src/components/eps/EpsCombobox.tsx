import { FC, useEffect, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import { Controller } from 'react-hook-form';
import { Label } from '../ui';
import clsx from 'clsx';
import { Eps } from '../../interfaces/eps.interface';
import { fetchGetEps } from '../../api/eps.api';
import { HiMiniChevronDown } from 'react-icons/hi2';

interface EpsComboboxProps {
  control: any;
  name: string;
}

export const EpsCombobox: FC<EpsComboboxProps> = ({ control, name }) => {
  const [query, setQuery] = useState<string>('');
  const [eps, setEps] = useState<Eps[]>([]);
  const comboboxId = `${name}-combobox`;

  useEffect(() => {
    const fetchData = async () => {
      const eps = await fetchGetEps();
      setEps(eps);
    };
    fetchData();
  }, []);
  
  const filteredEps = query === '' ? eps : eps.filter((item) => item.nombre.toLowerCase().includes(query.toLowerCase()) || item.nit.includes(query))

  return (
    <>
      <Label htmlFor={comboboxId}>Empresa Prestadora de Salud</Label>
      <div className="mt-2">
        <Controller
          control={control}
          name={name}
          defaultValue={null}
          render={({ field }) => (
            <Combobox value={field.value} onChange={field.onChange}>
              <div className="relative">
                <ComboboxInput
                  className={clsx(
                    "w-full rounded-md py-1.5 text-gray-900 pr-8 pl-3 shadow-sm ring-1 ring-inset ring-gray-300 border-none text-sm leading-6",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                  displayValue={(eps: Eps) => eps ? `${eps?.nombre} - ${eps?.nit}`: ''}
                  onChange={(event) => setQuery(event.target.value)}
                  autoComplete="off"
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                  {/* <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" /> */}
                  <HiMiniChevronDown className="size-2.4"/>
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
                  className="w-[var(--input-width)] rounded-md border border-gray-200 bg-white p-1 [--anchor-gap:4px] empty:hidden"
                >
                  {
                    filteredEps.map((eps) => (
                      <ComboboxOption
                        key={eps.id}
                        value={eps}
                        className="group flex cursor-pointer items-center gap-2 rounded-md py-1.5 px-3 select-none data-[focus]:bg-gray-200 data-[selected]:bg-gray-300/90"
                      >
                        {/* <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" /> */}
                        <div className="text-sm/6 text-gray-900">{eps.nombre} - {eps.nit}</div>
                      </ComboboxOption>
                    ))
                  }
                </ComboboxOptions>
              </Transition>
            </Combobox>
          )}
        />
      </div>  
    </>
  );
};