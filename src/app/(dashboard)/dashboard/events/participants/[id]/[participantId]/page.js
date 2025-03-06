import { getSingleParticipantById } from "@/app/actions/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EventFeedBack from "./_components/EventFeedBack";

export default async function ParticipantPaymentPage({ params }) {
  // In a real app, you would fetch the event and participant data here
  const promisedParams = await params;
  const { participantId, id } = promisedParams;
  const resp = await getSingleParticipantById(id, participantId);
  if (resp?.error) {
    throw Error();
  }

  const data = resp?.data;
  const participant = data?.participant;
  const event = data?.event;
  const payment = data?.payment;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/events/participants/${event.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Participant
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Manage Payment</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Participant Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{participant.name}</h3>
              <p className="text-muted-foreground">{participant.email}</p>
              <p className="text-muted-foreground">{participant.rollNo}</p>
            </div>

            <div>
              <h4 className="font-medium">Event</h4>
              <p>{event.name}</p>
            </div>

            <div>
              <h4 className="font-medium">Registration Fee</h4>
              {payment ? (
                <p className="text-lg font-bold">
                  ৳{payment.amount.toFixed(2)}
                </p>
              ) : (
                "Free"
              )}
            </div>

            {payment && (
              <div>
                <h4 className="font-medium">Current Payment Status</h4>
                <div
                  className={`inline-block px-2 py-1 mt-1 rounded-full text-xs font-medium ${
                    participant.paymentStatus === true
                      ? "bg-green-100 text-green-800"
                      : participant.paymentStatus === false
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {payment?.paymentStatus ? "✅" : "❌"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <EventFeedBack
          event={event}
          participant={participant}
          eventId={participantId}
          data={data}
          revalidatePath={`/dashboard/events/participants/${event.id}`}
        />
      </div>
    </div>
  );
}
