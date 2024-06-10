import { ChangeEvent, FC, InputHTMLAttributes, ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils';
import { Button } from '../Button/Button';

const inputStyles = cva(
  ["absolute", "inset-0", "opacity-0", "cursor-pointer"],
  {
    variants: {
      variant: {
        default: [],
        button: ["hidden"],
        dropzone: ["hidden"],
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const dropzoneStyles = cva(
  ["dropzone", "relative", "z-10", "flex", "items-center", "justify-center", "w-full", "h-32", "border-dashed", "border-2", "border-gray-300", "text-gray-700", "hover:border-gray-400", "cursor-pointer"],
  {
    variants: {
      variant: {
        dropzone: [],
      }
    },
    defaultVariants: {
      variant: "dropzone",
    },
  }
);

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "button" | "dropzone";
  onFileChange?: (files: FileList) => void;
  inputClassName?: string;
  buttonClassName?: string;
  divClassName?: string;
  children?: ReactNode;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({
    variant = "default",
    onFileChange,
    inputClassName,
    buttonClassName,
    divClassName,
    children,
    ...props
}, ref) => {
  
  const internalRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => internalRef.current || {} as HTMLInputElement);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onFileChange && event.target.files) {
      onFileChange(event.target.files);
    }
  };

  const handleClick = () => {
    if (internalRef.current) {
      internalRef.current.click();
    }
  };

  return (
    <div className="flex items-center">
      <input 
        type="file" 
        className={cn(inputStyles({ variant }), inputClassName)}  
        ref={internalRef}   
        onChange={handleFileChange} 
        {...props}
      />
      {
        variant === 'button' && (
          <Button variant="outline" type="button" className={buttonClassName} onClick={handleClick}>
            { children || 'Upload File'}
          </Button>
        )
      }
      {
        variant === 'dropzone' && (
          <div className={cn(dropzoneStyles({ variant }), divClassName)} onClick={handleClick}>
            { children || 'Upload File'}
          </div>
        )
      }
    </div>
  );
});
