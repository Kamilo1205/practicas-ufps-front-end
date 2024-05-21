import React, { forwardRef, LabelHTMLAttributes } from 'react';

interface ExtendedLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  // Puedes agregar tus propiedades personalizadas aquí si lo necesitas
}

export const Label = forwardRef<HTMLLabelElement, ExtendedLabelProps>(({ children, ...props }, ref) => {
    return (
      <label className="block text-sm font-medium leading-6 text-gray-900" 
        ref={ref} {...props}>
        {children}
      </label>
    );
  }
);