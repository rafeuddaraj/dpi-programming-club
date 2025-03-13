import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Globe, MapPin, Users } from "lucide-react";


export function WorkshopPreview({ workshop }) {
  // Format the outline into bullet points
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{workshop.name || "Workshop Title"}</CardTitle>
              <CardDescription className="mt-2">
                {workshop.startDate && workshop.endDate ? (
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>
                      {workshop.startDate.toLocaleDateString()} - {workshop.endDate.toLocaleDateString()}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Dates not set</span>
                )}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant={workshop.type === "ONLINE" ? "secondary" : "outline"}>{workshop.type}</Badge>
              <Badge variant={workshop.isActive ? "default" : "destructive"}>
                {workshop.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{workshop.description || "No description provided."}</p>
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
                    Registration Deadline:{" "}
                    {workshop.registrationDeadline ? workshop.registrationDeadline.toLocaleDateString() : "Not set"}
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

            <div>
              <h3 className="text-lg font-semibold mb-2">Instructor</h3>
              {workshop.instructor.name ? (
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={workshop.instructor.name} />
                    <AvatarFallback>{workshop.instructor.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{workshop.instructor.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {workshop.instructor.bio || "No bio provided."}
                    </p>
                    {workshop.instructor.portfolioUrl && (
                      <a
                        href={workshop.instructor.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline mt-1 inline-block"
                      >
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No instructor information provided.</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <p className="text-sm text-muted-foreground">
            This is a preview of how your workshop will appear to participants.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

