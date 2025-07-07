
import { useEffect } from "react";
import { CurseAddressCard, CurseInfoCard, CurseMetaCard } from "../../components";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useParams, useSearchParams } from "react-router";


export function CurseDetail() {

    const { cid } = useParams<{ id: string }>(); 
    const [searchParams] = useSearchParams();
    const activity = searchParams.get("activity");

    useEffect(() => {

    }, [cid]);

    console.log(cid);
    console.log(activity);
    
    return (
        <>
            <PageMeta
                title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Detalle del Curso" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Detalle
                </h3>
                <div className="space-y-6">
                    <CurseMetaCard />
                    <CurseAddressCard />
                    <CurseInfoCard activity={activity} />
                </div>
            </div>
        </>
    );
}
