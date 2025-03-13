"use client"

import { createWorkshopModule, updateWorkshopModule } from "@/app/actions/workshops"
import ModuleAddEditForm from "@/components/common/module-add-edit-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function WorkshopModuleAddAndEditForm({ workshop, moduleData }) {
    const router = useRouter()
    const workshopId = workshop?.id
    const onSubmit = async (data) => {
        try {
            const resp = moduleData ? await updateWorkshopModule({ workshopModuleId: moduleData?.id, data }) : await createWorkshopModule({ workshopId, data })
            if (resp?.error) {
                throw Error()
            }
            toast.success(`Workshop module ${moduleData ? "update" : "create"} successfully.`)
            return router.push(`/dashboard/workshops/${workshopId}?tab=modules`)
        } catch {
            toast.error("There was an problem!")
        }
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/dashboard/workshops")}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">{workshop ? "Edit " : "Create "} Module</h1>
            </div>

            {workshop && (
                <div className="text-muted-foreground">
                    {moduleData ? "Updating " : "Adding "} module to workshop: <span className="font-medium text-foreground">{workshop.name}</span>
                </div>
            )}

            <ModuleAddEditForm onSubmitHandler={onSubmit} typeOfUse={"Workshop"} data={moduleData} />
        </div>
    )
}
