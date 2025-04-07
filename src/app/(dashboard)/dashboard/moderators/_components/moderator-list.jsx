import { getAllModerators } from "@/app/actions/moderators";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Award, CheckCircle, Clock, Users, X } from "lucide-react";
import Link from "next/link";

export async function ModeratorList() {
  let moderators = [];
  try {
    const resp = await getAllModerators();
    if (!resp?.error && resp?.status === 200) {
      moderators = resp?.data;
    }
  } catch {
    //
  }

  const getTotalPendingCount = (moderator) => {
    const assignmentCount =
      moderator.assignmentSubmissions?.filter(
        ({ status }) => status === "PENDING"
      )?.length || 0;
    const workshopCount =
      moderator.workshopParticipants?.filter(({ score }) => score === null)
        ?.length || 0;
    const eventCount =
      moderator.EventParticipant?.filter(({ score }) => score === null)
        ?.length || 0;
    const skillCount =
      moderator.skillsReviewer?.filter(({ status }) => status === "PENDING")
        ?.length || 0;
    return assignmentCount + workshopCount + eventCount + skillCount;
  };

  const getTotalApprovedCount = (moderator) => {
    const assignmentCount =
      moderator.assignmentSubmissions?.filter(
        ({ status }) => status === "PUBLISHED"
      )?.length || 0;
    const workshopCount =
      moderator.workshopParticipants?.filter(({ score }) => score !== null)
        ?.length || 0;
    const eventCount =
      moderator.EventParticipant?.filter(({ score }) => score !== null)
        ?.length || 0;
    const skillCount =
      moderator.skillsReviewer?.filter(({ status }) => status === "APPROVED")
        ?.length || 0;
    return assignmentCount + workshopCount + eventCount + skillCount;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Moderator Management</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moderators.map((moderator) => (
          <Link
            href={`/dashboard/moderators/${moderator.id}`}
            key={moderator.id}
          >
            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary/30"></div>
              <CardContent className="pt-6 pb-2">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-primary/20 group-hover:border-primary/50 transition-all">
                      <AvatarImage
                        src={
                          moderator?.avatar ||
                          "/placeholder.svg?height=100&width=100"
                        }
                        alt={moderator?.user?.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {moderator?.user?.name?.substring(0, 2).toUpperCase() ||
                          "MO"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 border border-border">
                      <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold">
                        {getTotalPendingCount(moderator)}
                      </Badge>
                    </div>
                    <div className="absolute -top-2 -left-1 bg-background rounded-full p-0.5 border border-border">
                      <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold">
                        {moderator?.examiner ? <CheckCircle /> : <X />}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {moderator?.user?.name || "Unnamed Moderator"}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {moderator?.user?.email || "No email provided"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="bg-muted/40 rounded-lg p-3 group-hover:bg-muted/60 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <h4 className="font-medium text-sm">Pending Review</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <ModeratorStat
                        label="Assignments"
                        count={
                          moderator?.assignmentSubmissions?.filter(
                            ({ status }) => status === "PENDING"
                          )?.length || 0
                        }
                      />
                      <ModeratorStat
                        label="Workshops"
                        count={
                          moderator?.workshopParticipants?.filter(
                            ({ score }) => score === null
                          )?.length || 0
                        }
                      />
                      <ModeratorStat
                        label="Events"
                        count={
                          moderator?.EventParticipant?.filter(
                            ({ score }) => score === null
                          )?.length || 0
                        }
                      />
                      <ModeratorStat
                        label="Skills"
                        count={
                          moderator?.skillsReviewer?.filter(
                            ({ status }) => status === "PENDING"
                          )?.length || 0
                        }
                      />
                    </div>
                  </div>

                  <div className="bg-muted/40 rounded-lg p-3 group-hover:bg-muted/60 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <h4 className="font-medium text-sm">Approved</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <ModeratorStat
                        label="Assignments"
                        count={
                          moderator?.assignmentSubmissions?.filter(
                            ({ status }) => status === "PUBLISHED"
                          )?.length || 0
                        }
                      />
                      <ModeratorStat
                        label="Workshops"
                        count={
                          moderator?.workshopParticipants?.filter(
                            ({ score }) => score !== null
                          )?.length || 0
                        }
                      />
                      <ModeratorStat
                        label="Events"
                        count={
                          moderator?.EventParticipant?.filter(
                            ({ score }) => score !== null
                          )?.length || 0
                        }
                      />
                      <ModeratorStat
                        label="Skills"
                        count={
                          moderator?.skillsReviewer?.filter(
                            ({ status }) => status === "APPROVED"
                          )?.length || 0
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 py-2 px-4 text-xs font-medium text-center group-hover:bg-primary/10 transition-colors">
                <div className="w-full flex items-center justify-center gap-1">
                  <Award className="h-3 w-3" />
                  <span>View Moderator Profile</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      {moderators.length === 0 && (
        <div className="text-center py-16 bg-muted/20 rounded-lg">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No moderators found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
}

function ModeratorStat({ label, count }) {
  return (
    <div className="flex items-center justify-between bg-background/80 rounded p-2 text-xs">
      <span className="text-muted-foreground">{label}:</span>
      <span
        className={`font-bold ${
          count > 0 ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </div>
  );
}
