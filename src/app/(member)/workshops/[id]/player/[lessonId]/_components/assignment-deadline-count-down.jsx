"use client";

import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { isExpiredDate } from "@/lib/utils";
import { CalendarClock } from "lucide-react";
import { useEffect, useState } from "react";

export default function AssignmentCardHeader({
  assignment,
  assignmentSubmission,
}) {
  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "No date set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate days remaining
  const getDaysRemaining = (dateString) => {
    if (!dateString) return 0;
    const deuDate = new Date(dateString);
    const now = new Date();
    const diffTime = deuDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Countdown timer state
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Update countdown timer
  useEffect(() => {
    if (!assignment.deuDate || isExpiredDate(assignment.deuDate)) {
      setTimeRemaining(null);
      return;
    }

    const calculateTimeRemaining = () => {
      const now = new Date();
      const deuDate = new Date(assignment.deuDate);
      const totalSeconds = Math.floor(
        (deuDate.getTime() - now.getTime()) / 1000
      );

      if (totalSeconds <= 0) {
        setTimeRemaining(null);
        return;
      }

      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const timerId = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timerId);
  }, [assignment.deuDate]);

  const daysRemaining = getDaysRemaining(assignment.deuDate);

  return (
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{assignment?.name}</CardTitle>
        </div>
        {assignmentSubmission?.status === "PUBLISHED" ? (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            Graded
          </Badge>
        ) : assignmentSubmission?.status === "PENDING" ? (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pending Review
          </Badge>
        ) : (
          <Badge className="bg-gray-100 text-gray-800 border-gray-300">
            Not Submitted
          </Badge>
        )}
      </div>

      {/* Deadline information */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
        <CalendarClock className="h-4 w-4" />
        <span>Due: {formatDate(assignment.deuDate)}</span>

        {!isExpiredDate(assignment.deuDate) ? (
          <Badge
            variant={daysRemaining <= 2 ? "destructive" : "outline"}
            className="ml-2"
          >
            {daysRemaining <= 0 ? "Due today" : `${daysRemaining} days left`}
          </Badge>
        ) : (
          <Badge variant="destructive" className="ml-2">
            Deadline passed
          </Badge>
        )}
      </div>

      {/* Countdown Timer */}
      {timeRemaining && !isExpiredDate(assignment.deuDate) && (
        <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md border">
          <p className="text-xs text-muted-foreground mb-1">Time Remaining:</p>
          <div className="flex justify-center gap-2 text-sm font-medium">
            <div className="flex flex-col items-center">
              <span
                className={`text-lg font-bold ${
                  timeRemaining.days <= 1
                    ? "text-red-500"
                    : timeRemaining.days <= 3
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {timeRemaining.days}
              </span>
              <span className="text-xs text-muted-foreground">days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{timeRemaining.hours}</span>
              <span className="text-xs text-muted-foreground">hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{timeRemaining.minutes}</span>
              <span className="text-xs text-muted-foreground">mins</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{timeRemaining.seconds}</span>
              <span className="text-xs text-muted-foreground">secs</span>
            </div>
          </div>
        </div>
      )}
    </CardHeader>
  );
}
