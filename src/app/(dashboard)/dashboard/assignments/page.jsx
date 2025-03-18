import { getAllRunningAssignments } from "@/app/actions/assignments"
import AssignmentList from "@/components/assignments/assignment-list"
import { Button } from "@/components/ui/button"
import { CheckSquare, PlusCircle } from "lucide-react"
import Link from "next/link"

export default async function AssignmentPage() {
    const resp = await getAllRunningAssignments()
    if (resp?.error) {
        throw Error()
    }

    const assignments = resp?.data

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
                    <p className="text-muted-foreground mt-1">Manage and track all assignments in the system.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/dashboard/assignments/submissions">
                        <Button className="flex items-center gap-2">
                            <CheckSquare className="h-4 w-4" />
                            <span>Submissions</span>
                        </Button>
                    </Link>
                    <Link href="/dashboard/workshops">
                        <Button className="flex items-center gap-2">
                            <PlusCircle className="h-4 w-4" />
                            <span>Create Assignment</span>
                        </Button>
                    </Link>
                </div>

            </div>

            <AssignmentList assignments={assignments} />
        </div>
    )
}

