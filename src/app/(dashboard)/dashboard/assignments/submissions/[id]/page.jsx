import { getAssignmentSubmissionById } from "@/app/actions/assignments";
import { auth } from "@/app/auth";
import MarkSubmissionForm from "@/components/assignments/mark-submit-form";
import FeedbackPreview from "@/components/common/feedback-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import GetDepartmentList from "@/utils/DepartmentList";
import {
  AlarmClock,
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileDigit,
  FileText,
  GraduationCap,
  Link2,
  Mail,
  MessageSquareText,
  NotebookPen,
  User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

function BackButton({ children }) {
  return (
    <Button variant="ghost" size="sm" className="gap-1 mb-6" asChild>
      <Link href="/dashboard/assignments/submissions">
        <ArrowLeft className="h-4 w-4" />
        {children}
      </Link>
    </Button>
  );
}

function StatusBadge({ status }) {
  const getStatusDetails = (status) => {
    switch (status) {
      case "MARKED":
        return {
          variant: "success",
          icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
        };
      case "RECHECK":
        return { variant: "warning", icon: <Clock className="h-3 w-3 mr-1" /> };
      case "PENDING":
        return {
          variant: "secondary",
          icon: <Clock className="h-3 w-3 mr-1" />,
        };
      default:
        return { variant: "outline", icon: null };
    }
  };

  const { variant, icon } = getStatusDetails(status);

  return (
    <Badge variant={variant} className="text-xs px-2 py-1 capitalize">
      {icon}
      {status.toLowerCase()}
    </Badge>
  );
}

export default async function SubmissionDetailsPage({ params: param }) {
  const params = await param;
  const assignmentId = params?.id;
  const session = await auth();
  const user = session?.user;
  const role = user?.role;
  const isAdmin = role === "admin";
  const resp = await getAssignmentSubmissionById(assignmentId);
  if (resp?.error) {
    throw Error();
  }
  const submission = resp?.data || null;
  if (!submission) {
    notFound();
  }

  // Calculate percentage for marks
  const marksPercentage =
    submission.marks !== null
      ? Math.round((submission.marks / submission.assignment.totalMarks) * 100)
      : 0;

  // Check if submission is late
  const isLate =
    new Date(submission.submissionDate) >
    new Date(submission.assignment.deuDate);

  return (
    <div className="container mx-auto py-8 px-4">
      <BackButton>Back to Submissions</BackButton>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Submission Details
            </h1>
            <StatusBadge status={submission.status} />
          </div>
          <p className="text-muted-foreground mt-2 flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Assignment: <span>{submission.assignment.name}</span>
          </p>
          <p className="text-muted-foreground mt-1 flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            Workshop:{" "}
            <span className="text-foreground">
              {submission?.assignment?.lessons?.module?.workshop?.name}
            </span>
          </p>
        </div>

        {submission.marks !== null && (
          <div className="bg-muted/40 rounded-lg p-4 min-w-[180px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Score</span>
              <Badge
                variant={
                  marksPercentage >= 70
                    ? "success"
                    : marksPercentage >= 50
                    ? "warning"
                    : "destructive"
                }
              >
                {marksPercentage}%
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-2">
              {submission.marks} / {submission.assignment.totalMarks}
            </div>
            <Progress value={marksPercentage} className="h-2" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline Card - New */}
          <Card className="overflow-hidden border-muted">
            <CardHeader className="bg-muted/30 pb-3">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Submission Date</span>
                  </div>
                  <p className="font-medium">
                    {formatDate(submission.submissionDate, { time: true })}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlarmClock className="h-4 w-4" />
                    <span>Deadline</span>
                  </div>
                  <p className="font-medium">
                    {formatDate(submission.assignment.deuDate, { time: true })}
                  </p>
                  {isLate && (
                    <Badge variant="destructive" className="mt-1">
                      Late Submission
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-muted">
            <CardHeader className="bg-muted/30 pb-3">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <User className="h-4 w-4" />
                      <span>Name</span>
                    </div>
                    <p className="font-medium">
                      {submission.user?.user?.name ||
                        "User " + submission.userId}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </div>
                    <p className="font-medium">
                      {submission.user?.user?.email || "N/A"}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <BookOpen className="h-4 w-4" />
                      <span>Semester</span>
                    </div>
                    <p className="font-medium">
                      {submission.user?.user?.semester || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <FileDigit className="h-4 w-4" />
                      <span>Roll Number</span>
                    </div>
                    <p className="font-medium">
                      {submission.user?.user?.rollNo || "N/A"}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>Session</span>
                    </div>
                    <p className="font-medium">
                      {submission.user?.user?.session || "N/A"}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <GraduationCap className="h-4 w-4" />
                      <span>Department</span>
                    </div>
                    <p className="font-medium">
                      {GetDepartmentList(submission.user?.user?.department) ||
                        "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-muted">
            <CardHeader className="bg-muted/30 pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Submission Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <GraduationCap className="h-4 w-4" />
                      <span>Examiner</span>
                    </div>
                    <p className="font-medium">
                      {submission?.examiner
                        ? submission?.examiner?.name
                        : "Not assigned"}
                    </p>
                    {submission?.examiner && (
                      <p className="text-sm text-muted-foreground">
                        {submission?.examiner?.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Link2 className="h-4 w-4" />
                      <span>Project Links</span>
                    </div>
                    <div className="space-y-2 mt-2">
                      <a
                        href={submission.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline text-sm bg-primary/5 p-2 rounded-md transition-colors hover:bg-primary/10"
                      >
                        <ExternalLink className="h-4 w-4 flex-shrink-0" />
                        <span className="break-all">{submission.liveLink}</span>
                      </a>

                      <a
                        href={submission.documentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline text-sm bg-primary/5 p-2 rounded-md transition-colors hover:bg-primary/10"
                      >
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span className="break-all">
                          {submission.documentLink}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {submission.requirements &&
                submission.requirements.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Requirements</span>
                    </div>
                    <div className="bg-muted/20 p-3 rounded-md">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
                        {submission.requirements.map((req, index) => (
                          <li key={index} className="text-sm">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-muted">
            <CardHeader className="bg-muted/30 pb-3">
              <CardTitle className="flex items-center gap-2">
                <NotebookPen className="h-5 w-5 text-primary" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <FeedbackPreview
                  markdownText={submission?.assignment?.description || "N/A"}
                />
              </div>
            </CardContent>
          </Card>

          {submission.feedback && (
            <Card className="overflow-hidden border-muted">
              <CardHeader className="bg-muted/30 pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquareText className="h-5 w-5 text-primary" />
                  Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <FeedbackPreview markdownText={submission.feedback} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card className="sticky top-6 border-primary/20">
            <CardHeader className="bg-primary/5 pb-3">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Mark Submission
              </CardTitle>
              <CardDescription>
                Provide marks and feedback for this submission
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <MarkSubmissionForm
                submission={submission}
                totalMarks={submission.assignment.totalMarks}
                isAdmin={isAdmin}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
