import { getOwnEvents } from "@/app/actions/events";
import { auth } from "@/app/auth";
import FilterAction from "@/components/common/FilterAction";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function EventsPage({ params, searchParams }) {
  const urlSearchParams = await searchParams;
  const { user } = (await auth()) || {};
  // Mock data for events
  const data = await getOwnEvents(
    user?.id,
    urlSearchParams?.q,
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
        return "bg-gray-300 text-gray-900";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Events</h1>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="data-table-toolbar">
            <div className="flex items-center gap-2">
              <FilterAction />
            </div>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead className="data-table-header">
                <tr>
                  <th className="data-table-head">Event Name</th>
                  <th className="data-table-head">Start Date</th>
                  <th className="data-table-head">End Date</th>
                  <th className="data-table-head">Joining Date</th>
                  <th className="data-table-head">Location</th>
                  <th className="data-table-head">Organizer</th>
                  <th className="data-table-head">Status</th>
                  <th className="data-table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="data-table-body">
                {events.map(({ event, ...others }) => (
                  <tr key={event.id} className="data-table-row">
                    <td className="data-table-cell font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {event?.name}
                      </div>
                    </td>
                    <td className="data-table-cell">
                      {formatDate(event?.startTime)}
                    </td>
                    <td className="data-table-cell">
                      {formatDate(event?.endTime)}
                    </td>
                    <td className="data-table-cell">
                      {formatDate(others?.joining)}
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {event?.location}
                      </div>
                    </td>
                    <td className="data-table-cell">{event?.author}</td>
                    <td className="data-table-cell">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          others?.complete ? "Completed" : ""
                        )}`}
                      >
                        {others?.complete ? "Completed" : "Incomplete"}
                      </span>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Link href={`/profile/dashboard/events/${event.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
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
