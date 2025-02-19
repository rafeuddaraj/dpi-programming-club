"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Icons } from "@/components/icons"

const userProfile = {
  name: "John Doe",
  designation: "IoT Enthusiast",
  department: "Computer Technology",
  semester: "5th",
  email: "john.doe@example.com",
  phone: "+1234567890",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  discord: "johndoe#1234",
  bio: "Passionate about IoT and its applications in solving real-world problems. Always eager to learn and collaborate on innovative projects.",
  skills: ["React", "Python", "IoT", "Public Speaking", "Machine Learning"],
  achievements: [
    { title: "Hackathon Winner 2023", badge: "🏆" },
    { title: "Best Project Award", badge: "🌟" },
  ],
  activities: [
    { title: "Web Development Workshop", type: "event" },
    { title: "AI Seminar", type: "event" },
    { title: "IoT Certification", type: "certification" },
  ],
  courses: [
    { title: "Advanced JavaScript", progress: 80, completed: false },
    { title: "Machine Learning Basics", progress: 100, completed: true },
    { title: "IoT Fundamentals", progress: 60, completed: false },
  ],
  semesterResults: [
    { semester: "1st", gpa: 3.8 },
    { semester: "2nd", gpa: 3.9 },
    { semester: "3rd", gpa: 4.0 },
    { semester: "4th", gpa: 3.9 },
  ],
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info")

  return (
    (<div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8">
        <Card className="relative overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500"></div>
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4 -mt-16 sm:-mt-20">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt={userProfile.name} />
              <AvatarFallback>
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl sm:text-3xl">{userProfile.name}</CardTitle>
              <CardDescription className="text-lg">{userProfile.designation}</CardDescription>
              <p className="text-sm text-muted-foreground mt-1">
                {userProfile.department} | {userProfile.semester} Semester
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-4">
              <Button variant="outline" size="sm">
                <Icons.mail className="mr-2 h-4 w-4" />
                {userProfile.email}
              </Button>
              <Button variant="outline" size="sm">
                <Icons.phone className="mr-2 h-4 w-4" />
                {userProfile.phone}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Icons.linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={userProfile.github} target="_blank" rel="noopener noreferrer">
                  <Icons.github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">About</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{userProfile.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfile.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-2xl">{achievement.badge}</span>
                      <span>{achievement.title}</span>
                    </div>
                  ))}
                  {userProfile.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-2xl">{activity.type === "event" ? "🎉" : "🏅"}</span>
                      <span>{activity.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Courses & Semester Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Courses</h3>
                    {userProfile.courses.map((course, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span>{course.title}</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        {course.completed && <span className="text-sm text-green-500 mt-1">Completed</span>}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Semester Results</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {userProfile.semesterResults.map((result, index) => (
                        <Card key={index}>
                          <CardHeader className="p-4">
                            <CardTitle className="text-base">{result.semester} Semester</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-2xl font-bold">{result.gpa}</p>
                            <p className="text-sm text-muted-foreground">GPA</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>
          <Button variant="outline">Share Profile</Button>
        </div>
      </motion.div>
    </div>)
  );
}

