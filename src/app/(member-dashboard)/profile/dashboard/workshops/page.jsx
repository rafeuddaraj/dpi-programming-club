import {
  getWorkshopParticipants,
  getWorkshopProgress,
} from "@/app/actions/workshops";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, getStatus } from "@/lib/utils";
import { BookOpen, Calendar, Clock } from "lucide-react";
import Link from "next/link";

import ComingSoon from "@/components/common/coming-soon";

export default async function DashboardPage() {
  try {
    const resp = await getWorkshopParticipants();
    if (resp?.error) {
      throw Error();
    }
    const userWorkshops = resp?.data;

    const progressData = await Promise.all(
      userWorkshops?.map(async ({ workshop }) => ({
        id: workshop?.id,
        progress: await getWorkshopProgress(workshop?.id),
      }))
    );

    console.log(userWorkshops);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Workshops</h1>
            <p className="text-muted-foreground">
              Track your progress and manage your workshops
            </p>
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
                <h2 className="text-xl font-semibold mb-2">
                  No workshops in progress
                </h2>
                <p className="text-muted-foreground mb-6">
                  You haven't started any workshops yet.
                </p>
                <Button asChild>
                  <Link href="/">Browse Workshops</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userWorkshops?.map(({ workshop, ...participantData }) => {
                  // const progress = getWorkshopProgress(workshop.id)
                  // const totalModules = getTotalModulesCount(workshop)
                  const completedModules = workshop?.modules?.filter(
                    (module) =>
                      getStatus(module?.startingDate, module?.endingDate) ===
                      "Completed"
                  ).length;
                  const progress =
                    progressData?.find((p) => p.id === workshop.id)?.progress ||
                    0;
                  return (
                    <Card key={workshop?.id} className="flex flex-col">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">
                            {workshop?.name}
                          </CardTitle>
                          <Badge
                            variant={
                              workshop?.type === "ONLINE"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {workshop?.type}
                          </Badge>
                        </div>
                        <CardDescription>
                          <p>
                            Joining on{" "}
                            {formatDate(participantData?.joining, {
                              time: true,
                            })}
                          </p>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <p className="text-sm text-muted-foreground">
                            {completedModules} of {workshop?.modules?.length}{" "}
                            Complete Module
                          </p>
                        </div>

                        <div className="mt-4 space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              Ends on {formatDate(workshop?.endingDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {workshop?.modules?.reduce(
                                (count, module) =>
                                  count + (module.lessons?.length || 0),
                                0
                              )}{" "}
                              lessons • total {workshop?.modules?.length}{" "}
                              modules
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={`${
                                participantData?.complete
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              } py-1 px-4 rounded-full text-md font-medium transition-all duration-300 ease-in-out`}
                            >
                              {participantData?.complete
                                ? "Completed"
                                : "Not Completed"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-4 border-t">
                        <Button asChild className="w-full">
                          <Link
                            href={`/workshops/${workshop?.id}/player/67dd69a563c0b5613990c13f`}
                          >
                            Continue Learning
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
          <TabsContent value="in-progress">
            <ComingSoon title="Inprogress" />
          </TabsContent>

          <TabsContent value="completed">
            <ComingSoon title="Completed" />
          </TabsContent>
        </Tabs>
        {/* <Pagination /> */}
      </div>
    );
  } catch (err) {
    console.log(err);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Workshops</h1>
            <p className="text-muted-foreground">
              Track your progress and manage your workshops
            </p>
          </div>
          <Button asChild>
            <Link href="/">Browse More Workshops</Link>
          </Button>
        </div>
        <ComingSoon title="My Workshops" />
      </div>
    );
  }
}
