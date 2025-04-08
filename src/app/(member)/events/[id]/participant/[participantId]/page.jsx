import { getEventParticipantResult } from "@/app/actions/events";
import BackButtonWithoutText from "@/components/common/back-button-without-text";
import ErrorPage from "@/components/common/error";
import FeedbackPreview from "@/components/common/feedback-preview";
import { MotionDiv } from "@/components/common/motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import GetDepartmentList from "@/utils/DepartmentList";
import {
  Calendar,
  CheckCircle,
  Clock,
  Download,
  MapPin,
  XCircle,
} from "lucide-react";

export default async function ParticipantResultPage({ params }) {
  const param = await params;
  const participantId = param.participantId;

  const data = await getEventParticipantResult(participantId, param?.id);
  if (data?.error || !data) {
    throw Error();
  }
  const event = data?.event;
  const participant = data?.participant;
  const payment = data?.payment;
  // Calculate average score
  if (data?.score === null) {
    return (
      <ErrorPage
        errorType="pending"
        message={
          "Your marking is currently pending. Once we complete the review process, we will provide you with the marks."
        }
      />
    );
  }

  return (
    <div className="container mx-auto py-8">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 max-w-4xl mx-auto"
      >
        {/* Back button and title */}
        <div className="flex items-center gap-2">
          <BackButtonWithoutText />
          <h1 className="text-2xl sm:text-3xl font-bold">Participant Result</h1>
        </div>

        {/* Event details */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{event.name}</CardTitle>
            <CardDescription>
              <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event?.startTime, { time: true })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(event?.endTime, { time: true })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {event.type === "OFFLINE" ? event?.location : "Online"}
                  </span>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Participant details and results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Participant info */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Participant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage
                    src={participant?.user?.avatar}
                    alt={participant?.user?.name}
                  />
                  <AvatarFallback className="text-xl">
                    {participant?.user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{participant?.user?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {GetDepartmentList(participant?.user?.department)},{" "}
                  {participant?.user?.semester} Semester
                </p>

                {data.complete ? (
                  <Badge className="mt-2 bg-green-500/10 text-green-500 border-green-500/20">
                    Completed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="mt-2">
                    Incomplete
                  </Badge>
                )}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Roll Number:</span>
                  <span className="font-medium">
                    {participant?.user?.rollNo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">
                    {participant?.user?.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">
                    {participant?.user?.phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attendance:</span>
                  <span className="font-medium flex items-center">
                    {data.complete ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        Present
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        Absent
                      </>
                    )}
                  </span>
                </div>
              </div>

              {data.certificate && (
                <>
                  <Separator />
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Certificate
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Results and feedback */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Performance Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall score */}
              <div className="space-y-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Overall Score</h3>
                    {data.score ? (
                      <span
                        className={`font-bold text-xl ${
                          data.score >= 80
                            ? "text-green-500"
                            : data.score >= 60
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {data.score}%
                      </span>
                    ) : (
                      <span className="font-bold text-xl text-red-500">
                        Failed
                      </span>
                    )}
                  </div>
                  {data.score ? (
                    <Progress
                      value={data.score}
                      className={`h-2 ${
                        data.score >= 80
                          ? "bg-green-500"
                          : data.score >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  ) : (
                    <Progress value={0} className="h-2 bg-red-500" />
                  )}
                </div>

                <Separator />

                {/* Feedback */}
                {data.feedback ? (
                  <div className="space-y-2">
                    <h3 className="font-medium">Organizer Feedback</h3>

                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <FeedbackPreview markdownText={data.feedback} />
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No feedback submitted
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionDiv>
    </div>
  );
}
