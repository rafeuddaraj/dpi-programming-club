import { getEventById } from "@/app/actions/events";
import CommonAlert from "@/components/common/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Filter, Search } from "lucide-react";
import Link from "next/link";

export default async function EventParticipantsPage({ params }) {
  // In a real app, you would fetch the event and participants data here

  const param = await params;

  const resp = await getEventById(param?.id);
  const event = resp?.data;
  const participants = event?.EventParticipant;

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
        <h1 className="text-3xl font-bold">Event Name: {event.name}</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle>All Participants</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search participants..."
                  className="w-full sm:w-[250px] pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {participants?.length ? (
            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-7 p-4 font-medium">
                <div>Name</div>
                <div>Email</div>
                <div>Phone</div>
                <div>Registration Date</div>
                <div>Payment Status</div>
                <div>Amount</div>
                <div>Actions</div>
              </div>
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="grid grid-cols-1 md:grid-cols-7 p-4 border-t"
                >
                  <div>{participant.name}</div>
                  <div>{participant.email}</div>
                  <div>{participant.phoneNumber}</div>
                  <div>{participant.joining}</div>
                  <div
                    className={`font-medium ${
                      participant.paymentStatus === "Paid"
                        ? "text-green-500"
                        : participant.paymentStatus === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {participant.amount || "Free"}
                  </div>
                  <div>{participant.amount || "Free"}</div>
                  <div className="flex gap-2">
                    <Link
                      href={`/events/${event.id}/participants/${participant.id}`}
                    >
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <CommonAlert
              description={"There are no participants in this event yet."}
              title={"No Participants"}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
