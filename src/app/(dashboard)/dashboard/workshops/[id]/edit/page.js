import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditWorkshopPage({ params }) {
  // In a real app, you would fetch workshop data based on params.id
  const workshop = {
    id: params.id,
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This workshop is perfect for beginners with no prior coding experience.",
    date: "2023-06-20",
    time: "10:00",
    location: "Lab 101",
    instructor: "john-doe",
    status: "upcoming",
    maxParticipants: 30,
    registrationDeadline: "2023-06-15",
    materials:
      "Laptop with any modern browser installed. No other software is required as we will be using online code editors.",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/workshops/${workshop.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workshop Details
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Workshop</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Workshop Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Workshop Title</Label>
            <Input id="title" defaultValue={workshop.title} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue={workshop.description}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" defaultValue={workshop.date} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" defaultValue={workshop.time} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" defaultValue={workshop.location} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Select defaultValue={workshop.instructor}>
                <SelectTrigger id="instructor">
                  <SelectValue placeholder="Select instructor" />
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
              <Select defaultValue={workshop.status}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max-participants">Maximum Participants</Label>
              <Input
                id="max-participants"
                type="number"
                min="1"
                defaultValue={workshop.maxParticipants}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration-deadline">
                Registration Deadline
              </Label>
              <Input
                id="registration-deadline"
                type="date"
                defaultValue={workshop.registrationDeadline}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="materials">Workshop Materials</Label>
            <Textarea
              id="materials"
              defaultValue={workshop.materials}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workshop-image">Workshop Image</Label>
            <Input id="workshop-image" type="file" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link href={`/workshops/${workshop.id}`}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
