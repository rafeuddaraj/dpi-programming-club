import { getParticipantByEventId } from "@/app/actions/events";
import { CardContent } from "@/components/card";
import EventParticipantDashboard from "@/components/common/marking-system/event-participant-dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EventParticipantsPage({ params, searchParams }) {
  // In a real app, you would fetch the event and participants data here

  const param = await params;
  const searchParam = await searchParams;
  const page = parseInt(searchParam?.page) || 1;
  const searchTerm = searchParam?.q;

  const resp = await getParticipantByEventId(searchTerm, param?.id, page);

  if (resp?.error) {
    throw Error();
  }

  const data = resp?.data?.data;
  const participants = data?.data;

  const event = participants[0]?.event;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/events`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Event
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Event Name: {event?.name}</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle>All Participants</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <EventParticipantDashboard
            params={param}
            searchParams={searchParam}
            componentType="Event"
          />
        </CardContent>
      </Card>
    </div>
  );
}

export const revalidate = 0;
