import { getWorkshopParticipants, getWorkshopProgress } from "@/app/actions/workshops"
import Pagination from "@/components/common/Pagination"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate, getStatus } from "@/lib/utils"
import { BookOpen, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {

    const resp = await getWorkshopParticipants()
    if (resp?.error) {
        throw Error()
    }
    const userWorkshops = resp.data

    // const { userWorkshops, getWorkshopProgress, getParticipantByWorkshopId, getTotalModulesCount } = useWorkshop()


    // const inProgressWorkshops = userWorkshops.filter((workshop) => {
    //     const participant = getParticipantByWorkshopId(workshop.id)
    //     return participant?.completionStatus === "INCOMPLETE"
    // })

    // const completedWorkshops = userWorkshops.filter((workshop) => {
    //     const participant = getParticipantByWorkshopId(workshop.id)
    //     return participant?.completionStatus === "COMPLETED"
    // })

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">My Workshops</h1>
                    <p className="text-muted-foreground">Track your progress and manage your workshops</p>
                </div>
                <Button asChild>
                    <Link href="/">Browse More Workshops</Link>
                </Button>
            </div>

            <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    {userWorkshops.length === 0 ? (
                        <div className="text-center py-12">
                            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-xl font-semibold mb-2">No workshops in progress</h2>
                            <p className="text-muted-foreground mb-6">You haven't started any workshops yet.</p>
                            <Button asChild>
                                <Link href="/">Browse Workshops</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userWorkshops.map(async ({ workshop, ...participantData }) => {
                                // const progress = getWorkshopProgress(workshop.id)
                                // const totalModules = getTotalModulesCount(workshop)
                                const completedModules = workshop?.modules?.filter(module => getStatus(module?.startingDate, module?.endingDate) === "Completed").length

                                return (
                                    <Card key={workshop.id} className="flex flex-col">
                                        <CardHeader className="pb-4">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl">{workshop.name}</CardTitle>
                                                <Badge variant={workshop.type === "ONLINE" ? "default" : "secondary"}>{workshop.type}</Badge>
                                            </div>
                                            <CardDescription>
                                                <p>Joining on {formatDate(participantData?.joining, { time: true })}</p>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Progress</span>
                                                    <span>{await getWorkshopProgress(workshop?.id)}%</span>
                                                </div>
                                                <Progress value={await getWorkshopProgress(workshop?.id)} className="h-2" />
                                                <p className="text-sm text-muted-foreground">
                                                    {completedModules} {" "} of  {" "}{workshop?.modules?.length} {" "}
                                                    Complete Module
                                                </p>
                                            </div>

                                            <div className="mt-4 space-y-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <span>Ends on {formatDate(workshop.endingDate)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                    <span>
                                                        {workshop?.modules?.reduce((count, module) => count + (module.lessons?.length || 0), 0)} lessons • total {workshop?.modules?.length} modules
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Badge
                                                        className={`${participantData?.complete
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                            } py-1 px-4 rounded-full text-md font-medium transition-all duration-300 ease-in-out`}
                                                    >
                                                        {participantData?.complete ? 'Completed' : 'Not Completed'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="pt-4 border-t">
                                            <Button asChild className="w-full">
                                                <Link href={`/workshops/${workshop.id}/player`}>Continue Learning</Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                )
                            })}
                        </div>
                    )}
                </TabsContent>
                {/* <TabsContent value="in-progress">
                    {inProgressWorkshops.length === 0 ? (
                        <div className="text-center py-12">
                            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-xl font-semibold mb-2">No workshops in progress</h2>
                            <p className="text-muted-foreground mb-6">You haven't started any workshops yet.</p>
                            <Button asChild>
                                <Link href="/">Browse Workshops</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {inProgressWorkshops.map((workshop) => {
                                const progress = getWorkshopProgress(workshop.id)
                                const totalModules = getTotalModulesCount(workshop)
                                const completedModules = progress.completedModules.length

                                return (
                                    <Card key={workshop.id} className="flex flex-col">
                                        <CardHeader className="pb-4">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl">{workshop.name}</CardTitle>
                                                <Badge variant={workshop.type === "ONLINE" ? "default" : "secondary"}>{workshop.type}</Badge>
                                            </div>
                                            <CardDescription>
                                                Started on {formatDate(getParticipantByWorkshopId(workshop.id)?.joinedDate || "")}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Progress</span>
                                                    <span>{progress.overallProgress}%</span>
                                                </div>
                                                <Progress value={progress.overallProgress} className="h-2" />
                                                <p className="text-sm text-muted-foreground">
                                                    {completedModules} of {totalModules} modules completed
                                                </p>
                                            </div>

                                            <div className="mt-4 space-y-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <span>Ends on {formatDate(workshop.endDate)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                    <span>
                                                        {workshop.lessons.length} lessons • {totalModules} modules
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="pt-4 border-t">
                                            <Button asChild className="w-full">
                                                <Link href={`/workshops/${workshop.id}/player`}>Continue Learning</Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                )
                            })}
                        </div>
                    )}
                </TabsContent> */}

                {/* <TabsContent value="completed">
                    {completedWorkshops.length === 0 ? (
                        <div className="text-center py-12">
                            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-xl font-semibold mb-2">No completed workshops</h2>
                            <p className="text-muted-foreground mb-6">You haven't completed any workshops yet.</p>
                            <Button asChild>
                                <Link href="/">Browse Workshops</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {completedWorkshops.map((workshop) => {
                                const participant = getParticipantByWorkshopId(workshop.id)
                                const totalModules = getTotalModulesCount(workshop)

                                return (
                                    <Card key={workshop.id} className="flex flex-col">
                                        <CardHeader className="pb-4">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl">{workshop.name}</CardTitle>
                                                <CheckCircle className="h-5 w-5 text-primary" />
                                            </div>
                                            <CardDescription>Completed on {formatDate(participant?.joinedDate || "")}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm">
                                                        {workshop.lessons.length} lessons • {totalModules} modules
                                                    </span>
                                                </div>

                                                {participant?.score && (
                                                    <div>
                                                        <p className="font-medium">Final Score</p>
                                                        <p className="text-2xl font-bold">{participant.score}%</p>
                                                    </div>
                                                )}

                                                {participant?.feedback && (
                                                    <div>
                                                        <p className="font-medium">Your Feedback</p>
                                                        <p className="text-sm text-muted-foreground">"{participant.feedback}"</p>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="pt-4 border-t">
                                            {participant?.certificate ? (
                                                <Button asChild variant="outline" className="w-full">
                                                    <a href={participant.certificate} target="_blank" rel="noopener noreferrer">
                                                        View Certificate
                                                    </a>
                                                </Button>
                                            ) : (
                                                <Button asChild className="w-full">
                                                    <Link href={`/workshops/${workshop.id}/player`}>Review Content</Link>
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                )
                            })}
                        </div>
                    )}
                </TabsContent> */}
            </Tabs>
            <Pagination />
        </div>
    )
}

