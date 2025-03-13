import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function RecentWorkshops() {
  return (
    <div className="space-y-8">
      {recentWorkshops.map((workshop) => (
        <div key={workshop.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={workshop.instructorAvatar} alt="Instructor" />
            <AvatarFallback>{workshop.instructor.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <Link href={`/dashboard/workshops/${workshop.id}`} className="text-sm font-medium hover:underline">
              {workshop.name}
            </Link>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">By {workshop.instructor}</p>
              <Badge variant={workshop.type === "ONLINE" ? "secondary" : "outline"}>{workshop.type}</Badge>
            </div>
          </div>
          <div className="ml-auto font-medium">{new Date(workshop.startDate).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  )
}

const recentWorkshops = [
  {
    id: "1",
    name: "Web Development Fundamentals",
    instructor: "John Doe",
    instructorAvatar: "/placeholder.svg?height=36&width=36",
    type: "ONLINE",
    startDate: "2023-11-15",
  },
  {
    id: "2",
    name: "UX Design Workshop",
    instructor: "Jane Smith",
    instructorAvatar: "/placeholder.svg?height=36&width=36",
    type: "OFFLINE",
    startDate: "2023-11-20",
  },
  {
    id: "3",
    name: "Mobile App Development",
    instructor: "Mike Johnson",
    instructorAvatar: "/placeholder.svg?height=36&width=36",
    type: "ONLINE",
    startDate: "2023-11-25",
  },
  {
    id: "4",
    name: "Data Science Bootcamp",
    instructor: "Sarah Williams",
    instructorAvatar: "/placeholder.svg?height=36&width=36",
    type: "OFFLINE",
    startDate: "2023-12-01",
  },
  {
    id: "5",
    name: "AI and Machine Learning",
    instructor: "David Brown",
    instructorAvatar: "/placeholder.svg?height=36&width=36",
    type: "ONLINE",
    startDate: "2023-12-05",
  },
]

