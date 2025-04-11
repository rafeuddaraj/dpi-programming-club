"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import GetDepartmentList from "@/utils/DepartmentList";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Clock,
  Code2,
  GraduationCap,
  Hash,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MemberCard({ member }) {
  const [isHovered, setIsHovered] = useState(false);
  const skills =
    member?.skills
      ?.filter((skill) => skill?.status === "APPROVED")
      .map((item) => item?.skill) || [];

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
      <Link href={`/profile?id=${member?.id}`} target="_blank">
        <Card className="overflow-hidden h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={member?.avatar} alt={member?.user?.name} />
                  <AvatarFallback>
                    {member?.user?.name?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-lg font-semibold">
                    {member?.user?.name}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Briefcase className="mr-1 h-3 w-3" />
                    <span>{GetDepartmentList(member?.user?.department)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span className="text-muted-foreground">Session:</span>
                  <span className="font-medium">{member?.user?.session}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <Hash className="h-3.5 w-3.5 text-primary" />
                  <span className="text-muted-foreground">Roll:</span>
                  <span className="font-medium">{member?.user?.rollNo}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  <span className="text-muted-foreground">Semester:</span>
                  <span className="font-medium">{member?.user?.semester}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span className="text-muted-foreground">Shift:</span>
                  <span className="font-medium capitalize">
                    {member?.user?.shift}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center mb-2 space-x-1.5">
                  <Code2 className="h-3.5 w-3.5 text-primary" />
                  <span className="text-sm text-muted-foreground">Skills:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills?.length ? (
                    skills?.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-primary/10 hover:bg-primary/20 text-primary dark:bg-primary/20 dark:hover:bg-primary/30"
                      >
                        {skill?.name}
                      </Badge>
                    ))
                  ) : (
                    <>No Skills</>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
