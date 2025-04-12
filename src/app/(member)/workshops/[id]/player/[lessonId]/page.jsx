import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getAssignmentSubmissionByUserIdAndAssignmentId } from "@/app/actions/assignments";
import {
  getModuleAndLesson,
  getWorkshopParticipant,
  getWorkshopProgress,
} from "@/app/actions/workshops";
import { auth } from "@/app/auth";
import SubmitAssignmentModal from "@/components/assignments/submission-modal";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStatus, isExpiredDate } from "@/lib/utils";
import { Map } from "lucide-react";
import AssignmentCardHeader from "./_components/assignment-deadline-count-down";
import VideoPlayer from "./_components/videoPlayer";
import WorkshopContent from "./_components/workshop-content";
import WorkshopSearch from "./_components/workshop-search";

export default async function WorkshopPlayerPage({
  params: param,
  searchParams: searchParam,
}) {
  const session = await auth();
  const params = await param;
  const searchParams = await searchParam;
  const workshopId = await params?.id;
  const lessonId = await params?.lessonId;
  const userId = session?.user?.id;

  const enrollment = await getWorkshopParticipant(workshopId);

  if (!enrollment) {
    notFound();
  }

  const lessonAndModuleResp = await getModuleAndLesson(workshopId, lessonId);

  if (lessonAndModuleResp?.error) {
    return redirect("/dashboard");
  }

  const { module, ...lesson } = lessonAndModuleResp?.data;

  const activeModule = module;
  const activeLesson = lesson;
  const expandedModules = {
    [activeModule.id]: true,
  };

  const progress = await getWorkshopProgress(workshopId);

  const assignment = activeLesson?.assignment || null;

  const assignmentSubResp =
    await getAssignmentSubmissionByUserIdAndAssignmentId(
      session?.user?.id,
      assignment?.id
    );

  if (assignmentSubResp?.error) {
    throw Error();
  }

  const assignmentSubmission = assignmentSubResp?.data || null;

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {enrollment.workshop.name}
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center relative">
              {/* Check for Recorded Link First */}
              {activeLesson.recordedLink ? (
                <VideoPlayer videoUrl={activeLesson?.recordedLink} />
              ) : enrollment.workshop.type === "ONLINE" &&
                activeLesson.liveLink ? (
                // Live Session for Online Workshop
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                  <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Live Session
                  </p>
                  {getStatus(
                    activeLesson?.startingDate,
                    activeLesson?.endingDate
                  ) === "Completed" ? (
                    <Button className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 dark:bg-red-500 dark:hover:bg-red-600">
                      End Session
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                    >
                      {getStatus(
                        activeLesson?.startingDate,
                        activeLesson?.endingDate
                      ) === "Upcoming" ? (
                        <>The link will be provided on time.</>
                      ) : (
                        <a
                          href={activeLesson.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Live Session
                        </a>
                      )}
                    </Button>
                  )}
                </div>
              ) : enrollment.workshop.type === "OFFLINE" ? (
                // Offline Session with Recorded Link Priority
                <div>
                  {activeLesson.recordedLink && (
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg mb-4">
                      <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        Recorded Session
                      </p>
                      <Button asChild>
                        <a
                          href={activeLesson.recordedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                          <Play className="h-5 w-5 mr-2" />
                          Watch Recording
                        </a>
                      </Button>
                    </div>
                  )}

                  {/* If no Recorded Link, show Location */}
                  {activeLesson.location && !activeLesson.recordedLink && (
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                      <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        Offline Session
                      </p>
                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          className="inline-flex items-center px-6 py-3 border-2 border-gray-600 text-gray-800 dark:text-white rounded-lg hover:border-gray-800 dark:hover:border-gray-400 transition duration-200"
                        >
                          <Map className="h-5 w-5 mr-2" />
                          {activeLesson.location ||
                            "Location details will be provided before the session"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Link details will be provided before the session
                </p>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold">{activeLesson.name}</h2>
            </div>
          </Card>

          {/* Description and Assignment Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className={`w-full ${assignment && "grid-cols-2 grid"}`}>
              <TabsTrigger className="w-full" value="description">
                Description
              </TabsTrigger>
              {assignment && (
                <TabsTrigger value="assignment">Assignment</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Description</CardTitle>
                  <CardDescription>
                    Detailed information about this lesson
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FeedbackPreview
                    markdownText={
                      activeLesson.description ||
                      "No description available for this lesson."
                    }
                  />
                </CardContent>
              </Card>
            </TabsContent>
            {assignment && (
              <TabsContent value="assignment" className="mt-4">
                <Card>
                  <AssignmentCardHeader
                    assignment={assignment}
                    assignmentSubmission={assignmentSubmission}
                  />
                  <CardContent className="space-y-4">
                    {assignmentSubmission?.status === "PUBLISHED" ? (
                      <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        <span>You scored</span>
                        <Badge className="bg-white text-blue-600 font-bold px-3 py-1 rounded-md">
                          {assignmentSubmission?.marks}/{assignment?.totalMarks}
                        </Badge>
                      </Button>
                    ) : assignmentSubmission?.status === "PENDING" ? (
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                        Mark is pending
                      </Button>
                    ) : (
                      <Button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                        Total marks: {assignment?.totalMarks}
                      </Button>
                    )}

                    {assignmentSubmission &&
                    assignmentSubmission?.status === "PUBLISHED" ? (
                      <FeedbackPreview
                        markdownText={assignmentSubmission?.feedback}
                      />
                    ) : (
                      assignment && (
                        <FeedbackPreview
                          markdownText={
                            assignment?.description ||
                            "No description available for this assignment."
                          }
                        />
                      )
                    )}
                    {!isExpiredDate(assignment?.deuDate) && (
                      <div className="pt-4">
                        <SubmitAssignmentModal
                          isAlreadySubmitted={assignmentSubmission}
                          assignment={assignment}
                          userId={session?.user?.id}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>About This Module</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-muted-foreground mt-1">
                  <FeedbackPreview
                    markdownText={
                      activeModule?.description ||
                      "This lesson is part of the module: " + activeModule.name
                    }
                  />
                </p>
              </div>

              {/* <div>
                <h3 className="font-medium">Resources</h3>
                <div className="mt-2 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Lesson Slides
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Additional Resources
                  </Button>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{progress || 0}%</span>
                </div>
                <Progress value={progress || 0} className="h-2" />
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Workshop Content</h3>
                  <WorkshopSearch />
                </div>
                {/* <Suspense fallback={<>Loading....</>}> */}
                <WorkshopContent
                  params={params}
                  searchParams={searchParams}
                  activeLesson={activeLesson}
                  activeModule={activeModule}
                  enrollment={enrollment}
                />
                {/* </Suspense> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workshop Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Instructor</h3>
                <div className="flex items-center gap-3 mt-2">
                  <div className="h-8 w-8 rounded-full bg-muted"></div>
                  <span>{enrollment.workshop.instructor}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium">Workshop Type</h3>
                <p className="text-muted-foreground mt-1">
                  {enrollment.workshop.type}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium">Duration</h3>
                <p className="text-muted-foreground mt-1">
                  {new Date(
                    enrollment.workshop.startingDate
                  ).toLocaleDateString()}{" "}
                  -{" "}
                  {new Date(
                    enrollment.workshop.endingDate
                  ).toLocaleDateString()}
                </p>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/workshops/${enrollment.workshop.id}`}>
                  View Workshop Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
