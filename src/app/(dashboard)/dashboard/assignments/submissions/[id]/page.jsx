import { getAssignmentSubmissionById } from "@/app/actions/assignments"
import MarkSubmissionForm from "@/components/assignments/mark-submit-form"
import FeedbackPreview from "@/components/common/feedback-preview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Calendar, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import BackButton from "../../[id]/_components/back-button"

export default async function SubmissionDetailsPage({
    params,
}) {
    const resp = await getAssignmentSubmissionById(await (params).id)
    if (resp?.error) {
        throw Error()
    }
    const submission = resp?.data || null
    if (!submission) {
        notFound()
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <BackButton>
                Back to Submissions
            </BackButton>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Submission Details</h1>
                    <p className="text-muted-foreground mt-1">
                        For assignment:{" "}
                        <Link href={`/assignments/${submission.assignmentId}`} className="underline hover:text-foreground">
                            {submission.assignment.name}
                        </Link>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Submission Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-medium">Submitted By</h3>
                                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                    <User className="h-4 w-4" />
                                    <span>{`${submission.user?.user?.name} - ${submission?.user?.user?.email}` || "User " + submission.userId}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium">Examiner By</h3>
                                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                    <User className="h-4 w-4" />
                                    <span>{submission?.examiner ? `${submission?.examiner?.name} - ${submission?.examiner?.email}` : "N/A"}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium">Submission Date</h3>
                                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(submission.submissionDate)}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium">Live Link</h3>
                                <div className="mt-1">
                                    <a
                                        href={submission.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline break-all"
                                    >
                                        {submission.liveLink}
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium">Document Link</h3>
                                <div className="mt-1">
                                    <a
                                        href={submission.documentLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline break-all"
                                    >
                                        {submission.documentLink}
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium">Status</h3>
                                <p className="mt-1 capitalize">{submission?.status}</p>
                            </div>
                            {submission.status !== null && (
                                <div>
                                    <h3 className="font-medium">Marks</h3>
                                    <p className="mt-1">
                                        {submission.marks} / {submission.assignment.totalMarks}
                                    </p>
                                </div>
                            )}
                            {submission.feedback && (
                                <div>
                                    <h3 className="font-medium">Feedback</h3>
                                    <br />
                                    <br />
                                    <FeedbackPreview markdownText={submission.feedback} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Mark Submission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MarkSubmissionForm submission={submission} totalMarks={submission.assignment.totalMarks} />
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    )
}

