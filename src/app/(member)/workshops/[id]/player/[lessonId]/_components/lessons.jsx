"use client"

import { updateLastModuleAndLesson } from "@/app/actions/workshops";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


// Helper function to format date and time
const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Not scheduled"

    const date = new Date(dateTimeString)
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }).format(date)
}

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
            router.push(`/workshops/${workshopId}/player/${lesson?.id}`)
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
                    } ${lesson?.status === "Upcoming" ? "cursor-not-allowed" : ""}`}
                onClick={lesson?.status !== "Upcoming" ? () => handleNextLesson(lesson) : () => { }}
            >

                {lesson?.status === "Completed" ? (
                    <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                    <div className="h-4 w-4 rounded-full border border-muted-foreground/30"></div>
                )}
                <div className="flex flex-col">
                    <span className="text-sm">{lesson.name} {lesson?.status !== "Completed" && <Badge className={lesson?.statusClasses}>{lesson?.status}</Badge>}</span>
                    {lesson.startingDate && (
                        <div className="mt-1 text-xs text-muted-foreground">
                            {format(lesson.startingDate, "M/d/yyyy h:mm a")} -
                            {format(lesson.endingDate, "M/d/yyyy h:mm a")}
                        </div>
                    )}
                </div>
            </div >)
            }
        </>
    );
}