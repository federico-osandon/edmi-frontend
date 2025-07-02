import { useEffect, useState } from "react"
import { getCursesApi, updateCurseApi } from "../../apis/curses.api"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import Badge from "../../components/ui/badge/Badge"
import Select from "../../components/form/Select"
import { Link } from "react-router"

interface Curse {
    name: string
    description: string
    isActive: boolean
    _id: string
    category: string
    price: number
    duration: string
}

export function CursesPages() {
    const [curses, setCurses] = useState<Curse[]>([])
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        const fetchCurses = async (category?: string) => {
            setLoading(true)
            setError(null)
            try {
                const response = await getCursesApi(category)
                // Verificar si la respuesta tiene la estructura esperada
                if (response && response.data && Array.isArray(response.data)) {
                    setCurses(response.data)
                } else {
                    console.error('La respuesta de la API no tiene el formato esperado:', response)
                    setCurses([])
                    setError('No hay cursos disponibles')
                }
            } catch (error) {
                console.error('Error al obtener cursos:', error)
                setCurses([])
                setError('Error al cargar los cursos')
            } finally {
                setLoading(false)
            }
        }
        fetchCurses(category)
    }, [category])
    
    return (
        <div>
            <PageMeta
                title="Cursos | EDMI"
                description="Esta página lista todos los cursos disponibles"
            />
            <PageBreadcrumb prevTitle="Inicio" pageTitle="Cursos" />
            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                <div className="flex flex-col lg:flex-row justify-between items-center mb-5 w-full">
                    <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                        Listado de Cursos
                    </h3>
                    <div className="w-full lg:w-1/4">
                        <Select
                            placeholder="Seleccionar categoría"
                            options={[
                                { value: 'BASICO', label: 'Básico' },
                                { value: 'AVANZADO', label: 'Avanzado' },
                            ]}
                            onChange={(value) => setCategory(value)}
                        />  
                    </div>
                </div>
                {
                    loading ? (
                        <div className="flex justify-center items-center py-10">
                            <p className="text-gray-500 dark:text-gray-400">Cargando cursos...</p>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center py-10">
                            <p className="text-red-500 dark:text-red-400">{error}</p>
                        </div>
                    ) : Array.isArray(curses) && curses.length > 0 ? (
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                            <div className="max-w-full overflow-x-auto">
                                <Table>
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
                                                Descripción
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Categoría
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Precio
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Duración
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Estado
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>

                                    {/* Table Body */}
                                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                        {Array.isArray(curses) && curses.map((curse) => (
                                            <TableRow key={curse._id} className="hover:bg-gray-200 dark:hover:bg-gray-700">
                                                <Link to={`/curso-detalle/${curse._id}`}>
                                                <TableCell className="px-5 py-4 sm:px-6 text-start">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
                                                            <span className="text-gray-500 font-medium">
                                                                {curse.name?.charAt(0) || '?'}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                                {curse.name}
                                                            </span>
                                                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                                ID: {curse._id.substring(0, 8)}...
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                </Link>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {curse.description || 'No disponible'}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {curse.category === 'PASTORES' ? 'Pastores' : 'Servidores'}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    ${curse.price}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {curse.duration}{' '} meses
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    <button 
                                                        className="cursor-pointer" 
                                                    >
                                                        <Badge
                                                            size="sm"
                                                            color={curse.isActive ? "success" : "error"}
                                                        >
                                                            {curse.isActive ? 'Activo' : 'Inactivo'}
                                                        </Badge>
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>  
                        </div>
                    ) : (
                        <div className="flex justify-center items-center py-10 border border-gray-200 rounded-xl bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                            <p 
                                className="text-center text-gray-800 text-theme-sm dark:text-gray-400 py-8" 
                            >
                                No hay cursos disponibles{category ? ` para la categoría seleccionada` : ''}
                            </p>
                        </div>
                    )
                }   
            </div>
        </div>
    )
}
