import { getAssignmentSubmissionUnMarking } from "@/app/actions/assignments"
import SubmissionsTable from "@/components/assignments/submissions-table"

export default async function SubmissionsPage() {
    const resp = await getAssignmentSubmissionUnMarking()
    if (resp?.error) {
        throw Error()
    }
    const submissions = resp?.data

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold tracking-tight mb-2">All Submissions</h1>
            <p className="text-muted-foreground mb-6">View and manage all assignment submissions.</p>
            <SubmissionsTable submissions={submissions} />
        </div>
    )
}

