import { getEventById } from "@/app/actions/events";
import { auth } from "@/app/auth";
import { Button } from "@/components/button";
import { MotionDiv } from "@/components/common/motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isExpiredDate } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, Clock, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";
import EventEnroll from "../_components/EventEnroll";
export default async function EventDetailsPage({ params }) {
  const eventId = (await params).id;

  const resp = await getEventById(eventId, true)

  const { user } = await auth() || {}

  if (resp?.error) {
    throw Error()
  }
  const event = await resp?.data

  const hasEnrolled = event?.EventParticipant?.find(({ participantId }) => participantId === user?.id)

  const seatsLeft = event?.availableSeat - event?.EventParticipant?.length
  const participationPercentage = (event?.EventParticipant?.length / event?.availableSeat) * 100

  console.log("Event", event);



  return (
    <div className="container mx-auto py-8">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{event.name}</CardTitle>
            <CardDescription className="space-y-2">
              {/* Start Time */}
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Start Time:
                </span>
                <span>{format(new Date(event.startTime), "PPpp")}</span>
              </div>

              {/* End Time */}
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  End Time:
                </span>
                <span>{format(new Date(event.endTime), "PPpp")}</span>
              </div>

              {/* Registration Deadline */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Registration Deadline:
                </span>
                <span>{format(new Date(event.registrationDeadline), "PPpp")}</span>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Location:
                </span>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-yellow-400" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span>{event?.price || "Free"}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{event.description}</p>

            {/* Add seats and participants information */}
            <div className="mb-6 p-4 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Registration Status</h3>
              <div className="flex justify-between mb-2">
                <span>
                  Total Participants: {event?.EventParticipant?.length} / {event?.availableSeat}
                </span>
                <span className={seatsLeft <= 5 ? "text-red-500 font-semibold" : "font-medium"}>
                  {seatsLeft} seats remaining
                </span>
              </div>
              <div className="w-full bg-secondary h-3 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full ${participationPercentage > 80
                    ? "bg-red-500"
                    : participationPercentage > 60
                      ? "bg-yellow-500"
                      : "bg-green-500"
                    }`}
                  style={{ width: `${participationPercentage}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {participationPercentage >= 90
                  ? "Almost full! Register now to secure your spot."
                  : participationPercentage >= 70
                    ? "Filling up quickly! Don't miss out."
                    : "Plenty of seats available."}
              </p>
            </div>

            {/* Agenda */}
            <h3 className="text-xl font-semibold mb-2">Agenda</h3>
            <ul className="list-disc list-inside mb-4">
              {event.curriculums.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            {/* Organized by */}
            <p className="mb-4">
              <span className="font-semibold">Organized by:</span> {event.author}
            </p>

            {event?.availableSeat > event?.EventParticipant?.length ? (
              user ? (
                hasEnrolled ? (
                  <Link href={"/profile/dashboard/events"}>
                    <Button>Already Registered</Button>
                  </Link>
                ) : (
                  isExpiredDate(event?.registrationDeadline) ? null : <EventEnroll eventId={eventId} event={event} />
                )
              ) : (
                isExpiredDate(event?.registrationDeadline) ? null : <Link href={"/auth/login"}>
                  <Button>Login</Button>
                </Link>
              )
            ) : hasEnrolled ? (
              <Link href={"/profile"}>
                <Button>Already Registered</Button>
              </Link>
            ) : (
              <Button disabled>Register for Event</Button>
            )}

          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  );
}

