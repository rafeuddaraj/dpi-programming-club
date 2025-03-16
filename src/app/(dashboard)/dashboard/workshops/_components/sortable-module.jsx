import { Button } from "@/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { format } from "date-fns"
import { GripVertical, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import SortableLesson from "./sortable-lesson"

const SortableModule = ({
    module,
    index,
    onDeleteModule,
    onDragLessonStart,
    onDragLessonEnd,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: module.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    // State for lessons within this module
    const [lessons, setLessons] = useState(module.lessons)

    // Handle lesson reordering within this module
    const handleDragLessonEnd = (event) => {
        onDragLessonEnd(event, module.id)

        const { active, over } = event

        if (over && active.id !== over.id) {
            setLessons((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over.id)

                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    const handleDeleteLesson = (lessonId) => {
        setLessons(lessons => lessons?.filter(lesson => lesson?.id !== lessonId))
    }

    // Sensors for lesson drag and drop
    const lessonSensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    return (
        <Card ref={setNodeRef} style={style} className={cn("relative", isDragging ? "z-10" : "")}>
            <div
                className="absolute left-2 top-1/2 -translate-y-1/2 cursor-move opacity-50 hover:opacity-100"
                {...attributes}
                {...listeners}
            >
                <GripVertical className="h-5 w-5" />
            </div>
            <CardHeader className="pl-10">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-lg">
                            {index + 1}. {module.name}
                        </CardTitle>
                        <CardDescription>{module.description}

                            <div className="mt-4 justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm text-gray-600">Starting Date</span>
                                    <span className="text-sm text-gray-800">
                                        {module.startingDate ? format(new Date(module.startingDate), "PPP hh:mm aa") : "Not set"}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm text-gray-600">Ending Date</span>
                                    <span className="text-sm text-gray-800">
                                        {module.endingDate ? format(new Date(module.endingDate), "PPP hh:mm aa") : "Not set"}
                                    </span>
                                </div>
                            </div>
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={module.isActive ? "default" : "destructive"}>
                            {module.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <Link href={`/dashboard/workshops/modules/edit/${module.id}`}>
                                    <DropdownMenuItem>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="text-destructive" onClick={() => onDeleteModule(module.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pl-10">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                        {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}
                    </div>
                    <Link href={`/dashboard/workshops/lessons/create?moduleId=${module.id}`}>
                        <Button variant="outline" size="sm">
                            <Plus className="mr-2 h-3 w-3" />
                            Add Lesson
                        </Button>
                    </Link>
                </div>

                {lessons.length > 0 && (
                    <div className="mt-4 border rounded-md">
                        <DndContext
                            sensors={lessonSensors}
                            collisionDetection={closestCenter}
                            onDragStart={onDragLessonStart}
                            onDragEnd={(event) => handleDragLessonEnd(event)}
                        >
                            <SortableContext items={lessons.map((lesson) => lesson.id)} strategy={verticalListSortingStrategy}>
                                {lessons.map((lesson, lessonIndex) => (
                                    <SortableLesson
                                        key={lesson.id}
                                        lesson={lesson}
                                        lessonIndex={lessonIndex}
                                        onDeleteLesson={handleDeleteLesson}
                                        isLastItem={lessonIndex === lessons.length - 1}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default SortableModule