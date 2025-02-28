"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript.",
    instructor: "Jane Smith",
    duration: "8 weeks",
    level: "Beginner",
    tags: ["Web", "HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    title: "Advanced React Techniques",
    description: "Master advanced React concepts and state management.",
    instructor: "John Doe",
    duration: "6 weeks",
    level: "Advanced",
    tags: ["React", "Redux", "Hooks"],
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    description: "Explore the basics of machine learning algorithms.",
    instructor: "Alice Johnson",
    duration: "10 weeks",
    level: "Intermediate",
    tags: ["ML", "Python", "Data Science"],
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())))

  return (
    (<div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      <Input
        type="search"
        placeholder="Search courses..."
        className="mb-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>)
  );
}

function CourseCard({ course }) {
  return (
    (<motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>{course.instructor}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{course.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Duration: {course.duration}</p>
            <p>Level: {course.level}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Enroll Now</Button>
        </CardFooter>
      </Card>
    </motion.div>)
  );
}

