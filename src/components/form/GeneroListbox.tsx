import { FC } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { HiMiniChevronDown } from 'react-icons/hi2';


const generos = ["masculino", "femenino"];

interface GeneroListboxProps {
  value: string;
  onChange: (value: string) => void;
}

export const GeneroListbox: FC<GeneroListboxProps> = ({ value = '', onChange }) => {
  return (
    <>
      <Listbox value={value} onChange={onChange}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-md py-1.5 text-gray-900 pr-8 pl-3 shadow-sm ring-1 ring-inset ring-gray-300 text-left sm:text-sm sm:sm:leading-6 capitalize",
            "focus:outline-none data-[focus]:ring-2  data-[focus]:ring-inset  data-[focus]:ring-indigo-600"
          )}
        >
          {value ? value : 'Seleccione un genero'}
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
            className="w-[var(--button-width)] z-10 mt-1 rounded-md border border-gray-200 bg-white p-1 [--anchor-gap:4px] focus:outline-none"
          >
            {
              generos.map((genero, index) => (
                <ListboxOption
                  key={index}
                  value={genero}
                  className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-200 data-[selected]:bg-gray-300/90"
                >
                  <div className="text-sm capitalize">{genero}</div>
                </ListboxOption>
              ))
            }
          </ListboxOptions>
        </Transition>
      </Listbox>
    </>
  );
};
