import { useEffect, useState } from "react";
import { getStudentsApi, updateStudentApi } from "../../apis";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
// import ComponentCard from "../../components/common/ComponentCard";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../components/ui/table";
// import Badge from "../../components/ui/badge/Badge";
// import { ButtonCustom } from "../../components";
import Select from "../../components/form/Select";
import { Student } from "../../types";
import StudentList from "../../components/students/StuldentsList";


export function Students() {
    const [students, setStudents] = useState<Student[]>([]);
    const [reRender, setReRender] = useState(false);
    const [activity, setActivity] = useState('');
    const [loading, _] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchStudents = async (activity?: string) => {
            // setLoading(true);
            setError(null);
            try {
                const response = await getStudentsApi(activity);
                // Verificar si la respuesta tiene la estructura esperada
                if (response && response.data && Array.isArray(response.data)) {
                    setStudents(response.data);
                } else {
                    console.error('La respuesta de la API no tiene el formato esperado:', response);
                    setStudents([]);
                    setError('No hay estudiantes disponibles');
                }
            } catch (error) {
                console.error('Error al obtener estudiantes:', error);
                setStudents([]);
                setError('Error al cargar los estudiantes');
            } finally {
                // setLoading(false);
            }
        };
        fetchStudents(activity);
    }, [reRender, activity]);
    

   

    const handleSelectChange = (value: string) => {
        console.log(value)
        setActivity(value);
    };
    
    return (
        <div>
            <PageMeta
                title="Estudiantes | EDMI"
                description="Esta pagina lista todos los estudiantes"
            />
            <PageBreadcrumb prevTitle="Inicio" pageTitle="Estudiantes" />
            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                <div className="flex flex-col lg:flex-row justify-between items-center mb-5 w-full">
                    <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                        Listado de Estudiantes
                    </h3>
                    <div className="w-full lg:w-1/4">
                        <Select
                            placeholder="Seleccionar actividad"
                            options={[
                                { value: 'SERVIDOR', label: 'Servidor' },
                                { value: 'PASTOR', label: 'Pastor' },
                            ]}
                            onChange={handleSelectChange}
                            
                        />  
                    </div>
                    {/* <ButtonCustom path="crear-alumno">
                        Crear Estudiante
                    </ButtonCustom> */}
                </div>
                {/* <ComponentCard 
                    title="Lista de Estudiantes" 
                    desc="Información detallada de todos los estudiantes registrados"
                > */}
                    {
                        loading ? (
                            <div className="flex justify-center items-center py-10">
                                <p className="text-gray-500 dark:text-gray-400">Cargando estudiantes...</p>
                            </div>
                        ) : error ? (
                            <div className="flex justify-center items-center py-10">
                                <p className="text-red-500 dark:text-red-400">{error}</p>
                            </div>
                        ) : Array.isArray(students) && students.length > 0 ? (
                            <StudentList students={students} setReRender={setReRender} reRender={reRender} />
                    ) : (
                        <div className="flex justify-center items-center py-10 border border-gray-200 rounded-xl bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                            <p 
                                className="text-center text-gray-800 text-theme-sm dark:text-gray-400 py-8" 
                            >
                                No hay estudiantes disponibles{activity ? ` para la actividad seleccionada` : ''}
                            </p>
                        </div>
                    )
                }   
                {/* </ComponentCard> */}
            </div>
        </div>
    );
}
