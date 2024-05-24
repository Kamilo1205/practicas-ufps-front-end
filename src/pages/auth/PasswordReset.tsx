import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ErrorMessage, Input, Label } from '../../components/ui';
import { PasswordResetSchema, passwordResetSchema } from '../../schemas';
import { fetchPostUsuarioResetPassword } from '../../api/auth.api';
import { toast } from 'sonner';

export const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = async(data: PasswordResetSchema) => {
    try {
      const response = await fetchPostUsuarioResetPassword({ token, password: data.password });
      toast.success('Contraseña restablecida con éxito');
      reset();
    } catch (error) {
      toast.error(error?.response?.data.message || 'Ocurrio un error al cambiar la contraseña');
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Cambiar contraseña
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email">Contraseña</Label>
            <div className="mt-2">
              <Input
                id="password"
                type="password"
                autoComplete="password"
                {...register("password")}
              />
              <ErrorMessage errors={errors} name="password"></ErrorMessage>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Verificar contraseña</Label>
            <div className="mt-2">
              <Input
              id="confirmPassword"
                type="password"
                autoComplete="confirmPassword"
                {...register("confirmPassword")}
              />
              <ErrorMessage errors={errors} name="confirmPassword"></ErrorMessage>
            </div>
          </div>

          <div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              Cambiar la contraseña
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
