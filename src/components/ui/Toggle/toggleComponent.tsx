import { Switch } from '@headlessui/react'

interface ToogleComponentProps {
  enabled: boolean;
  setEnabled: () => void;
  size?: 'small' | 'medium' | 'large';
 }
const sizes = {
  small: 'h-6 w-10',
  medium: 'h-7 w-14',
  large: 'h-9 w-18'

}

export default function ToogleComponent({ enabled, setEnabled,size='medium' }: ToogleComponentProps) {
  


  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`group relative flex ${sizes[size] } cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 data-[checked]:bg-indigo-500`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-4`}
      />
    </Switch>
  )
}