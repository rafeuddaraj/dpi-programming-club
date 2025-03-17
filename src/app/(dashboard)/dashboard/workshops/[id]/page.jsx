import { getWorkshopById } from "@/app/actions/workshops"
import FeedbackPreview from "@/components/common/feedback-preview"
import { ParticipantsList } from "@/components/participants/participants-list"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CalendarIcon, Globe, MapPin, Pencil, Plus, Users } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { ModulesList } from "../_components/modules-list"
import WorkshopTabs from "./_components/workshop-tabs"

export default async function WorkshopDetailsPage({ params: param, searchParams: searchParam }) {

  const params = await param
  const searchParams = await searchParam

  const workshopId = params?.id

  const resp = await getWorkshopById(workshopId)

  if (resp?.error) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Workshop not found</h1>
        <p className="mb-6">The workshop you are looking for does not exist.</p>
        <Link href={"/dashboard/workshops"}>Back to Workshops</Link>
      </div>
    )
  }

  const workshop = resp?.data



  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={"/dashboard/workshops"}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{workshop.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/workshops/edit/${workshop.id}`}>
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Workshop
            </Button>
          </Link>
          <Link href={`/dashboard/workshops/modules/create?workshopId=${workshop.id}`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Module
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant={workshop.type === "ONLINE" ? "secondary" : "outline"}>{workshop.type}</Badge>
        <Badge variant={workshop.isActive ? "default" : "destructive"}>
          {workshop.isActive ? "Active" : "Inactive"}
        </Badge>
        {workshop.registrationDeadline && (
          <Badge variant="outline">
            Registration Deadline: {new Date(workshop.registrationDeadline).toLocaleDateString()}
          </Badge>
        )}
      </div>

      <WorkshopTabs>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Workshop Details</CardTitle>
                <CardDescription>
                  {new Date(workshop.startingDate).toLocaleDateString()} -{" "}
                  {new Date(workshop.endingDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground"><FeedbackPreview markdownText={workshop.description} /></p>
                </div>

                {workshop?.outline?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Outline</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {workshop?.outline?.map((point, index) => (
                        <li key={index} className="text-muted-foreground">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Workshop Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Registration Deadline: {new Date(workshop.registrationDeadline).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {workshop.type === "ONLINE" ? (
                          <>
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span>Online Workshop</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>Offline Workshop</span>
                          </>
                        )}
                      </div>

                      {workshop.type === "OFFLINE" && workshop.totalSeats && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{workshop.totalSeats} Total Seats</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={workshop.instructor} />
                    <AvatarFallback>{workshop.instructor.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{workshop.instructor}</h3>
                  <p className="text-muted-foreground mt-2">{workshop.instructorDetails}</p>
                  {workshop.instructorUrl && (
                    <a
                      href={workshop.instructorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mt-4 inline-block"
                    >
                      View Portfolio
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="modules">
          <Suspense fallback={<div>Loading....</div>}>
            <ModulesList workshopId={workshop?.id} />
          </Suspense>
        </TabsContent>

        <TabsContent value="participants">
          <ParticipantsList workshopId={workshop.id} />
        </TabsContent>
      </WorkshopTabs>
    </div>
  )
}

