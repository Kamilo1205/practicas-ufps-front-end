import { ButtonHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils';

const buttonStyles = cva(
  ["flex", "w-full", "text-sm", "rounded-md", "leading-6", "px-3", "shadow-sm", "py-1.5 ", "items-center", "justify-center", "font-semibold", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-offset-2"],
  {
    variants: {
      variant: {
        default: ["bg-indigo-600", "text-white", "hover:bg-indigo-500", "focus-visible:outline-indigo-600"],
        outline: ["border border-inherit"],
      },
    },
    defaultVariants: {
      variant: "default"
    },
  }
);
  
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = ({children, variant, className, ...props}: ButtonProps) => {
    // flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
    // mt-5 flex gap-x-2 w-full justify-center items-center border border-inherit rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
    
    return (
      <button className={cn(buttonStyles({ variant, className}))} {...props}>
        { children }
      </button>
    );
}