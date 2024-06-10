import { FC, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { HiMiniChevronDown } from 'react-icons/hi2';
import useEps from '../../hooks/useEps';

interface EpsComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export const EpsCombobox: FC<EpsComboboxProps> = ({ value = null, onChange }) => {
  const [query, setQuery] = useState<string>('');
  const { eps } = useEps();

  const filteredEps = query === '' ? eps : eps.filter((item) => item.nombre.toLowerCase().includes(query.toLowerCase()) || item.nit.includes(query))

  return (
    <>
      <Combobox immediate value={value} onChange={onChange}>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-md py-1.5 text-gray-900 pr-8 pl-3 shadow-sm ring-1 ring-inset ring-gray-300 border-none text-sm leading-6",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(epsId) => {
              const selectEps = eps.find((i) => i.id == epsId);
              return selectEps ? `${selectEps?.nombre} - ${selectEps?.nit}`: ''
            }}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            placeholder="Buscar Eps por nombre o NIT"
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
                  value={eps.id}
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
    </>
  );
};
