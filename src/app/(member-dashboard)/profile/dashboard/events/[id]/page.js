import { getEventById, getParticipantByEventId } from "@/app/actions/events";
import { auth } from "@/app/auth";
import { CardDescription } from "@/components/card";
import { MotionDiv } from "@/components/common/motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isExpiredDate } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeft, Clock, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

export default async function EventDetailsPage({ params }) {
  const param = await params;
  const { user } = (await auth()) || {};

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

  console.log("I am covered", event);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/profile/dashboard/events">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>
      </div>

      <div className="container mx-auto py-8">
        <MotionDiv
          MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto"
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

                {/* Location */}
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Location:
                  </span>
                  <span>
                    {event?.type === "OFFLINE" ? event.location : "ONLINE"}
                  </span>
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
              {/* Agenda */}
              <h3 className="text-xl font-semibold mb-2">Agenda</h3>
              <ul className="list-disc list-inside mb-4">
                {event.curriculums.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Organized by */}
              <p className="mb-4">
                <span className="font-semibold">Organized by:</span>{" "}
                {event.author}
              </p>
              {isExpiredDate(event?.endTime) && (
                <Link href={`/profile/dashboard/events/${event?.id}/result`}>
                  <Button size="lg">Result</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </MotionDiv>
      </div>
    </div>
  );
}
