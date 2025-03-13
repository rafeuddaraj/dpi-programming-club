import { getEvents } from "@/app/actions/events";
import FilterAction from "@/components/common/FilterAction";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, getStatus } from "@/lib/utils";
import { Calendar, MapPin, MoreHorizontal, Plus, Users } from "lucide-react";
import Link from "next/link";
import StatusFilter from "../../../../components/common/StatusFilter";

export default async function EventsPage({ params, searchParams }) {
  const urlSearchParams = await searchParams;

  // Mock data for events
  const data = await getEvents(
    urlSearchParams?.q,
    urlSearchParams?.status,
    parseInt(urlSearchParams?.page) || 1,
    parseInt(urlSearchParams?.limit) || 10
  );
  const events = data.data.data;
  if (events.error) {
    throw Error();
  }

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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <Link href="/dashboard/events/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="data-table-toolbar">
            <div className="flex items-center gap-2">
              <FilterAction />
              <StatusFilter />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead className="data-table-header">
                <tr>
                  <th className="data-table-head">Event Name</th>
                  <th className="data-table-head">Start Date</th>
                  <th className="data-table-head">End Date</th>
                  <th className="data-table-head">Location</th>
                  <th className="data-table-head">Organizer</th>
                  <th className="data-table-head">Participants</th>
                  <th className="data-table-head">Status</th>
                  <th className="data-table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="data-table-body">
                {events.map((event) => (
                  <tr key={event.id} className="data-table-row">
                    <td className="data-table-cell font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {event.name}
                      </div>
                    </td>
                    <td className="data-table-cell">
                      {formatDate(event.startTime)}
                    </td>
                    <td className="data-table-cell">
                      {formatDate(event.endTime)}
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {event.location}
                      </div>
                    </td>
                    <td className="data-table-cell">{event.author}</td>
                    <td className="data-table-cell">
                      <Link
                        href={`/dashboard/events/participants/${event?.id}`}
                      >
                        <div className="flex items-center gap-2">
                          {" "}
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {event.EventParticipant.length}
                        </div>
                      </Link>
                    </td>
                    <td className="data-table-cell">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          getStatus(event?.startTime, event?.endTime)
                        )}`}
                      >
                        {getStatus(event?.startTime, event?.endTime)}
                      </span>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/events/${event.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>

                        {!["Completed", "Ongoing"].includes(
                          getStatus(event?.startTime, event?.endTime)
                        ) ? (
                          <>
                            {" "}
                            <Link href={`/dashboard/events/${event.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </Link>
                          </>
                        ) : (
                          <Button>N/A</Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination pagination={data?.data?.pagination} />
        </CardContent>
      </Card>
    </div>
  );
}
