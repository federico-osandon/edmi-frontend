import PageMeta from "../../../components/common/PageMeta";

import { StudentFormRegister } from "../../../components"
import AuthLayout from "../../AuthPages/AuthPageLayout";

export function StudentFormRegisterPage() {
    return (
        <>
            <PageMeta
                title="Formulario de Registro | EDMI"
                description="Formulario de Registro | EDMI"
            />
            <AuthLayout>
                <StudentFormRegister />
            </AuthLayout>
        </>
    );
}
