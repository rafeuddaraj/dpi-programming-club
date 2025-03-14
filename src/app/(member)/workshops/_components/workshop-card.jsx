import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"

export function WorkshopCard({ workshop }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Count total modules across all lessons
  const totalModules = workshop?.modules?.length || 0;

  const totalLessons = workshop?.modules?.reduce((count, module) => count + (module.lessons?.length || 0), 0);




  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{workshop.name}</CardTitle>
          <Badge variant={workshop.type === "ONLINE" ? "default" : "secondary"}>{workshop.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4 line-clamp-3">{workshop.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {formatDate(workshop.startingDate)} - {formatDate(workshop.endingDate)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Instructor: {workshop.instructor}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>
              {totalModules} modules • {totalLessons} lessons
            </span>
          </div>
          {workshop.type === "OFFLINE" && workshop.totalSeats && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{workshop.totalSeats} seats available</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <div className="w-full text-right">
          <Button asChild variant="outline" className="w-1/2">
            <Link href={`/workshops/${workshop.id}`}>Learn more</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

