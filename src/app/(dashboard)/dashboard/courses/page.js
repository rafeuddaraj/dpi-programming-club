import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Award,
  BookOpen,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      instructor: "John Doe",
      students: 45,
      assignments: 8,
      quizzes: 4,
      certificate: true,
      status: "Active",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      students: 32,
      assignments: 10,
      quizzes: 5,
      certificate: true,
      status: "Active",
    },
    {
      id: 3,
      title: "Mobile App Development",
      instructor: "Bob Johnson",
      students: 28,
      assignments: 6,
      quizzes: 3,
      certificate: true,
      status: "Active",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      instructor: "Alice Brown",
      students: 36,
      assignments: 5,
      quizzes: 2,
      certificate: false,
      status: "Draft",
    },
    {
      id: 5,
      title: "Database Management",
      instructor: "Charlie Wilson",
      students: 24,
      assignments: 7,
      quizzes: 4,
      certificate: true,
      status: "Active",
    },
    {
      id: 6,
      title: "Cybersecurity Basics",
      instructor: "Diana Miller",
      students: 30,
      assignments: 9,
      quizzes: 6,
      certificate: true,
      status: "Active",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-amber-100 text-amber-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <Link href="/dashboard/courses/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="data-table-toolbar">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
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
                  <th className="data-table-head">Title</th>
                  <th className="data-table-head">Instructor</th>
                  <th className="data-table-head">Students</th>
                  <th className="data-table-head">Content</th>
                  <th className="data-table-head">Certificate</th>
                  <th className="data-table-head">Status</th>
                  <th className="data-table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="data-table-body">
                {courses.map((course) => (
                  <tr key={course.id} className="data-table-row">
                    <td className="data-table-cell font-medium">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        {course.title}
                      </div>
                    </td>
                    <td className="data-table-cell">{course.instructor}</td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {course.students}
                      </div>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">
                          {course.assignments} Assignments
                        </span>
                        <span className="text-xs">
                          {course.quizzes} Quizzes
                        </span>
                      </div>
                    </td>
                    <td className="data-table-cell">
                      {course.certificate ? (
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-amber-500" />
                          <span className="text-xs">Yes</span>
                        </div>
                      ) : (
                        <span className="text-xs">No</span>
                      )}
                    </td>
                    <td className="data-table-cell">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          course.status
                        )}`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/courses/${course.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link href={`/dashboard/courses/${course.id}/edit`}>
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
              <strong>12</strong> results
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
