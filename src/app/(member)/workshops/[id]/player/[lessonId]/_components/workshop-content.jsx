import { getAllWorkshopModulesAndLessons } from "@/app/actions/workshops";
import ModuleCollapsible from "./module-collapsible";


export default async function WorkshopContent({ params, searchParams, activeModule, activeLesson, enrollment }) {
    const workshopId = params?.id
    const resp = await getAllWorkshopModulesAndLessons(workshopId)
    if (resp?.error) {
        throw Error()
    }

    const modules = resp?.data?.modules


    return (
        <>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {modules.length > 0 ? (
                    <ModuleCollapsible
                        activeModule={activeModule}
                        activeLesson={activeLesson}
                        enrollment={enrollment}
                        modules={modules}
                        workshopParticipantId={enrollment?.id}
                    />
                ) : (
                    <div className="text-center py-4 text-muted-foreground">
                        No modules found matching "{searchQuery}"
                    </div>
                )}
            </div>
        </>
    );
}