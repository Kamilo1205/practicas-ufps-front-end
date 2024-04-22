import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginValidationSchema } from '../../schemas';
import { Button, Input } from '../ui';
import { useAuth } from '../../contexts/auth/AuthContext';

export const LoginScreen = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginValidationSchema)
  });

  const onSubmit = data => {
    try {
      login(data);
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="w-[400px]">
          <h1 className="text-3xl text-center mt-14 mb-16">Inicio de sesion</h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
              <Input 
                id="username"
                label="Correo electronico"
                type="email" 
                {...register("email")}
              />
              <Input
                className="mb-10" 
                id="password" 
                label="Contraseña"
                type="password"
                {...register("password")} 
              />

              <Button className="w-full" type="submit">Continuar con email</Button>
          </form>
      </div>
    </div>
  );
}
