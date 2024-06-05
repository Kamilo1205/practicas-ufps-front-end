import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, id, ...props }, ref) => {
    return (
      <textarea
        id={id}
        ref={ ref }
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...props}
      />
    );
  }
);
