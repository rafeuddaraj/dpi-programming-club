import {
  getAllSkillRequests,
  unDistributeCountAndDistributeCount,
} from "@/app/actions/skills";
import FeedbackPreview from "@/components/common/feedback-preview";
import Pagination from "@/components/common/Pagination";
import SearchAction from "@/components/notice/search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info } from "lucide-react";
import ApprovalActions from "./approval-actions";
import DistributeAction from "./distribute-action";
import FilterAction from "./filter";

export default async function AdminApproval({
  query,
  page,
  limit,
  statusFilter,
  isAdmin = false,
}) {
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

  let requestSkills = [];
  let pagination = null;
  try {
    statusFilter = statusFilter?.toUpperCase();
    const resp = await getAllSkillRequests(
      query,
      statusFilter || "PENDING",
      page,
      limit
    );
    if (!resp?.error) {
      const data = resp?.data;
      pagination = data?.pagination;
      requestSkills = data?.data;
    }
  } catch (err) {
    //
  }
  let distributedCount = null;
  let unassignedCount = null;
  if (isAdmin) {
    try {
      const resp = await unDistributeCountAndDistributeCount();

      if (!resp?.error) {
        distributedCount = resp?.data?.distributedCount;
        unassignedCount = resp?.data?.unassignedCount;
      }
    } catch {
      //
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative flex gap-4">
        <SearchAction placeholder={"Search by user or skill..."} />
        {isAdmin && <FilterAction />}
      </div>

      {isAdmin && (
        <div className="space-y-4">
          <DistributeAction
            unassignedCount={unassignedCount}
            distributedCount={distributedCount}
          />
        </div>
      )}

      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Roll</TableHead>
              <TableHead>Skill</TableHead>
              {isAdmin && <TableHead>Reviewer</TableHead>}
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requestSkills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No skill requests found
                </TableCell>
              </TableRow>
            ) : (
              requestSkills.map((request, index) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {(page - 1) * limit + 1 + index}
                  </TableCell>
                  <TableCell className="font-medium">
                    {request.user?.user?.name}
                  </TableCell>
                  <TableCell>{request.user?.user?.rollNo}</TableCell>
                  <TableCell>{request.skill?.name}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      {request?.reviewer ? (
                        <>
                          {request?.reviewer?.user?.name}
                          {" - "}
                          {request?.reviewer?.user?.email}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  )}
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 p-2">
                          <Info className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <ScrollArea className="h-[80vh]">
                          <DialogHeader>
                            <DialogTitle>
                              {request.skill?.name} -{" "}
                              {request?.user?.user?.name}
                            </DialogTitle>
                            <DialogDescription>
                              Skill request details
                            </DialogDescription>
                          </DialogHeader>
                          <div className=" break-words whitespace-pre-wrap">
                            <div>
                              <h4 className="text-sm font-medium mb-1">
                                Reason for Request:
                              </h4>
                              <FeedbackPreview
                                markdownText={
                                  request.reason || "No reason provided"
                                }
                              />
                            </div>

                            <Separator />

                            <div>
                              <h4 className="text-sm font-medium mb-1">
                                User Experience:
                              </h4>
                              <FeedbackPreview
                                markdownText={
                                  request.experience ||
                                  "No experience details provided"
                                }
                              />
                            </div>

                            {request?.rejectionNote && (
                              <>
                                <Separator />
                                <div>
                                  <h4 className="text-sm font-medium mb-1 text-red-500">
                                    Rejection Note:
                                  </h4>
                                  <FeedbackPreview
                                    markdownText={request.rejectionNote}
                                  />
                                </div>
                              </>
                            )}
                            {request.status === "APPROVED" &&
                              request.feedback && (
                                <>
                                  <Separator />
                                  <div>
                                    <h4 className="text-sm font-medium mb-1 text-success-500">
                                      Feedback:
                                    </h4>
                                    <FeedbackPreview
                                      markdownText={request.feedback}
                                    />
                                  </div>
                                </>
                              )}
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <ApprovalActions request={request} isAdmin={isAdmin} />
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <Pagination pagination={pagination} />
    </div>
  );
}
