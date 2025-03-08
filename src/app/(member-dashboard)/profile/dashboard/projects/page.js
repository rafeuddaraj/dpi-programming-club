import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import {
  Briefcase,
  Calendar,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: "Club Website Redesign",
      lead: "John Doe",
      members: 5,
      startDate: "2023-03-15",
      endDate: "2023-06-30",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Mobile App Development",
      lead: "Jane Smith",
      members: 4,
      startDate: "2023-04-10",
      endDate: "2023-08-15",
      status: "In Progress",
    },
    {
      id: 3,
      title: "AI Chatbot for Student Queries",
      lead: "Bob Johnson",
      members: 3,
      startDate: "2023-05-01",
      endDate: "2023-07-30",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Database Migration",
      lead: "Alice Brown",
      members: 2,
      startDate: "2023-02-15",
      endDate: "2023-04-30",
      status: "Completed",
    },
    {
      id: 5,
      title: "Cybersecurity Workshop Materials",
      lead: "Charlie Wilson",
      members: 3,
      startDate: "2023-06-01",
      endDate: "2023-07-15",
      status: "Not Started",
    },
    {
      id: 6,
      title: "IoT Smart Campus Project",
      lead: "Diana Miller",
      members: 6,
      startDate: "2023-07-01",
      endDate: "2023-12-31",
      status: "Not Started",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "On Hold":
        return "bg-amber-100 text-amber-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Project Management</h1>
        <Link href="/dashboard/projects/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="data-table-toolbar">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="w-[250px] pl-8"
                />
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
                  <th className="data-table-head">Project Name</th>
                  <th className="data-table-head">Project Lead</th>
                  <th className="data-table-head">Team Size</th>
                  <th className="data-table-head">Timeline</th>
                  <th className="data-table-head">Status</th>
                  <th className="data-table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="data-table-body">
                {projects.map((project) => (
                  <tr key={project.id} className="data-table-row">
                    <td className="data-table-cell font-medium">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        {project.title}
                      </div>
                    </td>
                    <td className="data-table-cell">{project.lead}</td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {project.members}
                      </div>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {formatDate(project.startDate)} -{" "}
                          {formatDate(project.endDate)}
                        </span>
                      </div>
                    </td>
                    <td className="data-table-cell">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/projects/${project.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link href={`/dashboard/projects/${project.id}/edit`}>
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
              Showing <strong>1</strong> to <strong>6</strong> of{" "}
              <strong>10</strong> results
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
  );
}
