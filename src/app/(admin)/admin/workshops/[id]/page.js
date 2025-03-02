import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, Clock, Users, User, Edit, Trash2, FileText } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function WorkshopDetailsPage({ params }) {
  // In a real app, you would fetch workshop data based on params.id
  const workshop = {
    id: params.id,
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This workshop is perfect for beginners with no prior coding experience.",
    date: "2023-06-20",
    time: "10:00 AM - 4:00 PM",
    location: "Lab 101",
    instructor: "John Doe",
    status: "Upcoming",
    maxParticipants: 30,
    currentParticipants: 25,
    registrationDeadline: "2023-06-15",
    materials:
      "Laptop with any modern browser installed. No other software is required as we will be using online code editors.",
    participants: [
      { id: 1, name: "Alice Brown", role: "Participant" },
      { id: 2, name: "Bob Johnson", role: "Participant" },
      { id: 3, name: "Charlie Wilson", role: "Participant" },
      { id: 4, name: "Diana Miller", role: "Participant" },
      { id: 5, name: "Edward Davis", role: "Participant" },
    ],
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Ongoing":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/workshops">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workshops
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Workshop Details</h1>
        <div className="flex items-center gap-2">
          <Link href={`/workshops/${workshop.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Workshop
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Workshop
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{workshop.title}</CardTitle>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(workshop.status)}`}>
                {workshop.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p>{workshop.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm">{formatDate(workshop.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm">{workshop.time}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm">{workshop.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Instructor</p>
                <p className="text-sm">{workshop.instructor}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Participants</p>
                  <p className="text-sm">
                    {workshop.currentParticipants} / {workshop.maxParticipants}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Registration Deadline</p>
                  <p className="text-sm">{formatDate(workshop.registrationDeadline)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Required Materials</p>
                <p className="text-sm">{workshop.materials}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workshop.participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{participant.name}</p>
                      <p className="text-xs text-muted-foreground">{participant.role}</p>
                    </div>
                  </div>
                  <Link href={`/users/${participant.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View All Participants
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

