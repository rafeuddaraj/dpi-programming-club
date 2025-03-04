import { getEventById } from "@/app/actions/events";
import { MotionDiv } from "@/components/common/motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import EventEnroll from "../_components/EventEnroll";
export default async function EventDetailsPage({ params }) {
  const eventId = (await params).id;

  const resp = await getEventById(eventId)

  if (resp?.error) {
    throw Error()
  }
  const event = await resp?.data


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
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{event.description}</p>

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

            <EventEnroll eventId={eventId} />
          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  );
}

