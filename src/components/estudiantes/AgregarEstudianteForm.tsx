import { useState } from "react";
import { Button } from "../ui";
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import clsx from "clsx";
import { HiMiniChevronDown } from 'react-icons/hi2';
import { grupos } from "../../pages/coordinador/EstudiantesPage";

export const AgregarEstudianteForm = ({ onClose }: any) => {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState({
    id: 0,
    name: '',
  });

  const [archivo, setArchivo] = useState<File | null>(null);

  const handleGuardar = () => {
    console.log(grupoSeleccionado);
    console.log(archivo);
  };

  return (
    <div>
      <div className="mt-3 z-50">
        <Field>

          <Label htmlFor="grupo-listbox">Grupo</Label>
          <Listbox value={grupoSeleccionado} onChange={setGrupoSeleccionado}>
            <ListboxButton
              id={`grupo-listbox`}
              className={clsx(
                "relative block w-full rounded-md py-1.5 text-gray-900 pr-8 pl-3 shadow-sm ring-1 ring-inset ring-gray-300 text-left text-sm leading-6 capitalize",
                "focus:outline-none data-[focus]:ring-2  data-[focus]:ring-inset data-[focus]:ring-indigo-600 truncate"
              )}
            >
              {grupoSeleccionado.id !== 0 ? grupoSeleccionado.name : 'Seleccione un grupo'}
              <HiMiniChevronDown
                className="group pointer-events-none absolute top-2.5 right-2.5"
                aria-hidden="true" />
            </ListboxButton>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions
                anchor="bottom"
                className="z-50 w-[var(--button-width)] rounded-md border border-gray-200 bg-white p-1 [--anchor-gap:4px] focus:outline-none"
              >
                {grupos.map((grupo) => (
                  <ListboxOption
                    key={grupo.id}
                    value={grupo}
                    className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-200 data-[selected]:bg-gray-300/90"
                  >
                    <div className="text-sm capitalize">{grupo.name}</div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </Listbox>
        </Field>

        <div className="mt-3">
          <label htmlFor="nombre">Archivo</label>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => setArchivo(e.target.files?.[0] || null)}
            id="nombre"
            name="nombre"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
      </div>
      <div className="flex mt-4">
        <Button className="mr-1 bg-red-400 hover:bg-red-700" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          disabled={grupoSeleccionado.id === 0 || archivo === null}
          onClick={handleGuardar}
          className={`${grupoSeleccionado.id === 0 || archivo === null ? 'bg-slate-400 hover:bg-slate-400' : ''} `}
        >
          Guardar

        </Button>
      </div>
    </div>
  );
};
