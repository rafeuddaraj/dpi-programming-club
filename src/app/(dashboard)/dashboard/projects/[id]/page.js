import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Trash2,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function ProjectDetailsPage({ params }) {
  // In a real app, you would fetch project data based on params.id
  const project = {
    id: params.id,
    title: "Club Website Redesign",
    description:
      "Redesign the computer club website to improve user experience, add new features, and make it mobile-friendly.",
    startDate: "2023-03-15",
    endDate: "2023-06-30",
    lead: "John Doe",
    status: "In Progress",
    progress: 65,
    team: [
      { id: 1, name: "John Doe", role: "Project Lead" },
      { id: 2, name: "Jane Smith", role: "Frontend Developer" },
      { id: 3, name: "Bob Johnson", role: "Backend Developer" },
      { id: 4, name: "Alice Brown", role: "UI/UX Designer" },
      { id: 5, name: "Charlie Wilson", role: "QA Tester" },
    ],
    milestones: [
      {
        id: 1,
        title: "Requirements Gathering",
        dueDate: "2023-03-30",
        status: "Completed",
      },
      {
        id: 2,
        title: "Design Phase",
        dueDate: "2023-04-30",
        status: "Completed",
      },
      {
        id: 3,
        title: "Development Phase",
        dueDate: "2023-05-30",
        status: "In Progress",
      },
      {
        id: 4,
        title: "Testing Phase",
        dueDate: "2023-06-15",
        status: "Not Started",
      },
      {
        id: 5,
        title: "Deployment",
        dueDate: "2023-06-30",
        status: "Not Started",
      },
    ],
  };

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
      <div className="flex items-center gap-2">
        <Link href="/dashboard/projects">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Project Details</h1>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/projects/${project.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Project
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <CardTitle>{project.title}</CardTitle>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p>{project.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Timeline</p>
                  <p className="text-sm">
                    {formatDate(project.startDate)} -{" "}
                    {formatDate(project.endDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Project Lead</p>
                  <p className="text-sm">{project.lead}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Progress</h3>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-right">{project.progress}% Complete</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Team Members</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.team.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <Link href={`/dashboard/users/${member.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <CardTitle>Milestones</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="data-table-container">
              <table className="data-table">
                <thead className="data-table-header">
                  <tr>
                    <th className="data-table-head">Milestone</th>
                    <th className="data-table-head">Due Date</th>
                    <th className="data-table-head">Status</th>
                  </tr>
                </thead>
                <tbody className="data-table-body">
                  {project.milestones.map((milestone) => (
                    <tr key={milestone.id} className="data-table-row">
                      <td className="data-table-cell font-medium">
                        {milestone.title}
                      </td>
                      <td className="data-table-cell">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {formatDate(milestone.dueDate)}
                        </div>
                      </td>
                      <td className="data-table-cell">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                            milestone.status
                          )}`}
                        >
                          {milestone.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
