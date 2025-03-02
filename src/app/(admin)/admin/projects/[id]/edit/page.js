import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, X } from "lucide-react"

export default function EditProjectPage({ params }) {
  // In a real app, you would fetch project data based on params.id
  const project = {
    id: params.id,
    title: "Club Website Redesign",
    description:
      "Redesign the computer club website to improve user experience, add new features, and make it mobile-friendly.",
    startDate: "2023-03-15",
    endDate: "2023-06-30",
    lead: "john-doe",
    status: "in-progress",
    team: [
      { id: 1, name: "John Doe", userId: "john-doe" },
      { id: 2, name: "Jane Smith", userId: "jane-smith" },
      { id: 3, name: "Bob Johnson", userId: "bob-johnson" },
      { id: 4, name: "Alice Brown", userId: "alice-brown" },
      { id: 5, name: "Charlie Wilson", userId: "charlie-wilson" },
    ],
    milestones: [
      { id: 1, title: "Requirements Gathering", dueDate: "2023-03-30", status: "completed" },
      { id: 2, title: "Design Phase", dueDate: "2023-04-30", status: "completed" },
      { id: 3, title: "Development Phase", dueDate: "2023-05-30", status: "in-progress" },
      { id: 4, title: "Testing Phase", dueDate: "2023-06-15", status: "not-started" },
      { id: 5, title: "Deployment", dueDate: "2023-06-30", status: "not-started" },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/projects/${project.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Project Details
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Project</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" defaultValue={project.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" defaultValue={project.description} rows={4} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" defaultValue={project.startDate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" defaultValue={project.endDate} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-lead">Project Lead</Label>
                <Select defaultValue={project.lead}>
                  <SelectTrigger id="project-lead">
                    <SelectValue placeholder="Select project lead" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="bob-johnson">Bob Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={project.status}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {project.team.map((member) => (
                <div key={member.id} className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <Select defaultValue={member.userId} className="w-[200px]">
                      <SelectTrigger>
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john-doe">John Doe</SelectItem>
                        <SelectItem value="jane-smith">Jane Smith</SelectItem>
                        <SelectItem value="bob-johnson">Bob Johnson</SelectItem>
                        <SelectItem value="alice-brown">Alice Brown</SelectItem>
                        <SelectItem value="charlie-wilson">Charlie Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {project.milestones.map((milestone) => (
                <div key={milestone.id} className="border p-4 rounded-md">
                  <div className="space-y-2">
                    <Label htmlFor={`milestone-title-${milestone.id}`}>Milestone Title</Label>
                    <Input id={`milestone-title-${milestone.id}`} defaultValue={milestone.title} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor={`milestone-due-date-${milestone.id}`}>Due Date</Label>
                      <Input id={`milestone-due-date-${milestone.id}`} type="date" defaultValue={milestone.dueDate} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`milestone-status-${milestone.id}`}>Status</Label>
                      <Select defaultValue={milestone.status}>
                        <SelectTrigger id={`milestone-status-${milestone.id}`}>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-started">Not Started</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Link href={`/projects/${project.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

