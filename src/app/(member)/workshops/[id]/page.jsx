import { getWorkshopById, getWorkshopParticipant } from "@/app/actions/workshops"
import { auth } from "@/app/auth"
import FeedbackPreview from "@/components/common/feedback-preview"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"
import { Calendar, CheckCircle, Clock, ExternalLink, Users } from "lucide-react"
import Link from "next/link"
import EnrollWorkshop from "../_components/enroll-workshop"

export default async function WorkshopDetailPage({ params: param }) {
  const params = await param
  const session = await auth()
  const { id } = params

  const resp = await getWorkshopById(id)
  if (resp?.error) {
    throw Error()
  }



  const workshop = resp?.data

  const participant = await getWorkshopParticipant(workshop?.id)

  const isEnrolled = !!participant

  if (!workshop) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Workshop not found</h1>
        <p className="mb-8">The workshop you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/">Back to Workshops</Link>
        </Button>
      </div>
    )
  }

  // const outlineItems = workshop.outline.split("\n")

  const module = workshop?.modules[0]
  const lesson = module?.lessons[0]

  console.log(participant);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{workshop.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={workshop.type === "ONLINE" ? "default" : "secondary"}>{workshop.type}</Badge>
                {!workshop.isActive && <Badge variant="destructive">Inactive</Badge>}
              </div>
            </div>
            {session?.user ? isEnrolled ? (
              <Link href={`/workshops/${id}/player/${participant?.lastLessonId || lesson?.id}`}>
                <Button>Continue Learning</Button>
              </Link>
            ) : (
              <EnrollWorkshop workshop={workshop} />
            ) : <Link href={`/auth/login`}>
              <Button className="w-full">
                Login
              </Button>
            </Link>}
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="outline">Outline</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 border rounded-md mt-2">
              <h2 className="text-xl font-semibold mb-4">About This Workshop</h2>
              <div className="p-4">
                <FeedbackPreview markdownText={workshop.description} />
              </div>
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Workshop Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(workshop.startingDate)} - {formatDate(workshop.endingDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Registration Deadline</p>
                    <p className="text-sm text-muted-foreground">{formatDate(workshop.registrationDeadline)}</p>
                  </div>
                </div>

                {workshop.type === "OFFLINE" && workshop.totalSeats && (
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Available Seats</p>
                      <p className="text-sm text-muted-foreground">{workshop.totalSeats} seats total</p>
                    </div>
                  </div>
                )}
                {workshop.price && (
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <text x="2" y="17" fontSize="16" fontWeight="bold">৳</text>
                    </svg>
                    <div>
                      <p className="font-medium">Workshop Price</p>
                      <p className="text-muted-foreground font-bold text-2xl">{workshop.price}</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="outline" className="p-4 border rounded-md mt-2">
              <h2 className="text-xl font-semibold mb-4">Workshop Outline</h2>
              <ul className="space-y-5">
                {workshop?.outline?.map((item, index) => (
                  <li key={index} className="flex gap-5 items-center">
                    <CheckCircle className="text-green-400 w-6 h-6 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

            </TabsContent>

            <TabsContent value="instructor" className="p-4 border rounded-md mt-2">
              <h2 className="text-xl font-semibold mb-4">About the Instructor</h2>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                  <Users className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{workshop.instructor}</h3>
                  <p className="mt-2 text-muted-foreground">{workshop.instructorDetails}</p>
                  <Button variant="link" className="p-0 h-auto mt-2" asChild>
                    <a
                      href={workshop.instructorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <span>Portfolio</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="sticky top-0">
          <Card>
            <CardHeader>
              <CardTitle>Workshop Details</CardTitle>
              <CardDescription>Key information about this workshop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Format</h3>
                <p className="text-sm text-muted-foreground">{workshop.type}</p>
              </div>
              <div>
                <h3 className="font-medium">Free/Premium</h3>
                {workshop?.price ? (
                  <Badge className="bg-blue-500 text-white px-3 py-1 rounded dark:bg-blue-700 dark:text-gray-200">
                    Premium - ৳{workshop?.price}
                  </Badge>
                ) : (
                  <Badge className="bg-green-500 text-white px-3 py-1 rounded dark:bg-green-700 dark:text-gray-200">
                    Free
                  </Badge>
                )}
              </div>
              <div>
                <h3 className="font-medium">Duration</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(workshop?.startingDate)} - {formatDate(workshop?.endingDate
                  )}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Instructor</h3>
                <p className="text-sm text-muted-foreground">{workshop.instructor}</p>
              </div>

              {session?.user ? isEnrolled ? (
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">You're enrolled!</h3>
                  <Link href={`/workshops/${id}/player/${participant?.lastLessonId || lesson?.id}`}>
                    <Button className="w-full">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Ready to join?</h3>
                  <EnrollWorkshop workshop={workshop} />
                </div>
              ) : <Link href={`/auth/login`}>
                <Button className="w-full">
                  Login
                </Button>
              </Link>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

