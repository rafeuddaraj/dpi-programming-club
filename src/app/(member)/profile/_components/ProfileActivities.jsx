"use client";

import ComingSoon from "@/components/common/coming-soon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COMING_SOON } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

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
};

export default function ProfileActivities({ user, activities }) {
  const [activeTab, setActiveTab] = useState("info");

  const { event, course, workshop } = activities || {}

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">About</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{user?.about}</p>
              <CardHeader className="m-0 pl-0">
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="m-0 pl-0">
                <div className="flex flex-wrap gap-2">
                  {user?.skills?.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm py-1 cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

              </CardContent>
            </CardContent>

          </Card>
        </TabsContent>
        <TabsContent value="achievements" className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
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
                    <span className="text-2xl">
                      {activity.type === "event" ? "🎉" : "🏅"}
                    </span>
                    <span>{activity.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {event?.length && <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event?.map((evnt, index) => (

                  <>{evnt?.complete && <div key={index} className="flex items-center gap-2">
                    <Link href={`/events/${evnt?.eventId}`}>
                      <span className="text-2xl">{evnt.badge}</span>
                      <span>{evnt.event.name}</span>
                    </Link>
                    <Link href={`${evnt?.certificate}`}>
                      <Badge>Certificate</Badge>
                    </Link>
                  </div>}</>

                ))}
              </div>
            </CardContent>
          </Card>}
        </TabsContent>

        <TabsContent value="education">
          {COMING_SOON ? <ComingSoon title="Courses & Semester Results" /> : <Card>
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
                      {course.completed && (
                        <span className="text-sm text-green-500 mt-1">
                          Completed
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Semester Results
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {userProfile.semesterResults.map((result, index) => (
                      <Card key={index}>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">
                            {result.semester} Semester
                          </CardTitle>
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
          </Card>}
        </TabsContent>
      </Tabs >
    </>
  );
}
