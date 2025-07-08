
import { Student } from "../../../types"
import Badge from "../../ui/badge/Badge"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table"
import { updateStudentApi } from "../../../apis";

const AssistanceTable = ({students, setReRender, reRender, activity}: {students: Student[], setReRender: (value: boolean) => void, reRender: boolean, activity: string}) => {

     const handleEnrollment = async ( {sid, enrollment}: {sid: string, enrollment: boolean | undefined}) => {
        try {
            if(confirm(`¿Estas seguro que desea ${enrollment ? 'desactivar' : 'activar'} la matricula del alumno?`)) {
                const result = await updateStudentApi({
                    _id: sid,
                    enrollment: !enrollment
                })  
                console.log(result)
                setReRender(!reRender)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(students)
    const filteredStudents = activity ?  students.filter(student => student.enrollment ===  true) : students;
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                        <Table className="w-full">
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Nombre
                                    </TableCell>
                                    
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Matrícula
                                    </TableCell>
                                    {/* Encabezados de clases */}
                                    {[1,2,3,4,5,6].map((n) => (
                                        <TableCell
                                            key={`c${n}-header`}
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            {`C${n}`}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Array.isArray(students) && filteredStudents.map((student) => (
                                    <TableRow key={student._id} className="hover:bg-gray-200 dark:hover:bg-gray-700">
                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
                                                    <span className="text-gray-500 font-medium">
                                                        {student.first_name?.charAt(0) || '?'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                        {student.first_name} {student.last_name || ''}
                                                    </span>
                                                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                        ID: {student._id.substring(0, 8)}...
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <button 
                                                className="cursor-pointer" 
                                                onClick={() => handleEnrollment({sid: student._id, enrollment: student.enrollment})}
                                            >
                                                <Badge
                                                    size="sm"
                                                    color={student.enrollment ? "success" : "error"}
                                                >
                                                    {student.enrollment ? 'Matriculado' : 'No matriculado'}
                                                </Badge>
                                            </button>
                                        </TableCell>
                                        {/* Casilleros de asistencia para 6 clases */}
                                        {[1,2,3,4,5,6].map((n) => (
                                            <TableCell key={`c${n}-${student._id}`} className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <div className="flex gap-2 items-center">
                                                    <label className="flex items-center gap-1 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name={`asistencia-c${n}-${student._id}`}
                                                            checked={student[`c${n}` as keyof typeof student] === true}
                                                            onChange={() => {/* Aquí irá la lógica para marcar asistencia */}}
                                                        />
                                                      
                                                    </label>
                                                   
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
            </div>  
        </div>
    )
}

export default AssistanceTable