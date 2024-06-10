import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../../contexts";
import { Button, ErrorMessage, Input, Label } from "../../components/ui";
import { RegistroSchema, registroSchema } from "../../schemas";
import { handleAxiosError } from "../../utils";
import { fetchPostRegistroUsuario } from "../../api/auth.api";

export const RegistroPage = () => {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registroSchema),
  });

  const onSubmit = async (credentials: RegistroSchema) => {
    try {
      const response = await fetchPostRegistroUsuario(credentials);
      signup(response.usuario);
    } catch (error) {
      handleAxiosError(error, setError);
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Registra tu empresa
        </h2>
        <p className="mt-4 text-center text-sm text-gray-500">
          Regístrate como empresa colaboradora para establecer convenios con la Universidad y 
          acceder a practicantes de Ingeniería de Sistemas.
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
            <Label htmlFor="password">Contraseña</Label>
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
            <Label htmlFor="confirmPassword">Verificar Contraseña</Label>
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
            <Button type="submit" disabled={isSubmitting}>
              Registrarse
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
};
