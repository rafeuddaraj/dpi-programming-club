import { Button } from "@/components/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Pencil } from "lucide-react"
import Link from "next/link"

const SortableLesson = ({
    lesson,
    lessonIndex,
    isLastItem,
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
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={lesson.isActive ? "outline" : "destructive"} className="text-xs">
                    {lesson.isActive ? "Active" : "Inactive"}
                </Badge>
                <Link href={`/lessons/edit/${lesson.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-3 w-3" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default SortableLesson