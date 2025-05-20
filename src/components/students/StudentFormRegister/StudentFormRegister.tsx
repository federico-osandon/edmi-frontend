import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { EyeCloseIcon, EyeIcon } from "../../../icons";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Checkbox from "../../form/input/Checkbox";
import Select from "../../form/Select";
import { toast } from "react-toastify";
import { createUserApi } from "../../../apis/auth.api";

export default function StudentFormRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm();

    const handleOnSubmit = (data: any) => {
        const fetchCreateUserAPi = async () => {
            try {
                const response = await createUserApi(data)
                if (response.status === 'success') {
                    toast.success(response.message || 'Usuario creado con éxito')
                    reset()
                } else {
                    toast.error(response.error || 'Error al crear usuario')
                }
            } catch (error) {
                console.error('Error al crear usuario:', error)
                toast.error('Error al conectar con el servidor')
            }
        }
        fetchCreateUserAPi()
    };
    
    return (
        <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
            <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
                {/* <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                <ChevronLeftIcon className="size-5" />
                Back to dashboard
                </Link> */}
            </div>
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
                <div className="mb-5 sm:mb-8">
                    <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                        Formulario de Registro
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Complete el formulario para registrarse como estudiante.
                    </p>
                </div>
            <div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <Label>
                                Nombre<span className="text-error-500">*</span>
                            </Label>
                            <Controller
                                name="first_name"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input 
                                        type="text" 
                                        id="fname" 
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        placeholder="Ingrese el nombre"
                                    />
                                )}
                            />
                            {errors.first_name && <p className="text-red-500">Este campo es requerido</p>}
                        </div>
                        <div className="sm:col-span-1">
                            <Label>
                                Apellido<span className="text-error-500">*</span>
                            </Label>
                            <Controller
                                name="last_name"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input 
                                        type="text" 
                                        id="lname" 
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        placeholder="Ingrese el apellido"
                                    />
                                )}
                            />
                            {errors.last_name && <p className="text-red-500">Este campo es requerido</p>}
                        </div>
                    </div>
                    
                    <div>
                        <Label>
                            Fecha de Nacimiento<span className="text-error-500">*</span>
                        </Label>
                        <Controller
                            name="birthdate"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input 
                                    type="date" 
                                    id="birthdate" 
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                    placeholder="Seleccione fecha"
                                />
                            )}
                        />
                        {errors.birthdate && <p className="text-red-500">Este campo es requerido</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label>
                                Ciudad<span className="text-error-500">*</span>
                            </Label>
                            <Controller
                                name="city"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input 
                                        type="text" 
                                        id="city" 
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        placeholder="Ingrese la ciudad"
                                    />
                                )}
                            />
                            {errors.city && <p className="text-red-500">Este campo es requerido</p>}
                        </div>
                        <div>
                            <Label>
                                País<span className="text-error-500">*</span>
                            </Label>
                            <Controller
                                name="country"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input 
                                        type="text" 
                                        id="country" 
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        placeholder="Ingrese el país"
                                    />
                                )}
                            />
                            {errors.country && <p className="text-red-500">Este campo es requerido</p>}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label>
                                Nombre de los Pastores<span className="text-error-500">*</span>
                            </Label>
                            <Controller
                                name="pastors_name"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input 
                                        type="text" 
                                        id="pastors_name" 
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        placeholder="Ingrese el nombre de los pastores"
                                    />
                                )}
                            />
                            {errors.pastors_name && <p className="text-red-500">Este campo es requerido</p>}
                        </div>
                        <div>
                            <Label>
                                Nombre de la Iglesia<span className="text-error-500">*</span>
                            </Label>
                            <Controller
                                name="church_name"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input 
                                        type="text" 
                                        id="church_name" 
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        placeholder="Ingrese el nombre de la iglesia"
                                    />
                                )}
                            />
                            {errors.church_name && <p className="text-red-500">Este campo es requerido</p>}
                        </div>
                    </div>
                    
                    <div>
                        <Label>
                            Teléfono<span className="text-error-500">*</span>
                        </Label>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input 
                                    type="tel" 
                                    id="phone" 
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                    placeholder="Ingrese el número de teléfono"
                                />
                            )}
                        />
                        {errors.phone && <p className="text-red-500">Este campo es requerido</p>}
                    </div>
                    
                    <div>
                        <Label>
                            Pastor o Servidor<span className="text-error-500">*</span>
                        </Label>
                        <Controller
                            name="function"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select 
                                    options={[
                                        { value: "PASTOR", label: "Pastor" },
                                        { value: "SERVIDOR", label: "Servidor" },
                                    ]}
                                    placeholder="Seleccione una función"
                                        
                                    onChange={(value) => field.onChange(value)}
                                />
                            )}
                        />
                        {errors.function && <p className="text-red-500">Este campo es requerido</p>}
                    </div>
                    
                    <div>
                        <Label>
                            Horario de Clase<span className="text-error-500">*</span>
                        </Label>
                        <Controller
                            name="class_schedule"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select 
                                    options={[
                                        { value: "16", label: "16:00 hs" },
                                        { value: "20", label: "20:00 hs" }
                                    ]}
                                    placeholder="Seleccione horario"
                                    onChange={(value) => field.onChange(value)}
                                />
                            )}
                        />
                        {errors.class_schedule && <p className="text-red-500">Este campo es requerido</p>}
                    </div>
                    
                    <div>
                        <Label>
                            Email<span className="text-error-500">*</span>
                        </Label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input 
                                    type="email" 
                                    id="email" 
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                    placeholder="Ingrese el email"
                                />
                            )}
                        />
                        {errors.email && <p className="text-red-500">Este campo es requerido</p>}
                    </div>
                    
                    {/* <div>
                        <Label>
                            Password<span className="text-error-500">*</span>
                        </Label>
                        <div className="relative">
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input
                                        placeholder="Enter your password"
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
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
                            {errors.password && <p className="text-red-500">Este campo es requerido</p>}
                        </div>
                    </div> */}
                    
                    <div className="flex items-center gap-3">
                        <Checkbox
                            className="w-5 h-5"
                            checked={isChecked}
                            onChange={setIsChecked}
                        />
                        <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                            Al crear la cuenta, acepta los{" "}
                            <span className="text-gray-800 dark:text-white/90">
                                Términos y Condiciones,
                            </span>{" "}
                                y nuestra{" "}
                            <span className="text-gray-800 dark:text-white">
                                Política de Privacidad
                            </span>
                        </p>
                    </div>
                    
                    <div>
                        <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                            Registrarse
                        </button>
                    </div>
                </div>
            </form>

                <div className="mt-5">
                {/* <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                    Already have an account? {""}
                    <Link
                    to="/signin"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                    Sign In
                    </Link>
                </p> */}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
