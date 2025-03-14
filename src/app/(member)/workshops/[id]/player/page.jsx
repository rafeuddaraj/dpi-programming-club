"use client"

import { useParams, useRouter } from "next/navigation"
import { useWorkshop } from "@/context/workshop-context"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Play,
  FileText,
  MessageSquare,
  Award,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Users,
  Video,
  Radio,
  MessageCircle,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export default function WorkshopPlayerPage() {
  const { id } = useParams()
  const router = useRouter()
  const {
    workshops,
    getWorkshopProgress,
    markModuleComplete,
    setCurrentModule,
    getParticipantByWorkshopId,
    getTotalModulesCount,
  } = useWorkshop()

  const workshop = workshops.find((w) => w.id === id)
  const participant = getParticipantByWorkshopId(id)
  const isEnrolled = !!participant
  const isLiveWorkshop = workshop?.type === "LIVE"

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: "John Doe",
      message: "Hello everyone! Welcome to today's session.",
      isInstructor: true,
      time: "2:00 PM",
    },
    { id: 2, user: "Emily Chen", message: "Hi! Excited to be here.", isInstructor: false, time: "2:01 PM" },
    {
      id: 3,
      user: "Michael Brown",
      message: "Quick question - will we be covering React hooks today?",
      isInstructor: false,
      time: "2:03 PM",
    },
    {
      id: 4,
      user: "John Doe",
      message: "Yes, we'll be covering useState and useEffect in detail today.",
      isInstructor: true,
      time: "2:04 PM",
    },
  ])

  useEffect(() => {
    if (workshop) {
      const progress = getWorkshopProgress(workshop.id)

      // Find indices based on IDs
      const lessonIndex = workshop.lessons.findIndex((l) => l.id === progress.currentLessonId)
      if (lessonIndex !== -1) {
        setCurrentLessonIndex(lessonIndex)

        const lesson = workshop.lessons[lessonIndex]
        const moduleIndex = lesson.modules.findIndex((m) => m.id === progress.currentModuleId)
        if (moduleIndex !== -1) {
          setCurrentModuleIndex(moduleIndex)
        }
      }
    }
  }, [workshop, getWorkshopProgress])

  if (!workshop) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Workshop not found</h1>
        <p className="mb-8">The workshop you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <a href="/">Back to Workshops</a>
        </Button>
      </div>
    )
  }

  if (!isEnrolled) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Not Enrolled</h1>
        <p className="mb-8">You need to enroll in this workshop to access the content.</p>
        <Button onClick={() => router.push(`/workshops/${id}/purchase`)}>Enroll Now</Button>
      </div>
    )
  }

  const progress = getWorkshopProgress(workshop.id)
  const currentLesson = workshop.lessons[currentLessonIndex]
  const currentModule = currentLesson?.modules[currentModuleIndex]

  const handleModuleComplete = () => {
    if (currentModule) {
      markModuleComplete(workshop.id, currentModule.id)
    }
  }

  const handleNextModule = () => {
    if (!currentLesson || !currentModule) return

    // Mark current module as complete
    markModuleComplete(workshop.id, currentModule.id)

    // Check if there are more modules in this lesson
    if (currentModuleIndex < currentLesson.modules.length - 1) {
      // Move to next module in same lesson
      const nextModuleIndex = currentModuleIndex + 1
      const nextModule = currentLesson.modules[nextModuleIndex]
      setCurrentModuleIndex(nextModuleIndex)
      setCurrentModule(workshop.id, currentLesson.id, nextModule.id)
    } else {
      // Check if there are more lessons
      if (currentLessonIndex < workshop.lessons.length - 1) {
        // Move to first module of next lesson
        const nextLessonIndex = currentLessonIndex + 1
        const nextLesson = workshop.lessons[nextLessonIndex]
        const nextModule = nextLesson.modules[0]
        setCurrentLessonIndex(nextLessonIndex)
        setCurrentModuleIndex(0)
        setCurrentModule(workshop.id, nextLesson.id, nextModule.id)
      }
    }
  }

  const handlePrevModule = () => {
    if (!currentLesson) return

    // Check if there are previous modules in this lesson
    if (currentModuleIndex > 0) {
      // Move to previous module in same lesson
      const prevModuleIndex = currentModuleIndex - 1
      const prevModule = currentLesson.modules[prevModuleIndex]
      setCurrentModuleIndex(prevModuleIndex)
      setCurrentModule(workshop.id, currentLesson.id, prevModule.id)
    } else {
      // Check if there are previous lessons
      if (currentLessonIndex > 0) {
        // Move to last module of previous lesson
        const prevLessonIndex = currentLessonIndex - 1
        const prevLesson = workshop.lessons[prevLessonIndex]
        const lastModuleIndex = prevLesson.modules.length - 1
        const lastModule = prevLesson.modules[lastModuleIndex]
        setCurrentLessonIndex(prevLessonIndex)
        setCurrentModuleIndex(lastModuleIndex)
        setCurrentModule(workshop.id, prevLesson.id, lastModule.id)
      }
    }
  }

  const handleSelectModule = (lessonIndex, moduleIndex) => {
    const lesson = workshop.lessons[lessonIndex]
    const module = lesson.modules[moduleIndex]
    setCurrentLessonIndex(lessonIndex)
    setCurrentModuleIndex(moduleIndex)
    setCurrentModule(workshop.id, lesson.id, module.id)
  }

  const isModuleCompleted = (moduleId) => {
    return progress.completedModules.includes(moduleId)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    const form = e.target
    const input = form.elements.namedItem("message")

    if (input.value.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          user: "Alex Johnson",
          message: input.value,
          isInstructor: false,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      input.value = ""
    }
  }

  // Live workshop UI
  if (isLiveWorkshop) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2 mt-2">
              <h1 className="text-2xl font-bold">{workshop.name}</h1>
              <Badge variant="destructive" className="animate-pulse">
                LIVE
              </Badge>
            </div>
            <p className="text-muted-foreground">{workshop.liveSessionTime}</p>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress.overallProgress}%</span>
            </div>
            <Progress value={progress.overallProgress} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 order-1">
            <Card className="mb-6">
              <CardHeader className="border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-red-500 animate-pulse" />
                    <span className="text-sm font-medium">Live Session in Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">24 participants</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video bg-black relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-16 w-16 text-muted-foreground opacity-50" />
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Avatar className="h-10 w-10 border-2 border-primary">
                      <AvatarImage src="/placeholder-user.jpg" alt="Instructor" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white text-sm font-medium">{workshop.instructor.name}</p>
                      <p className="text-white text-xs opacity-80">Instructor</p>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="chat" className="p-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="chat">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Live Chat
                    </TabsTrigger>
                    <TabsTrigger value="questions">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Q&A
                    </TabsTrigger>
                    <TabsTrigger value="notes">
                      <FileText className="h-4 w-4 mr-2" />
                      Notes
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="chat" className="mt-4 h-[300px] flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt={msg.user} />
                            <AvatarFallback>
                              {msg.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">
                                {msg.user}
                                {msg.isInstructor && (
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    Instructor
                                  </Badge>
                                )}
                              </p>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input name="message" placeholder="Type your message..." className="flex-1" />
                      <Button type="submit">Send</Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="questions" className="mt-4 h-[300px]">
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Ask questions to the instructor during the live session.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="notes" className="mt-4 h-[300px]">
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Take notes during the live session to review later.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 order-2">
            <div className="sticky top-20">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Course Content</CardTitle>
                  <CardDescription>
                    {getTotalModulesCount(workshop)} modules • {workshop.lessons.length} lessons
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {workshop.lessons.map((lesson, lessonIndex) => (
                      <AccordionItem key={lesson.id} value={lesson.id}>
                        <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-accent">
                          <div className="flex items-center gap-2 text-left">
                            <BookOpen className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium">{lesson.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pt-0 pb-0">
                          <div className="space-y-1 pl-0">
                            {lesson.modules.map((module, moduleIndex) => (
                              <Button
                                key={module.id}
                                variant="ghost"
                                className={`w-full justify-start rounded-none pl-10 py-2 h-auto ${currentLessonIndex === lessonIndex && currentModuleIndex === moduleIndex
                                  ? "bg-accent"
                                  : ""
                                  }`}
                                onClick={() => handleSelectModule(lessonIndex, moduleIndex)}
                              >
                                <div className="flex items-center gap-2 text-left">
                                  {isModuleCompleted(module.id) ? (
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                  ) : (
                                    <span className="h-4 w-4 rounded-full border flex items-center justify-center text-xs">
                                      {moduleIndex + 1}
                                    </span>
                                  )}
                                  <span className="truncate">{module.title}</span>
                                </div>
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Regular workshop UI
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold mt-2">{workshop.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={workshop.type === "ONLINE" ? "default" : "secondary"}>{workshop.type}</Badge>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{progress.overallProgress}%</span>
          </div>
          <Progress value={progress.overallProgress} className="h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 order-1 lg:order-1">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <Badge variant="outline" className="mb-2">
                    Lesson {currentLessonIndex + 1}: {currentLesson?.title}
                  </Badge>
                  <CardTitle>{currentModule?.title}</CardTitle>
                  <CardDescription>
                    Module {currentModuleIndex + 1} of {currentLesson?.modules.length}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-6">
                <div className="text-center">
                  <Play className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Video content would play here</p>
                </div>
              </div>

              <Tabs defaultValue="content">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">
                    <FileText className="h-4 w-4 mr-2" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="discussion">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Discussion
                  </TabsTrigger>
                  <TabsTrigger value="resources">
                    <Award className="h-4 w-4 mr-2" />
                    Resources
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="p-4 border rounded-md mt-2">
                  <p>{currentModule?.content}</p>
                  <p className="mt-4">
                    In a real workshop, this section would contain detailed explanations, code examples, and interactive
                    elements to help you learn the material.
                  </p>
                </TabsContent>
                <TabsContent value="discussion" className="p-4 border rounded-md mt-2">
                  <p>Discussion forum for this module would appear here.</p>
                  <p className="mt-4">Students and instructors can ask questions, share insights, and collaborate.</p>
                </TabsContent>
                <TabsContent value="resources" className="p-4 border rounded-md mt-2">
                  <p>Additional resources for this module:</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Downloadable materials</li>
                    <li>Reference documentation</li>
                    <li>Practice exercises</li>
                    <li>Supplementary reading</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevModule}
              disabled={currentLessonIndex === 0 && currentModuleIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Module
            </Button>
            <Button
              onClick={handleNextModule}
              disabled={
                currentLessonIndex === workshop.lessons.length - 1 &&
                currentModuleIndex === currentLesson?.modules.length - 1
              }
            >
              {isModuleCompleted(currentModule?.id || "") ? "Next Module" : "Complete & Continue"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1 order-2 lg:order-2">
          <div className="sticky top-20">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Course Content</CardTitle>
                <CardDescription>
                  {getTotalModulesCount(workshop)} modules • {workshop.lessons.length} lessons
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {workshop.lessons.map((lesson, lessonIndex) => (
                    <AccordionItem key={lesson.id} value={lesson.id}>
                      <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-accent">
                        <div className="flex items-center gap-2 text-left">
                          <BookOpen className="h-4 w-4 flex-shrink-0" />
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-0 pt-0 pb-0">
                        <div className="space-y-1 pl-0">
                          {lesson.modules.map((module, moduleIndex) => (
                            <Button
                              key={module.id}
                              variant="ghost"
                              className={`w-full justify-start rounded-none pl-10 py-2 h-auto ${currentLessonIndex === lessonIndex && currentModuleIndex === moduleIndex
                                ? "bg-accent"
                                : ""
                                }`}
                              onClick={() => handleSelectModule(lessonIndex, moduleIndex)}
                            >
                              <div className="flex items-center gap-2 text-left">
                                {isModuleCompleted(module.id) ? (
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                ) : (
                                  <span className="h-4 w-4 rounded-full border flex items-center justify-center text-xs">
                                    {moduleIndex + 1}
                                  </span>
                                )}
                                <span className="truncate">{module.title}</span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

