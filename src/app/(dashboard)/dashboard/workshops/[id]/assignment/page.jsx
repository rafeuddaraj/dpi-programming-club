import { getWorkshopLessonById } from "@/app/actions/workshops";
import AssignmentForm from "@/components/assignments/assignment-form";
import { Button } from "@/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default async function page({ params: param }) {
    const params = await param
    const lessonId = await params?.id
    const resp = await getWorkshopLessonById(lessonId)
    if (resp?.error) {
        throw Error()
    }
    const assignment = resp?.data?.assignment || null
    return (
        <>
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href={"/dashboard/workshops"}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold">{resp.data?.name}</h1>
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-6">{assignment ? "Edit Assignment" : "Create New Assignment"}</h1>
                    <AssignmentForm lessonId={lessonId} assignment={assignment} />
                </div>
            </div>
        </>
    );
}