import { useForm, Controller } from "react-hook-form";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../../form/Label.tsx";
import Input from "../../form/input/InputField.tsx";
import { createStudentApi } from "../../../apis";
import { toast } from "react-toastify";




export function StudentCreateForm() {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({})

    const fetchCreateStudent = async (data: any) => {
        try {
            const response = await createStudentApi({...data, password: '123456'})
            if (response.status === 'success') {
                toast.success(response.message || 'Estudiante creado con éxito')
                reset()
            } else {
                toast.error(response.error || 'Error al crear estudiante')
            }
        } catch (error) {
            console.error('Error al crear estudiante:', error)
            toast.error('Error al conectar con el servidor')
        }
    }

    const onSubmit = (data: any) => {
        fetchCreateStudent(data)
    }
    return (
        <ComponentCard title="Formulario">
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="input">Nombre</Label>
                        <Controller
                            name="first_name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input 
                                    type="text" 
                                    id="input" 
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.first_name && <p className="text-red-500">Este campo es requerido</p>}
                    </div>
                    <div>
                        <Label htmlFor="inputTwo">Apellido</Label>
                        <Controller
                            name="last_name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input 
                                    type="text" 
                                    id="inputTwo" 
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.last_name && <p className="text-red-500">Este campo es requerido</p>}
                    </div>
                    <div>
                        <Label htmlFor="inputThree">Email</Label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ 
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Formato de email inválido"
                                } 
                            }}
                            render={({ field }) => (
                                <Input 
                                    type="email" 
                                    id="inputThree" 
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.email && <p className="text-red-500">
                            {errors.email.type === 'pattern' 
                                ? "Formato de email inválido" 
                                : "Este campo es requerido"}
                        </p>}
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded transition-all duration-200 hover:shadow-lg"
                    >
                        Crear Estudiante
                    </button>
                </div>
            </form>
        </ComponentCard>
    );
}
