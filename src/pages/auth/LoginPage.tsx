import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { useAuth } from "../../contexts";
import { Button, ErrorMessage, Input, Label } from "../../components/ui";
import { LoginSchema, loginSchema } from "../../schemas";
import { handleAxiosError } from "../../utils";
import { fetchPostUsuarioLogin } from "../../api/auth.api";

export const LoginPage = () => {
  const { login } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const error = searchParams.get("error");

  useEffect(() => {
    const handleNotification = (error: string | null) => {
      if (error) {
        setSearchParams({});
        toast.error("El usuario no se encuentra registrado");
      }
    };
    handleNotification(error);
  }, [error, setSearchParams]);

  const onSubmit = async (credentials: LoginSchema) => {
    try {
      await login(credentials);
    } catch (error) {
      console.log(error);
      handleAxiosError(error, setError);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inicia sesión con tu cuenta
        </h2>
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
            <div className="flex justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link
                to="/auth/forgot-password"
                tabIndex={-1}
                className="font-semibold ml-1 text-sm leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                type="password"
                autoComplete="off"
                {...register("password")}
              />
              <ErrorMessage errors={errors} name="password"></ErrorMessage>
            </div>
          </div>

          <div>
            <Button type="submit" disabled={isSubmitting}>
              Continuar con email
            </Button>
          </div>
        </form>

        <div>
          <Button
            variant="outline"
            type="button"
            className="mt-5 gap-x-2"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
          >
            <FcGoogle size={18} />
            Continuar con google
          </Button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Tú empresa quiere coloborar con el programa de prácticas de ingieneria
          de sistemas de la UFPS?
          <Link
            to="/auth/registro"
            className="font-semibold ml-1 leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Registrarse
          </Link>
        </p>
      </div>
    </>
  );
};
