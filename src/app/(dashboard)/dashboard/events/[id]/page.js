import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  User,
  Edit,
  Trash2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function EventDetailsPage({ params }) {
  // In a real app, you would fetch event data based on params.id
  const event = {
    id: params.id,
    title: "Annual Hackathon 2023",
    description:
      "Join us for a 24-hour coding marathon where teams compete to build innovative solutions. Prizes for the top three teams!",
    date: "2023-06-15",
    time: "09:00 AM - 09:00 AM (next day)",
    location: "Main Campus, Building A",
    organizer: "John Doe",
    status: "Upcoming",
    maxParticipants: 100,
    currentParticipants: 75,
    registrationDeadline: "2023-06-10",
    participants: [
      { id: 1, name: "Alice Brown", role: "Participant" },
      { id: 2, name: "Bob Johnson", role: "Participant" },
      { id: 3, name: "Charlie Wilson", role: "Participant" },
      { id: 4, name: "Diana Miller", role: "Participant" },
      { id: 5, name: "Edward Davis", role: "Participant" },
    ],
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Ongoing":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/events">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Event Details</h1>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/events/${event.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Event
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Event
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{event.title}</CardTitle>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                  event.status
                )}`}
              >
                {event.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p>{event.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm">{event.time}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Organizer</p>
                <p className="text-sm">{event.organizer}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Participants</p>
                  <p className="text-sm">
                    {event.currentParticipants} / {event.maxParticipants}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Registration Deadline</p>
                  <p className="text-sm">
                    {formatDate(event.registrationDeadline)}
                  </p>
                </div>
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
              {event.participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{participant.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {participant.role}
                      </p>
                    </div>
                  </div>
                  <Link href={`/dashboard/users/${participant.id}`}>
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
  );
}
