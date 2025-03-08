
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import Link from "next/link";

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
export default function Achievements({ event, workshop, course }) {
    return (
        <>
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
                                    <Link href={`/events/${evnt?.eventId}/participant/${evnt?.participantId}`}>
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
        </>
    );
}