import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, type = 'text', className, ...props }, ref) => {
  
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const isPassword: boolean = type == 'password';
    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`mb-4 ${className}`}>
            {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
            <div className="relative">
                <input
                    type={isPassword? (showPassword ? 'text': 'password') : type }
                    ref={ref}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...props}
                />
                {
                    isPassword && (
                        <button 
                            onClick={togglePasswordVisibility}
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                            { showPassword? <FaEyeSlash />: <FaEye />}
                        </button>
                    )
                }
            </div>
        </div>
    )
});
