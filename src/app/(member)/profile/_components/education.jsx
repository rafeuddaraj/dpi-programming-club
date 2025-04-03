"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import ComingSoon from "@/components/common/coming-soon";
import { CommonEmptyState } from "@/components/common/empty-states";
import ResultComponent from "@/components/common/result-component";
import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
import { COMING_SOON } from "@/lib/utils";

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

export default function Education({ result }) {
  return (
    <>
      <TabsContent value="education">
        <Card>
          <CardHeader>
            <CardTitle>Workshops & Semester Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Workshops</h3>
                {COMING_SOON ? (
                  <ComingSoon title="Workshop Result" />
                ) : (
                  userProfile.courses.map((course, index) => (
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
                  ))
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Semester Results</h3>
                {result ? (
                  <ResultComponent result={result} />
                ) : (
                  <CommonEmptyState title={"No Result found"} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
}
