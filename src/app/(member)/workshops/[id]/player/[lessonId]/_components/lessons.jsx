"use client"

import { updateLastModuleAndLesson } from "@/app/actions/workshops";
import { CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Lessons({ lessons, activeLesson, children, workshopParticipantId, module }) {
    const router = useRouter()
    const params = useParams()
    const workshopId = params?.id
    const handleNextLesson = async (lesson) => {
        try {
            setCurrentLessonId(lesson?.id)
            const resp = await updateLastModuleAndLesson(workshopParticipantId, { lastModuleId: module?.id, lastLessonId: lesson?.id })
            if (resp?.error) {
                throw Error()
            }
            router.push(`/workshops/${workshopId}/player/${lesson?.id}`, { scroll: false })
        } catch {
            toast.error("Something went wrong!")
        }
    }
    const [allLessons, setAllLessons] = useState(lessons || [])

    const [currentLessonId, setCurrentLessonId] = useState(params?.lessonId)

    return (
        <>
            {allLessons?.map(lesson => <div
                key={lesson.id}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${currentLessonId === lesson?.id ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                onClick={() => handleNextLesson(lesson)}
            >

                {lesson.id === currentLessonId ? (
                    <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                    <div className="h-4 w-4 rounded-full border border-muted-foreground/30"></div>
                )}
                <span className="text-sm">{lesson.name}</span>
            </div>)}
        </>
    );
}