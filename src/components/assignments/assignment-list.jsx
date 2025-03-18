import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Clock, Edit, Eye } from "lucide-react"
import Link from "next/link"
import DeleteAssignmentButton from "./delete-assignment-button"
export default function AssignmentList({ assignments }) {
    if (!assignments.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <h3 className="text-xl font-medium text-muted-foreground mb-4">No assignments found</h3>
                <Link href="/dashboard/workshops">
                    <Button>Create your first assignment</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map(({ lessons, lessons: { module }, lessons: { module: { workshop } }, submissions, ...assignment }) => (
                <Card key={assignment.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="line-clamp-2">{assignment.name}</CardTitle>
                            <Badge>{assignment.assignableType}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="text-muted-foreground line-clamp-3 mb-4">{assignment.description}</p>
                        <p>Workshop Name: <strong>{workshop?.name}</strong></p>
                        <p>Module Name: <strong>{module?.name}</strong></p>
                        <p>Lesson Name: <strong>{lessons?.name}</strong></p>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>Due: {formatDate(assignment.deuDate)}</span>
                        </div>
                        <div className="mt-2 text-sm">
                            <span className="font-medium">Total Marks:</span> {assignment.totalMarks}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                        <div className="flex space-x-2">
                            <Link href={`/dashboard/assignments/${assignment.id}`}>
                                <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                </Button>
                            </Link>
                            <Link href={`/dashboard/workshops/${assignment.lessonId}/assignment`}>
                                <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                            </Link>
                        </div>
                        {!submissions?.length && <DeleteAssignmentButton id={assignment.id} />}
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

