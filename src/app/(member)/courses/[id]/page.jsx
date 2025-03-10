"use client";

import ComingSoon from "@/components/common/coming-soon";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

// Mock data for courses (in a real app, this would come from an API or database)
const courses = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript.",
    instructor: "Jane Smith",
    duration: "8 weeks",
    level: "Beginner",
    tags: ["Web", "HTML", "CSS", "JavaScript"],
    syllabus: [
      { week: 1, topic: "HTML Basics", completed: true },
      { week: 2, topic: "CSS Fundamentals", completed: true },
      { week: 3, topic: "JavaScript Introduction", completed: false },
      { week: 4, topic: "DOM Manipulation", completed: false },
      { week: 5, topic: "Responsive Design", completed: false },
      { week: 6, topic: "Introduction to React", completed: false },
      { week: 7, topic: "Building a Simple Web App", completed: false },
      { week: 8, topic: "Deployment and Best Practices", completed: false },
    ],
  },
  // Add more courses as needed
];

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.id;

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  if (process?.env?.NODE_ENV === "production") {
    return <ComingSoon title="Course" />
  }

  const completedWeeks = course.syllabus.filter(
    (week) => week.completed
  ).length;
  const progress = (completedWeeks / course.syllabus.length) * 100;

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{course.title}</CardTitle>
            <CardDescription>
              <div>Instructor: {course.instructor}</div>
              <div>Duration: {course.duration}</div>
              <div>Level: {course.level}</div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{course.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-2">Course Progress</h3>
            <Progress value={progress} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Syllabus</h3>
            <ul className="space-y-2 mb-4">
              {course.syllabus.map((week) => (
                <li key={week.week} className="flex items-center">
                  <Badge
                    variant={week.completed ? "default" : "outline"}
                    className="mr-2"
                  >
                    Week {week.week}
                  </Badge>
                  <span>{week.topic}</span>
                </li>
              ))}
            </ul>
            <Button>Enroll in Course</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}


