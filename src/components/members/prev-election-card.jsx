"use client";

import { getRoleColor } from "@/app/(member)/our-teams/_components/feature-election";
import { formatDate } from "@/lib/utils";
import { Award, ChevronDown, ChevronUp, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../button";
import { Card, CardHeader } from "../card";
import { CommonEmptyState } from "../common/empty-states";
import { MotionDiv } from "../common/motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CardContent } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export default function PrevElectionCard({ election }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
      <CardHeader className="p-6 bg-muted/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold">{election?.name}</h3>
            <p className="text-muted-foreground text-sm">
              {formatDate(election?.startingDate)} -{" "}
              {formatDate(election?.endingDate)}
            </p>
          </div>

          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full"
          >
            <div className="flex justify-end">
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full md:w-auto"
                >
                  {isOpen ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Hide Members
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      View Members
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              {election?.members?.length ? (
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {election?.members.map((member) => (
                      <MotionDiv
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link href={`/profile?id=${member?.user?.id}`}>
                          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="relative">
                              <Avatar className="h-12 w-12 border-2 border-primary/20">
                                <AvatarImage
                                  src={
                                    member?.user?.avatar ||
                                    `/placeholder.svg?height=100&width=100&text=${member?.user?.user?.name.substring(
                                      0,
                                      2
                                    )}`
                                  }
                                  alt={member?.user?.user?.name}
                                />
                                <AvatarFallback>
                                  {member?.user?.user?.name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getRoleColor(
                                  member?.role?.value
                                )}`}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {member?.user?.user?.name}
                              </p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Award className="mr-1 h-3 w-3" />
                                <span>{member?.role?.name}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </MotionDiv>
                    ))}
                  </div>
                </CardContent>
              ) : (
                <CardContent>
                  <CommonEmptyState
                    className={"bg-transparent border-transparent"}
                    title="No Users Found"
                    description="There are no users available at this moment."
                    icon={
                      <Users className="h-12 w-12 text-muted-foreground/60" />
                    }
                  />
                </CardContent>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardHeader>
    </Card>
  );
}
