import { FC } from 'react';
import { Checkbox } from '@headlessui/react';
import { HiCheck } from 'react-icons/hi2';
import { Herramienta } from '../../interfaces/herramienta.interface';

interface HerramientaCheckboxProps extends Herramienta {
  value?: boolean | undefined
  onChange?: ((checked: boolean) => void) | undefined
}

export const HerramientaCheckbox: FC<HerramientaCheckboxProps> = ({ nombre, value, onChange }) => {
  return (
    <Checkbox 
      className="group flex items-center gap-x-2 pl-2 pr-4 py-1.5 rounded-md cursor-pointer select-none p-1 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus-visible:outline-0 data-[checked]:ring-indigo-500 data-[checked]:bg-indigo-50/50"
      checked={value}
      onChange={onChange}
    >
      <div className="bg-gray-100 size-4 rounded-full group-data-[checked]:bg-indigo-100">
        <HiCheck className="hidden text-red-800 size-4 fill-black group-data-[checked]:block" />
      </div>
      { nombre }
    </Checkbox>
  );
}
