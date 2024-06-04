import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils';

const inputStyles = cva(
    [
      "block", "w-full", "rounded-md", "border-0", "py-1.5", "text-gray-900", 
      "shadow-sm", "ring-1", "ring-inset", "ring-gray-300", "placeholder:text-gray-400", 
      "focus:ring-2", "focus:ring-inset", "focus:ring-indigo-600", "sm:text-sm", "sm:leading-6"
    ],
    {
      variants: {
        hasButton: {
          true: ["pr-10"], // Add padding for the button
          false: []
        }
      },
      defaultVariants: {
        hasButton: false
      }
    }
  );

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ type = "text", className, value = "", ...props }, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  return (  
    <div className="relative">
      <input className={cn(inputStyles({ hasButton: type === "password" }), className)}
        type={showPassword && type === "password" ? "text" : type}
        ref={ ref }
        {...props}
      />
      {
        type === 'password' && (
          <button type="button" tabIndex={-1} onClick={togglePasswordVisibility} className="absolute top-0 right-0 py-2.5 pr-2.5">
            {
              showPassword 
                ? <HiOutlineEyeSlash className="text-gray-900 size-4"/>
                : <HiOutlineEye className="text-gray-900 size-4"/>
            }
          </button>
        )
      }
    </div>  
    );
  }
);
