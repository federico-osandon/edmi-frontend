import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAuthStore } from "../../store/auth";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleOnSubmit = async (data: any) => {
    try {
      // Actualizamos directamente el estado global de autenticación
      // El store se encargará de hacer la llamada a la API
      await login({
        email: data.email,
        password: data.password
      })
      
      toast.success('Sesión iniciada con éxito')
      navigate('/', { replace: true })
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error)
      toast.error(error?.response?.data?.message || 'Error al iniciar sesión')
    }
  }
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Login
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingrese sus datos para iniciar sesión!
            </p>
          </div>
          <div>
            
           
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="space-y-6">
                <div>
                    <Label>
                        Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <input 
                        type="email"
                        placeholder="info@gmail.com"
                        {...register('email', { 
                            required: "El email es requerido",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "El formato de email no es válido"
                            }
                        })}      
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"                 
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            {String(errors.email.message)}
                        </p>
                    )}
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                  <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register('password', { required: "La contraseña es requerida" })}
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"                 
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {String(errors.password.message)}
                        </p>
                    )}
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span> */}
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Iniciar Sesión
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Registrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
