import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function CreateCoursePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/courses">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create New Course</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" placeholder="Enter course title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter course description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Select>
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
                <Select defaultValue="draft">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="certificate" />
              <Label htmlFor="certificate">
                Issue Certificate on Completion
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course-image">Course Image</Label>
              <Input id="course-image" type="file" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="border p-4 rounded-md">
                  <div className="space-y-2">
                    <Label htmlFor={`assignment-title-${i}`}>
                      Assignment {i} Title
                    </Label>
                    <Input
                      id={`assignment-title-${i}`}
                      placeholder="Enter assignment title"
                    />
                  </div>
                  <div className="space-y-2 mt-2">
                    <Label htmlFor={`assignment-description-${i}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`assignment-description-${i}`}
                      placeholder="Enter assignment description"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor={`assignment-due-date-${i}`}>
                        Due Date
                      </Label>
                      <Input id={`assignment-due-date-${i}`} type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`assignment-points-${i}`}>Points</Label>
                      <Input
                        id={`assignment-points-${i}`}
                        type="number"
                        min="0"
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Assignment
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quizzes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="border p-4 rounded-md">
                  <div className="space-y-2">
                    <Label htmlFor={`quiz-title-${i}`}>Quiz {i} Title</Label>
                    <Input
                      id={`quiz-title-${i}`}
                      placeholder="Enter quiz title"
                    />
                  </div>
                  <div className="space-y-2 mt-2">
                    <Label htmlFor={`quiz-description-${i}`}>Description</Label>
                    <Textarea
                      id={`quiz-description-${i}`}
                      placeholder="Enter quiz description"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor={`quiz-time-limit-${i}`}>
                        Time Limit (minutes)
                      </Label>
                      <Input
                        id={`quiz-time-limit-${i}`}
                        type="number"
                        min="0"
                        placeholder="30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`quiz-points-${i}`}>Points</Label>
                      <Input
                        id={`quiz-points-${i}`}
                        type="number"
                        min="0"
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Quiz
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Link href="/dashboard/courses">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button>Create Course</Button>
      </div>
    </div>
  );
}
