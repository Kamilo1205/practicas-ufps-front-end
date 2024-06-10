import { FC, useEffect, useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { HiMiniChevronDown } from 'react-icons/hi2';
import { TipoDocumento } from '../../interfaces';
import { fetchGetTipoDocumentosData } from '../../api/tipoDocumento.api';

interface TipoDocumentoListboxProps {
  value: string;
  onChange: (value: string) => void;
}

export const TipoDocumentoListbox: FC<TipoDocumentoListboxProps> = ({ value = '', onChange }) => {
  const [tipoDocumentos, setTipoDocumentos] = useState<TipoDocumento[]>([]);
  const [selectedDocumento, setSelectedDocumento] = useState<TipoDocumento | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const tipoDocumentos = await fetchGetTipoDocumentosData();
      setTipoDocumentos(tipoDocumentos);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const selected = tipoDocumentos.find(doc => doc.id === value);
    setSelectedDocumento(selected || null);
  }, [value, tipoDocumentos]);

  return (
    <Listbox value={value} onChange={onChange}>
      <ListboxButton
        className={clsx(
          "relative block w-full rounded-md py-1.5 text-gray-900 pr-8 pl-3 shadow-sm ring-1 ring-inset ring-gray-300 text-left text-sm leading-6 capitalize",
          "focus:outline-none data-[focus]:ring-2  data-[focus]:ring-inset data-[focus]:ring-indigo-600 truncate"
        )}
      >
        {selectedDocumento ? selectedDocumento.nombre : "Seleccione un tipo de documento"}
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
          {
            tipoDocumentos.map((tipoDocumento) => (
              <ListboxOption
                key={tipoDocumento.id}
                value={tipoDocumento.id}
                className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-200 data-[selected]:bg-gray-300/90"
              >
                <div className="text-sm capitalize">{tipoDocumento.nombre}</div>
              </ListboxOption>
            ))
          }
        </ListboxOptions>
      </Transition>
    </Listbox>
  );
};
