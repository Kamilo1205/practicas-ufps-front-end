import { ButtonHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils';

const buttonStyles = cva(
  ["flex", "w-full", "text-sm", "rounded-md", "leading-6", "px-3", "shadow-sm", "py-1.5 ", "items-center", "justify-center", "font-semibold", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-offset-2"],
  {
    variants: {
      variant: {
        default: ["bg-indigo-600", "text-white", "hover:bg-indigo-500", "focus-visible:outline-indigo-600"],
        outline: ["border border-inherit"],
      }
    },
    defaultVariants: {
      variant: "default" 
    },
  }
);
  
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({ children, variant, className, ...props }) => {
  return (
    <button className={cn(buttonStyles({ variant, className }))} { ...props }>
      { children }
    </button>
  );
}