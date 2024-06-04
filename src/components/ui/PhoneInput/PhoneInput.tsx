import { FC } from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import 'react-phone-input-2/lib/style.css';
import './styles.css';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  country?: string;
  placeholder?: string;
}

export const PhoneInput: FC<PhoneInputProps> = ({
  value,
  onChange,
  country = 'co',
  placeholder = '',
}) => {
  return (
    <ReactPhoneInput
      localization={es}
      country={country}
      value={value}
      onChange={onChange}
      containerClass="text-gray-900"
      inputClass="!block !w-full !rounded-md !border-0 !py-1.5 !text-gray-900 !shadow-sm !ring-1 !ring-inset !ring-gray-300 !placeholder:text-gray-400 !focus:ring-2 !focus:ring-inset !focus:ring-indigo-600 !text-sm !leading-6"
      buttonClass="!border-0 !bg-inherit"
      dropdownClass="!bg-white"
      searchClass="!bg-gray-800 !text-gray-900 !font-thin"
      placeholder={placeholder}
    />
  );
};

/* rounded-md py-1.5 px-3 select-none data-[focus]:bg-gray-200 data-[selected]:bg-gray-300/90 */