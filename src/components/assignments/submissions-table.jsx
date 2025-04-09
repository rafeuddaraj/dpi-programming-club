import { format, formatDistanceToNow, isPast } from "date-fns";
import {
  Calendar,
  Clock,
  ExternalLink,
  Eye,
  FileDigit,
  FileText,
  FileTextIcon as FileText2,
  GraduationCap,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SubmissionTable({
  submissions = [],
  isModerator = false,
  page = 1,
  limit = 10,
}) {
  if (!submissions.length) {
    return (
      <Card className="border-dashed p-4 my-5">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <FileText className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No submissions found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            There are no assignment submissions to display at this time.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status, marks, dueDate) => {
    if (status === "MARKED") return "success";
    if (status === "RECHECK") return "warning";
    if (status === "PENDING" && isPast(dueDate)) return "destructive";
    if (status === "PENDING") return "secondary";
    return "default";
  };

  return (
    <div className="space-y-4 my-5">
      <div className="rounded-lg border overflow-hidden bg-card">
        <div className="overflow-x-auto select-none">
          <Table>
            <TableHeader className="bg-muted/50 rounded-md">
              <TableRow className="hover:bg-transparent">
                <TableHead className="rounded-tl-md">Index</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Student</TableHead>
                {!isModerator && <TableHead>Examiner</TableHead>}
                <TableHead>Timeline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Links</TableHead>
                <TableHead className="rounded-tr-md text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission, index) => (
                <TableRow
                  key={submission.id}
                  className={`group transition-colors ${
                    index % 2 === 0 ? "bg-muted/20" : ""
                  }`}
                >
                  <TableCell className="text-center">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <div className="w-5 flex-shrink-0">
                          <FileText2 className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">
                          {submission.assignment.name}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <div className="w-5 flex-shrink-0">
                          <GraduationCap className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <span>
                          {submission.assignment.lessons.module.workshop.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center">
                        <div className="w-5 flex-shrink-0">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">
                          {submission.user.user.name}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <div className="w-5 flex-shrink-0">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <span>{submission.user.user.email}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <div className="w-5 flex-shrink-0">
                          <FileDigit className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <span>{submission.user.user.rollNo}</span>
                      </div>
                    </div>
                  </TableCell>
                  {!isModerator && (
                    <TableCell>
                      {submission.examiner ? (
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center">
                            <div className="w-5 flex-shrink-0">
                              <GraduationCap className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">
                              {submission.examiner.user.name}
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <div className="w-5 flex-shrink-0">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                            </div>
                            <span>{submission.examiner.user.email}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className="w-5 flex-shrink-0">
                            <GraduationCap className="h-4 w-4 opacity-50" />
                          </div>
                          <span>Not assigned</span>
                        </div>
                      )}
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-xs px-2 py-1 rounded-md bg-muted/50">
                        <div className="w-5 flex-shrink-0">
                          <Clock className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <span className="text-muted-foreground">
                                  Submitted:
                                </span>
                                <span className="ml-1 font-medium">
                                  {formatDistanceToNow(
                                    new Date(submission.submissionDate),
                                    { addSuffix: true }
                                  )}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-popover">
                              {format(
                                new Date(submission.submissionDate),
                                "PPpp"
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center text-xs px-2 py-1 rounded-md bg-muted/50">
                        <div className="w-5 flex-shrink-0">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <span className="text-muted-foreground">
                                  Deadline:
                                </span>
                                <span
                                  className={`ml-1 font-medium ${
                                    isPast(
                                      new Date(submission.assignment.deuDate)
                                    ) && submission.status === "PENDING"
                                      ? "text-destructive"
                                      : ""
                                  }`}
                                >
                                  {formatDistanceToNow(
                                    new Date(submission.assignment.deuDate),
                                    { addSuffix: true }
                                  )}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-popover">
                              {format(
                                new Date(submission.assignment.deuDate),
                                "PPpp"
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusColor(
                        submission.status,
                        submission.marks,
                        new Date(submission.assignment.deuDate)
                      )}
                      className="px-3 py-1 font-medium"
                    >
                      {submission.status.charAt(0) +
                        submission.status.slice(1).toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {submission.marks !== null ? (
                      <div className="flex flex-col gap-1 bg-muted/30 p-2 rounded-md">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-sm">
                            {submission.marks}/
                            {submission.assignment.totalMarks}
                          </span>
                          <Badge variant="outline" className="ml-1 text-xs">
                            {Math.round(
                              (submission.marks /
                                submission.assignment.totalMarks) *
                                100
                            )}
                            %
                          </Badge>
                        </div>
                        <Progress
                          value={
                            (submission.marks /
                              submission.assignment.totalMarks) *
                            100
                          }
                          className="h-1.5 mt-1"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center text-xs text-muted-foreground bg-muted/30 p-2 rounded-md">
                        <span>Not marked</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <a
                        href={submission.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-primary hover:underline bg-primary/5 hover:bg-primary/10 transition-colors px-2 py-1.5 rounded-md"
                      >
                        <div className="w-5 flex-shrink-0">
                          <ExternalLink className="h-3 w-3 text-primary" />
                        </div>
                        <span>Live Demo</span>
                      </a>
                      <a
                        href={submission.documentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-primary hover:underline bg-primary/5 hover:bg-primary/10 transition-colors px-2 py-1.5 rounded-md"
                      >
                        <div className="w-5 flex-shrink-0">
                          <FileText className="h-3 w-3 text-primary" />
                        </div>
                        <span>Documentation</span>
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/dashboard/assignments/submissions/${submission.id}`}
                    >
                      <Button
                        variant="default"
                        size="sm"
                        className="h-9 px-4 shadow-sm hover:shadow-md transition-all"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
