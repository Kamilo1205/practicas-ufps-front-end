import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;  // Opcional, establece un estilo predeterminado
}


export const Button = ({children, variant = 'primary', className, ...props}: ButtonProps) => {
    const baseStyle = "px-4 py-2 font-bold text-white rounded focus:outline-none focus:shadow-outline";
    let variantStyle = "";
  
    switch (variant) {
      case 'primary':
        variantStyle = "bg-blue-500 hover:bg-blue-700";
        break;
      case 'secondary':
        variantStyle = "bg-gray-500 hover:bg-gray-700";
        break;
      case 'danger':
        variantStyle = "bg-red-500 hover:bg-red-700";
        break;
      default:
        variantStyle = "bg-blue-500 hover:bg-blue-700";
    }
  
    const combinedClassName = `${baseStyle} ${variantStyle} ${className || ''}`;
  
    return (
      <button
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
}