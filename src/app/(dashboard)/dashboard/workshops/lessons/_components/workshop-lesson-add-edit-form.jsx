"use client"

import { createWorkshopLesson, updateWorkshopLesson } from "@/app/actions/workshops";
import LessonCreateAndEditForm from "@/components/common/lesson-create-and-edit-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function WorkshopLessonAddEditForm({ module, lessonData }) {
    const router = useRouter()
    const workshopType = module?.workshop?.type
    if (lessonData) {
        if (lessonData?.location) {
            lessonData.type = "OFFLINE"
            delete lessonData?.recordedLink
            delete lessonData?.liveLink
        } else {
            lessonData.type = "ONLINE"
            delete lessonData?.location
        }
    } else {
        module.type = workshopType
    }
    const onSubmit = async (data) => {
        delete data?.type
        if (workshopType === "OFFLINE") {
            delete data?.recordedLink
            delete data?.liveLink
        } else {
            delete data?.location
        }
        try {
            const resp = lessonData ? await updateWorkshopLesson({ workshopLessonId: lessonData?.id, data }) : await createWorkshopLesson({ workshopModuleId: module?.id, data })
            if (resp?.error) {
                throw Error()
            }
            toast.success(`Lesson ${lessonData ? "update" : "create"} success`)
            return router.push(`/dashboard/workshops/${lessonData ? module?.workshopId : module?.workshop?.id}?type=modules`)
        } catch {
            toast.error("There was an problem!")
        }

    }

    return (
        <>
            <LessonCreateAndEditForm module={module} data={lessonData} onSubmitHandler={onSubmit} />
        </>
    );
}