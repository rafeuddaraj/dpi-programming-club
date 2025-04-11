import { getAssignmentById } from "@/app/actions/assignments";
import FeedbackPreview from "@/components/common/feedback-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Calendar, Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackButton from "./_components/back-button";

export default async function AssignmentDetailsPage({ params: param }) {
  const params = await param;

  const resp = await getAssignmentById(params.id);

  if (resp?.error || !resp?.data) {
    notFound();
  }

  const assignment = resp?.data;
  // const submissions = await getSubmissionsByAssignmentId(params.id)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <BackButton>Back to Assignments</BackButton>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {assignment.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge>{assignment.assignableType}</Badge>
              <span className="text-sm text-muted-foreground">
                Created: {formatDate(assignment.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/dashboard/workshops/${assignment.lessonId}/assignment`}
            >
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <FeedbackPreview markdownText={assignment.description} />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Total Marks</h3>
                <p>{assignment.totalMarks}</p>
              </div>
              <div>
                <h3 className="font-medium">Due Date</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(assignment.deuDate)}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Related ID</h3>
                <p className="text-sm text-muted-foreground break-all">
                  {assignment.lessonId}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Submissions</h2>
        {/* <SubmissionsList submissions={submissions} /> */}
      </div>
    </div>
  );
}
