import { ArrowLeft, Clock, Play } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getActiveLessonAndModule, getWorkshopParticipant, getWorkshopProgress } from "@/app/actions/workshops"
import { auth } from "@/app/auth"
import FeedbackPreview from "@/components/common/feedback-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WorkshopContent from "./_components/workshop-content"
import WorkshopSearch from "./_components/workshop-search"

export default async function WorkshopPlayerPage({ params: param, searchParams: searchParam }) {

  const session = await auth()
  const params = await param
  const searchParams = await searchParam
  const workshopId = await params?.id
  const lessonId = await params?.lessonId
  const userId = session?.user?.id

  const enrollment = await getWorkshopParticipant(workshopId)

  if (!enrollment) {
    notFound()
  }



  const activeResp = await getActiveLessonAndModule(workshopId)

  if (activeResp?.error) {
    throw Error()
  }

  const activeData = activeResp?.data

  const activeModule = activeData?.module
  const activeLesson = activeData?.lesson
  const expandedModules = {
    [activeModule.id]: true,
  }

  const progress = await getWorkshopProgress(workshopId)


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
          <h1 className="text-2xl font-bold tracking-tight">{enrollment.workshop.name}</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center relative">
              {enrollment.workshop.type === "ONLINE" && activeLesson.liveLink ? (
                <div className="text-center p-6">
                  <p className="text-lg font-medium mb-4">Live Session</p>
                  <Button asChild>
                    <a href={activeLesson.liveLink} target="_blank" rel="noopener noreferrer">
                      Join Live Session
                    </a>
                  </Button>
                </div>
              ) : enrollment.workshop.type === "ONLINE" && activeLesson.recordedLink ? (
                <div className="text-center p-6">
                  <p className="text-lg font-medium mb-4">Recorded Session</p>
                  <Button asChild>
                    <a href={activeLesson.recordedLink} target="_blank" rel="noopener noreferrer">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Recording
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="text-center p-6">
                  <p className="text-lg font-medium mb-2">Offline Session</p>
                  <p className="text-muted-foreground mb-4">
                    {activeLesson.location || "Location details will be provided before the session"}
                  </p>
                  <div className="flex justify-center">
                    <Button variant="outline">
                      <Clock className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              )}

              {/* Quiz Button */}
              {/* <Button
                variant="secondary"
                size="sm"
                className="absolute top-4 right-4"
                onClick={() => alert("Quiz feature will be implemented soon!")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Take Quiz
              </Button> */}
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold">{activeLesson.name}</h2>
            </div>
          </Card>

          {/* Description and Assignment Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="assignment">Assignment</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Description</CardTitle>
                  <CardDescription>Detailed information about this lesson</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FeedbackPreview markdownText={activeLesson.description || "No description available for this lesson."} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="assignment" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment</CardTitle>
                  <CardDescription>Complete this assignment to test your understanding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Assignment Instructions:</h3>
                    <p>Based on what you've learned in this lesson, complete the following tasks:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        <p className="font-medium">Task 1:</p>
                        <p>Create a simple project that demonstrates your understanding of {activeLesson.name}.</p>
                      </li>
                      <li>
                        <p className="font-medium">Task 2:</p>
                        <p>
                          Write a brief explanation (300-500 words) of how you would apply these concepts in a
                          real-world scenario.
                        </p>
                      </li>
                      <li>
                        <p className="font-medium">Task 3:</p>
                        <p>Share your work with peers and provide feedback on at least two other submissions.</p>
                      </li>
                    </ol>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Submission Guidelines:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Submit your assignment through the platform by uploading your files</li>
                      <li>Deadline: 7 days after completing this lesson</li>
                      <li>Format: PDF, ZIP, or GitHub repository link</li>
                    </ul>
                  </div>
                  <div className="pt-4">
                    <Button>Submit Assignment</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>About This Module</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-muted-foreground mt-1">
                  <FeedbackPreview markdownText={activeModule?.description || "This lesson is part of the module: " + activeModule.name} />
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
                <WorkshopContent params={params} searchParams={searchParams} activeLesson={activeLesson} activeModule={activeModule} enrollment={enrollment} />
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
                <p className="text-muted-foreground mt-1">{enrollment.workshop.type}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium">Duration</h3>
                <p className="text-muted-foreground mt-1">
                  {new Date(enrollment.workshop.startingDate).toLocaleDateString()} -{" "}
                  {new Date(enrollment.workshop.endingDate).toLocaleDateString()}
                </p>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/workshops/${enrollment.workshop.id}`}>View Workshop Details</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

