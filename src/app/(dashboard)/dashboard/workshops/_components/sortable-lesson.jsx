import { deleteWorkshopLesson } from "@/app/actions/workshops"
import { Button } from "@/components/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { format } from "date-fns"
import { Delete, Pencil } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const SortableLesson = ({
    lesson,
    lessonIndex,
    isLastItem,
    onDeleteLesson
}) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lesson.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : 0,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "flex items-center justify-between p-3",
                !isLastItem ? "border-b" : "",
                isDragging ? "bg-muted" : "",
            )}
        >
            <div className="flex items-center gap-3">
                <div
                    className="flex h-6 w-6 items-center justify-center rounded-full border text-xs cursor-move"
                    {...attributes}
                    {...listeners}
                >
                    {lessonIndex + 1}
                </div>
                <div>
                    <p className="font-medium">{lesson.name}</p>
                    <p className="text-xs text-muted-foreground">{lesson.type === "ONLINE" ? "Online" : "Offline"} Lesson</p>
                    <div className="mt-4 justify-between items-center">
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm text-gray-600">Starting Date</span>
                            <span className="text-sm text-gray-800">
                                {lesson.startingDate ? format(new Date(lesson.startingDate), "PPP hh:mm aa") : "Not set"}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm text-gray-600">Ending Date</span>
                            <span className="text-sm text-gray-800">
                                {lesson.endingDate ? format(new Date(lesson.endingDate), "PPP hh:mm aa") : "Not set"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={lesson.isActive ? "outline" : "destructive"} className="text-xs">
                    {lesson.isActive ? "Active" : "Inactive"}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={async () => {
                    try {
                        if (confirm("Are you sure delete this lesson")) {
                            const resp = await deleteWorkshopLesson(lesson?.id)
                            if (resp?.error) {
                                throw Error()
                            }
                            toast.success("Lesson Delete Success.")
                            return onDeleteLesson(lesson?.id)
                        }
                    } catch {
                        toast.error("There was and problem!")
                    }
                }}>
                    <Delete className="h-3 w-3" />
                </Button>
                <Link href={`/dashboard/workshops/lessons/edit/${lesson.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-3 w-3" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default SortableLesson