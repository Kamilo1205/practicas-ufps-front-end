import { FC, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import { Controller } from 'react-hook-form';
import { Label } from '../ui';
import clsx from 'clsx';

interface EpsComboboxProps {
  control: any;
  name: string;
}

export const EpsCombobox: FC<EpsComboboxProps> = ({ control, name }) => {
  const [eps, setEps] = useState<Eps[]>([]);
  const comboboxId = `${name}-combobox`;
  
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
                    "w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                  displayValue={(person) => person?.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                  <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
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
                  className="w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                >
                  {filteredPeople.map((person) => (
                    <ComboboxOption
                      key={person.id}
                      value={person}
                      className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                    >
                      <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                      <div className="text-sm/6 text-white">{person.name}</div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Transition>
            </Combobox>
          )}
        />
      </div>  
    </>
  );
};
