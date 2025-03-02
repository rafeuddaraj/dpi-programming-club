import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, MoreHorizontal, Calendar, MapPin, Users } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function EventsPage() {
  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Annual Hackathon 2023",
      date: "2023-06-15",
      location: "Main Campus, Building A",
      organizer: "John Doe",
      participants: 75,
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Tech Talk: AI Fundamentals",
      date: "2023-05-20",
      location: "Virtual (Zoom)",
      organizer: "Jane Smith",
      participants: 120,
      status: "Completed",
    },
    {
      id: 3,
      title: "Workshop: Intro to Web Development",
      date: "2023-07-10",
      location: "Lab 101",
      organizer: "Bob Johnson",
      participants: 30,
      status: "Upcoming",
    },
    {
      id: 4,
      title: "Coding Competition",
      date: "2023-08-05",
      location: "Main Auditorium",
      organizer: "Alice Brown",
      participants: 50,
      status: "Upcoming",
    },
    {
      id: 5,
      title: "Industry Visit: Tech Corp",
      date: "2023-04-15",
      location: "Tech Corp HQ",
      organizer: "Charlie Wilson",
      participants: 25,
      status: "Completed",
    },
    {
      id: 6,
      title: "End of Year Celebration",
      date: "2023-12-20",
      location: "Student Center",
      organizer: "Diana Miller",
      participants: 100,
      status: "Upcoming",
    },
  ]

  const getStatusClass = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Ongoing":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <Link href="/events/create">
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
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search events..." className="w-[250px] pl-8" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
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
                  <th className="data-table-head">Date</th>
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
                        {event.title}
                      </div>
                    </td>
                    <td className="data-table-cell">{formatDate(event.date)}</td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {event.location}
                      </div>
                    </td>
                    <td className="data-table-cell">{event.organizer}</td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {event.participants}
                      </div>
                    </td>
                    <td className="data-table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(event.status)}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Link href={`/events/${event.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link href={`/events/${event.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
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

          <div className="data-table-pagination">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to <strong>6</strong> of <strong>10</strong> results
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

