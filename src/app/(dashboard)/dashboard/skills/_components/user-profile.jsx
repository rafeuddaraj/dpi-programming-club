import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Award, CalendarDays, CheckCircle } from "lucide-react";

export default function UserProfile({ user, approvedSkills }) {
  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Format date (in a real app, you'd have actual dates)
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex flex-col space-y-1 pt-2">
                <Badge variant="outline" className="justify-center">
                  {user.department}
                </Badge>
                <Badge variant="secondary" className="justify-center">
                  {user.position}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Approved Skills</CardTitle>
          <CardDescription>Skills you have been approved for</CardDescription>
        </CardHeader>
        <CardContent>
          {approvedSkills.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No approved skills yet
            </p>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {approvedSkills.map((skill) => (
                  <Card key={skill.id} className="overflow-hidden">
                    <CardHeader className="pb-2 bg-green-50">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <CardTitle className="text-lg">
                          {skill.skillName}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-1 flex items-center">
                          <Award className="h-4 w-4 mr-1 text-green-500" />
                          Experience
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {skill.experience}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 text-sm pt-3 pb-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1 text-green-500" />
                        Approved on {formatDate()}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
