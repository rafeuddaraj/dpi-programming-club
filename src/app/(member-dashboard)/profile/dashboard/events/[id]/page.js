import DeleteAction from "@/app/(dashboard)/dashboard/events/[id]/_components/deleteAction";
import { getEventById, getParticipantByEventId } from "@/app/actions/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, getStatus } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  MapPin,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

export default async function EventDetailsPage({ params }) {
  const param = await params;

  const res = await getEventById(param?.id);

  if (res.error) {
    throw Error();
  }
  const event = res?.data;

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

  let participants = [];

  if (event?.EventParticipant?.length) {
    const resp = await getParticipantByEventId(event?.id);
    if (!resp.error) {
      participants = resp?.data;
    }
  }
  console.log(event);

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
          {!["Completed", "Ongoing"].includes(
            getStatus(event?.startTime, event?.endTime)
          ) && (
            <>
              <Link href={`/dashboard/events/${event?.id}/edit`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Event
                </Button>
              </Link>
              <DeleteAction id={param?.id}></DeleteAction>
            </>
          )}
        </div>
      </div>

      <div>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{event?.name}</CardTitle>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                  getStatus(event?.startTime, event?.endTime)
                )}`}
              >
                {getStatus(event?.startTime, event?.endTime)}
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
                  <p className="text-sm">
                    {formatDate(event.startTime, { time: true })}
                  </p>
                  <p className="text-sm">
                    {formatDate(event.endTime, { time: true })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm">
                    {formatDate(event.startTime, { time: true })}
                  </p>
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
                <p className="text-sm">{event.author}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Participants</p>
                  <p className="text-sm">
                    {event.EventParticipant?.length} / {event?.availableSeat}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
