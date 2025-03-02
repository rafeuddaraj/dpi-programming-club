import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, MoreHorizontal, Wrench, MapPin, Users } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function WorkshopsPage() {
  // Mock data for workshops
  const workshops = [
    {
      id: 1,
      title: "Introduction to Web Development",
      date: "2023-06-20",
      location: "Lab 101",
      instructor: "John Doe",
      participants: 30,
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Advanced JavaScript Techniques",
      date: "2023-05-15",
      location: "Lab 102",
      instructor: "Jane Smith",
      participants: 25,
      status: "Completed",
    },
    {
      id: 3,
      title: "Mobile App Development with React Native",
      date: "2023-07-10",
      location: "Lab 103",
      instructor: "Bob Johnson",
      participants: 20,
      status: "Upcoming",
    },
    {
      id: 4,
      title: "Database Design and Management",
      date: "2023-08-05",
      location: "Lab 104",
      instructor: "Alice Brown",
      participants: 15,
      status: "Upcoming",
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals",
      date: "2023-04-25",
      location: "Lab 105",
      instructor: "Charlie Wilson",
      participants: 35,
      status: "Completed",
    },
    {
      id: 6,
      title: "Cloud Computing with AWS",
      date: "2023-09-15",
      location: "Lab 106",
      instructor: "Diana Miller",
      participants: 20,
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
        <h1 className="text-3xl font-bold">Workshop Management</h1>
        <Link href="/workshops/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Workshop
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Workshops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="data-table-toolbar">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search workshops..." className="w-[250px] pl-8" />
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
                  <th className="data-table-head">Workshop Name</th>
                  <th className="data-table-head">Date</th>
                  <th className="data-table-head">Location</th>
                  <th className="data-table-head">Instructor</th>
                  <th className="data-table-head">Participants</th>
                  <th className="data-table-head">Status</th>
                  <th className="data-table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="data-table-body">
                {workshops.map((workshop) => (
                  <tr key={workshop.id} className="data-table-row">
                    <td className="data-table-cell font-medium">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-primary" />
                        {workshop.title}
                      </div>
                    </td>
                    <td className="data-table-cell">{formatDate(workshop.date)}</td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {workshop.location}
                      </div>
                    </td>
                    <td className="data-table-cell">{workshop.instructor}</td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {workshop.participants}
                      </div>
                    </td>
                    <td className="data-table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(workshop.status)}`}>
                        {workshop.status}
                      </span>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Link href={`/workshops/${workshop.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link href={`/workshops/${workshop.id}/edit`}>
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

