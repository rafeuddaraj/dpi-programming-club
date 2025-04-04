"use client";

import { reSubmitSkillRequest } from "@/app/actions/skills";
import FeedbackPreview from "@/components/common/feedback-preview";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Filter, Info, RefreshCw, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const resubmissionSchema = z.object({
  reason: z
    .string()
    .min(10, { message: "Reason must be at least 10 characters" }),
  experience: z
    .string()
    .min(20, { message: "Experience must be at least 20 characters" }),
});

export default function UserSkillsOverview({ skillRequests, onUpdateStatus }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [resubmitDialogOpen, setResubmitDialogOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  const form = useForm({
    resolver: zodResolver(resubmissionSchema),
    defaultValues: {
      reason: "",
      experience: "",
    },
  });

  const filteredRequests = skillRequests.filter((request) => {
    // Apply search filter
    const matchesSearch = request.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Apply status filter
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const handleResubmit = (request) => {
    setCurrentRequest(request);
    form.reset({
      reason: request.reason || "",
      experience: request.experience || "",
    });
    setResubmitDialogOpen(true);
  };

  const submitResubmission = async (data) => {
    try {
      const resp = await reSubmitSkillRequest(currentRequest?.id, data?.reason);
      if (!resp?.error) {
        toast.success("Skill request resubmitted successfully!");
      } else {
        toast.error(resp?.message || "Error resubmitting request");
      }
    } catch (err) {
      toast.error(err?.message || "Error resubmitting request");
    }
    setResubmitDialogOpen(false);
    form.reset();
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Your Skills Overview</CardTitle>
        <CardDescription>Manage and track your skill requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Index</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No skill requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request, index) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {request.name}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Badge
                              variant="outline"
                              className="cursor-pointer hover:bg-accent"
                            >
                              <Info className="h-3 w-3 mr-1" />
                              Details
                            </Badge>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>{request.name}</DialogTitle>
                              <DialogDescription>
                                Skill request details
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">
                                  Status:
                                </h4>
                                <div>{getStatusBadge(request.status)}</div>
                              </div>

                              {request.status === "REJECTED" &&
                                request.rejectionNote && (
                                  <>
                                    <Alert variant="destructive">
                                      <AlertCircle className="h-4 w-4" />
                                      <AlertTitle>Rejection Reason</AlertTitle>
                                      <AlertDescription>
                                        <FeedbackPreview
                                          markdownText={request.rejectionNote}
                                        />
                                      </AlertDescription>
                                    </Alert>
                                  </>
                                )}

                              <Separator />

                              <div>
                                <h4 className="text-sm font-medium mb-1">
                                  Reason for Request:
                                </h4>
                                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                  <FeedbackPreview
                                    markdownText={
                                      request.reason || "No reason provided"
                                    }
                                  />
                                </p>
                              </div>

                              <Separator />

                              <div>
                                <h4 className="text-sm font-medium mb-1">
                                  Your Experience:
                                </h4>
                                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                  <FeedbackPreview
                                    markdownText={
                                      request.experience ||
                                      "No experience details provided"
                                    }
                                  />
                                </p>
                              </div>
                              {request?.feedback && (
                                <>
                                  <Separator />

                                  <div>
                                    <h4 className="text-sm font-medium mb-1">
                                      Reviewer Feedback:
                                    </h4>
                                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                      <FeedbackPreview
                                        markdownText={
                                          request.feedback ||
                                          "No feedback details provided"
                                        }
                                      />
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>
                        {request.status === "REJECTED" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            onClick={() => handleResubmit(request)}
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Resubmit
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </CardContent>

      <Dialog open={resubmitDialogOpen} onOpenChange={setResubmitDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Resubmit Skill Request</DialogTitle>
            <DialogDescription>
              Update your request and resubmit for approval
            </DialogDescription>
          </DialogHeader>

          {currentRequest?.rejectionNote && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Previous Rejection Reason</AlertTitle>
              <AlertDescription>
                {currentRequest.rejectionNote}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitResubmission)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Request</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Why do you need this skill?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your experience with this skill"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setResubmitDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Resubmit Request</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
