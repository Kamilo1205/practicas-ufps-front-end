import React from 'react';

interface ErrorMessageProps {
  errors: any;
  name: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, name }) => {
  return (
    errors[name] && <p className="text-red-500 text-sm mt-1 px-1">{errors[name].message}</p>
  );
};
