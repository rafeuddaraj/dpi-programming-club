"use client"

import { Separator } from "@/components/separator";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Lessons from "./lessons";



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

export default function ModuleCollapsible({ activeModule, modules, children, workshopParticipantId, activeLesson, enrollment }) {
    const router = useRouter()
    const params = useParams()
    const workshopId = params?.id
    const handleNextModule = async (module) => {
        setActiveModuleId(module?.id)
    }
    const [activeModuleId, setActiveModuleId] = useState(activeModule?.id)
    return modules?.map(module => <Collapsible
        key={module?.id}
        open={activeModuleId === module?.id}
        onOpenChange={() => handleNextModule(module)}
        className="border rounded-md"
    >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left">
            <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                    {modules.indexOf(module) + 1}
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">{module.name}  {module?.status !== "Completed" && <Badge className={module?.statusClasses}>{module?.status}</Badge>}</span>
                    {module.startingDate && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                            {new Date(module.startingDate).toLocaleDateString()} -{" "}
                            {new Date(module.endingDate).toLocaleDateString()}
                        </div>
                    )}

                </div>
            </div>
            {module?.id === activeModule?.id ? (
                <ChevronUp className="h-4 w-4" />
            ) : (
                <ChevronDown className="h-4 w-4" />
            )}
        </CollapsibleTrigger>
        <CollapsibleContent>
            <Separator />
            <div className="p-2">
                <Lessons activeLesson={activeLesson} lessons={module?.lessons} module={module} workshopParticipantId={enrollment?.id} />
            </div>
        </CollapsibleContent>
    </Collapsible>)
}
