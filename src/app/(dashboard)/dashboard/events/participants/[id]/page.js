import { getParticipantByEventId } from "@/app/actions/events";
import CommonAlert from "@/components/common/alert";
import AllApproved from "@/components/common/AllApproved";
import ApprovedPayment from "@/components/common/approvedPayment";
import FilterAction from "@/components/common/FilterAction";
import Pagination from "@/components/common/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import DistributeEventsParticipant from "../../_components/DistributeEventsParticipant";

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
            <div className="flex gap-2">
              <FilterAction />
              <DistributeEventsParticipant eventId={event?.id} />
              <AllApproved
                participants={participants}
                revalidatePath={`dashboard/events/participants/${param?.id}`}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {participants?.length ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Session
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Roll</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Marked
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Registration Date
                    </TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>TRX</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No participants found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    participants.map(
                      ({
                        id: eventParticipantId,
                        participant,
                        joining,
                        payment,
                        score,
                      }) => (
                        <TableRow key={participant.id}>
                          <TableCell className="font-medium">
                            {participant?.user?.name}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {participant?.user?.email}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {participant.session}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {participant?.user?.rollNo}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {score ? "✅" : score === 0 ? "❌" : "❓"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(joining, { time: true })}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                payment?.paymentStatus === true
                                  ? "success"
                                  : participant?.paymentStatus === false
                                  ? "warning"
                                  : "destructive"
                              }
                            >
                              {payment?.paymentStatus === true ? (
                                "✅"
                              ) : payment?.paymentStatus === false ? (
                                <>
                                  <span>❌</span>
                                  <ApprovedPayment
                                    paymentId={payment?.id}
                                    paymentStatus={payment?.paymentStatus}
                                    revalidatePath={`dashboard/events/participants/${param?.id}`}
                                  />
                                </>
                              ) : (
                                "Free"
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>{payment?.transactionId}</TableCell>
                          <TableCell>
                            {event?.price
                              ? `${event?.price}৳ | ${payment?.amount}৳`
                              : "Free"}
                          </TableCell>

                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/events/participants/${event.id}/${eventParticipantId}`}
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View details
                                  </Link>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    )
                  )}
                </TableBody>
              </Table>
              <Pagination pagination={data?.pagination} />
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

export const revalidate = 0;
