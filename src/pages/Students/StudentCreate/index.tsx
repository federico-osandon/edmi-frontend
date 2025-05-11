
import { StudentCreateForm } from "../../../components";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export function StudentCreate() {
    return (
        <div>
            <PageMeta
                title="Crear Alumno | EDMI"
                description="Esta pagina crea un nuevo estudiante"
            />
            <PageBreadcrumb prevPath="/alumnos" prevTitle="Alumnos" pageTitle="Crear Alumno" />
            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                <div className="mx-auto w-full max-w-[630px]">                
                    <StudentCreateForm />
                </div>
            </div>
        </div>
    );
}
