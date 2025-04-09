"use client";

import {
  deleteAllSessions,
  deleteSingleSessionSession,
} from "@/app/actions/sessions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatDistanceToNow(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
}
export function SessionsTable({ sessions, page, limit }) {
  const [loadingSessionId, setLoadingSessionId] = useState(null);
  const [isRemovingAll, setIsRemovingAll] = useState(false);

  const handleRemoveSession = async (sessionId) => {
    try {
      setLoadingSessionId(sessionId);
      const resp = await deleteSingleSessionSession(sessionId);
      if (resp?.error) throw Error();
      toast.success("Success", { description: "Session removed successfully" });
    } catch (error) {
      toast.error("Error", { description: "Failed to remove session" });
    }
    setLoadingSessionId(null);
  };

  const handleRemoveAllSessions = async () => {
    setIsRemovingAll(true);
    try {
      const resp = await deleteAllSessions();
      if (resp?.error) throw Error();
      toast.success("Success", { description: "Session removed successfully" });
    } catch (error) {
      toast.error("Error", { description: "Failed to remove session" });
    }
    setIsRemovingAll(false);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              disabled={isRemovingAll || sessions.length === 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove All Sessions
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will remove all active sessions and force all users
                to log in again. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemoveAllSessions}>
                {isRemovingAll ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Continue"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Index</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Last Leggin</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No active sessions found.
                </TableCell>
              </TableRow>
            ) : (
              sessions.map((session, index) => (
                <TableRow key={session.id}>
                  <TableCell className="text-center">
                    {(page - 1) * limit + 1 + index}
                  </TableCell>
                  <TableCell className="font-medium">
                    {session.user.user.name}
                  </TableCell>
                  <TableCell>{session.user.user.rollNo}</TableCell>
                  <TableCell>{session.user.user.semester}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(session.updatedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove the session for{" "}
                            {session.user.user.name} and force them to log in
                            again.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemoveSession(session.id)}
                          >
                            {loadingSessionId === session.id ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Processing...
                              </div>
                            ) : (
                              "Continue"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
