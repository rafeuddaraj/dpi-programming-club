import {
  calculateTermProgress,
  getGenderBadgeColor,
  getRoleColor,
} from "@/app/(member)/our-teams/_components/feature-election";
import GetDepartmentList from "@/utils/DepartmentList";
import {
  Award,
  Briefcase,
  Calendar,
  Code2,
  GraduationCap,
  Hash,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../card";
import { MotionDiv } from "../common/motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import DetailsViewManagementMember from "./DetailsViewManagementMember";

export function ManagementMemberCard({
  member,
  electionName,
  startTime,
  endTime,
}) {
  const termProgress = calculateTermProgress(startTime, endTime);
  const roleGradient = getRoleColor(member.role.value);
  const genderBadgeColor = getGenderBadgeColor(member?.user?.user?.gender);

  const registeredUser = member.user?.user;
  const skills =
    member?.user?.skills
      ?.filter((skill) => skill?.status?.toUpperCase() === "APPROVED")
      ?.map((s) => s?.skill?.name) || [];

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className={`bg-gradient-to-r ${roleGradient} p-6`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white/30 shadow-md">
                  <AvatarImage
                    src={
                      member?.user?.avatar ||
                      `/placeholder.svg?height=100&width=100&text=${registeredUser?.name?.substring(
                        0,
                        2
                      )}`
                    }
                    alt={registeredUser?.name}
                  />
                  <AvatarFallback className="text-lg">
                    {registeredUser?.name?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 rounded-full px-2 py-0.5 text-xs font-medium ${genderBadgeColor}`}
                >
                  {registeredUser?.gender?.toUpperCase() === "MALE"
                    ? "Male"
                    : "Female"}
                </div>
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold">{registeredUser?.name}</h3>
                <div className="flex items-center mt-1">
                  <Award className="mr-1.5 h-4 w-4" />
                  <span className="font-semibold">{member?.role?.name}</span>
                </div>
              </div>
            </div>
            <Badge className="bg-white/20 capitalize hover:bg-white/30 text-white border-none">
              {registeredUser?.shift} Shift
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Department</div>
              <div className="flex items-center font-medium">
                <Briefcase className="mr-1.5 h-4 w-4 text-primary" />
                {GetDepartmentList(registeredUser?.department)}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Session</div>
              <div className="flex items-center font-medium">
                <Calendar className="mr-1.5 h-4 w-4 text-primary" />
                {registeredUser?.session}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Roll Number</div>
              <div className="flex items-center font-medium">
                <Hash className="mr-1.5 h-4 w-4 text-primary" />
                {registeredUser?.rollNo}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Semester</div>
              <div className="flex items-center font-medium">
                <GraduationCap className="mr-1.5 h-4 w-4 text-primary" />
                {registeredUser?.semester}
              </div>
            </div>
          </div>

          {/* {member?.user?.bio && (
            <div className="pt-2 pb-1 border-t border-gray-100 dark:border-gray-800">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Bio</div>
                <div className="text-sm">{member?.user?.bio}</div>
              </div>
            </div>
          )} */}

          <div className="pt-2 pb-1 border-t border-gray-100 dark:border-gray-800">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Election</div>
              <div className="font-medium">{electionName}</div>
            </div>
          </div>

          {skills?.length > 0 && (
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-2">
                <Code2 className="mr-1.5 h-3.5 w-3.5 text-primary" />
                <span className="text-sm text-muted-foreground">Skills:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills?.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 hover:bg-primary/20 text-primary dark:bg-primary/20 dark:hover:bg-primary/30"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <DetailsViewManagementMember
            member={member}
            registeredUser={registeredUser}
          />
        </CardContent>
      </Card>
    </MotionDiv>
  );
}
