"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { managementTeam } from "@/lib/data";
import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Calendar,
  Clock,
  Code2,
  GraduationCap,
  Hash,
  Timer,
} from "lucide-react";
import { useState } from "react";
import Masonry from "react-masonry-css";

function calculateTermProgress(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();

  if (now < start) return 0;
  if (now > end) return 100;

  return Math.round(((now - start) / (end - start)) * 100);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getRoleColor(roleId) {
  // Color mapping for all predefined roles
  const roleColors = {
    // Leadership roles - gold/amber tones
    1: "from-amber-500 to-yellow-500", // President
    2: "from-amber-400 to-yellow-400", // Vice President

    // Secretary roles - green/teal tones
    3: "from-emerald-500 to-green-500", // General Secretary
    5: "from-emerald-400 to-green-400", // Deputy General Secretary

    // Executive roles - purple/violet tones
    4: "from-violet-500 to-purple-500", // Executive Officer
    6: "from-violet-400 to-purple-400", // Executive Administrator

    // Finance roles - blue tones
    7: "from-blue-500 to-cyan-500", // Finance Manager
    8: "from-blue-400 to-cyan-400", // Assistant Finance Manager

    // Technical roles - red/orange tones
    9: "from-red-500 to-orange-500", // Technical Head
    10: "from-red-400 to-orange-400", // Assistant Technical Head

    // Cultural roles - pink/rose tones
    11: "from-rose-500 to-pink-500", // Cultural Editor
    12: "from-rose-400 to-pink-400", // Cultural Editor (Female)
    13: "from-rose-300 to-pink-300", // Assistant Cultural Editor

    // Publicity roles - indigo/blue tones
    14: "from-indigo-500 to-blue-500", // Publicity Secretary
    15: "from-indigo-400 to-blue-400", // Associate Publicity Secretary
  };

  return roleColors[roleId] || "from-gray-500 to-slate-500";
}

function getRoleName(roleId) {
  const role = predefinedRoles.find((r) => r.value === roleId);
  return role ? role.name : "Member";
}

function getGenderBadgeColor(gender) {
  return gender === "Male"
    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    : "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
}

// Breakpoint columns for the masonry layout
const breakpointColumnsObj = {
  default: 2,
  1100: 2,
  700: 1,
};

export default function ManagementTeam() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center">Management Team</h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {managementTeam.map((member) => (
          <div key={member.id} className="mb-4">
            <ManagementMemberCard member={member} />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

function ManagementMemberCard({ member }) {
  const [isHovered, setIsHovered] = useState(false);
  const termProgress = calculateTermProgress(member.startTime, member.endTime);
  const roleGradient = getRoleColor(member.roleId);
  const roleName = getRoleName(member.roleId);
  const genderBadgeColor = getGenderBadgeColor(member.gender);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className={`bg-gradient-to-r ${roleGradient} p-6`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white/30 shadow-md">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-lg">
                    {member.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 rounded-full px-2 py-0.5 text-xs font-medium ${genderBadgeColor}`}
                >
                  {member.gender}
                </div>
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <div className="flex items-center mt-1">
                  <Award className="mr-1.5 h-4 w-4" />
                  <span className="font-semibold">{roleName}</span>
                </div>
              </div>
            </div>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
              {member.shift} Shift
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Department</div>
              <div className="flex items-center font-medium">
                <Briefcase className="mr-1.5 h-4 w-4 text-primary" />
                {member.department}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Session</div>
              <div className="flex items-center font-medium">
                <Calendar className="mr-1.5 h-4 w-4 text-primary" />
                {member.session}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Roll Number</div>
              <div className="flex items-center font-medium">
                <Hash className="mr-1.5 h-4 w-4 text-primary" />
                {member.roll}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Semester</div>
              <div className="flex items-center font-medium">
                <GraduationCap className="mr-1.5 h-4 w-4 text-primary" />
                {member.semester}
              </div>
            </div>
          </div>

          <div className="pt-2 pb-1 border-t border-gray-100 dark:border-gray-800">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Election</div>
              <div className="font-medium">{member.electionName}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm">
                <Clock className="mr-1.5 h-3.5 w-3.5 text-primary" />
                <span>Term Progress:</span>
              </div>
              <span className="text-sm font-medium">{termProgress}%</span>
            </div>

            <Progress value={termProgress} className="h-2" />

            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <div className="flex items-center">
                <Timer className="mr-1 h-3 w-3" />
                <span>Started: {formatDate(member.startTime)}</span>
              </div>
              <div className="flex items-center">
                <Timer className="mr-1 h-3 w-3" />
                <span>Ends: {formatDate(member.endTime)}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center mb-2">
              <Code2 className="mr-1.5 h-3.5 w-3.5 text-primary" />
              <span className="text-sm text-muted-foreground">Skills:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {member.skills.map((skill, index) => (
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
        </CardContent>
      </Card>
    </motion.div>
  );
}
