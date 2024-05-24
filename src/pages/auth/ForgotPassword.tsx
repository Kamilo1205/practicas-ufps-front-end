import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button, ErrorMessage, Input, Label } from '../../components/ui';
import { fetchPostUsuarioForgotPassword } from '../../api/auth.api';
import { handleAxiosError } from '../../utils';
import { ForgotPasswordSchema, forgotPasswordSchema } from '../../schemas';


export const ForgotPassword = () => {
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),  
  });

  const onSubmit = async (forgotPassword: ForgotPasswordSchema) => {
    try {
      await fetchPostUsuarioForgotPassword(forgotPassword);
      toast.success('Correo electrónico enviado');
      reset();
    } catch (error) {
      toast.error('Error al enviar el correo electrónico');
      handleAxiosError(error, setError);
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Recuperar contraseña
        </h2>
        <p className="mt-4 text-center text-sm text-gray-500">
          Ingresa el correo electrónico asociado a la cuenta, a continuación te enviaremos un 
          link para restablecer la contraseña
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email">Correo electronico</Label>
            <div className="mt-2">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
              />
              <ErrorMessage errors={errors} name="email"></ErrorMessage>
            </div>
          </div>

          <div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              Recuperar contraseña
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Ya tienes un usuario?
          <Link 
            to="/auth/login" 
            className="font-semibold ml-1 leading-6 text-indigo-600 hover:text-indigo-500"  
          >
            Iniciar sesion
          </Link>
        </p>
      </div>
    </>
  );
}
