import clsx from 'clsx';
import { forwardRef, LabelHTMLAttributes } from 'react';

interface ExtendedLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  // Puedes agregar tus propiedades personalizadas aquí si lo necesitas
}

export const Label = forwardRef<HTMLLabelElement, ExtendedLabelProps>(({ children, className, ...props }, ref) => {
    return (
      <label className={clsx("block text-sm font-medium leading-6 text-gray-900", className)} 
        ref={ref} {...props}>
        {children}
      </label>
    );
  }
);