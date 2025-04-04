"use client";

import { approveSkillRequest, rejectSkillRequest } from "@/app/actions/skills";
import { Button } from "@/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TableCell } from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  note: z.string().min(10, { message: "Must be at least 10 characters" }),
});

export default function ApprovalActions({ request }) {
  const [actionType, setActionType] = useState(null); // "approve" or "reject"
  const [currentRequestId, setCurrentRequestId] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      note: "",
    },
  });

  const handleAction = (requestId, type) => {
    setCurrentRequestId(requestId);
    setActionType(type);
    form.reset({ note: "" });
  };

  const submitAction = async (data) => {
    try {
      if (actionType === "approve") {
        const resp = await approveSkillRequest(currentRequestId, data?.note);
        if (resp?.error) {
          throw resp?.message;
        }
        toast.success("Skill request approved!");
      } else {
        const resp = await rejectSkillRequest(currentRequestId, data?.note);
        if (resp?.error) {
          throw resp?.message;
        }
        toast.success("Skill request rejected!");
      }
      setActionType(null);
      form.reset({ note: "" });
    } catch {
      toast.error("Failed to perform action.");
    }
  };

  return (
    <>
      <TableCell className="text-right">
        {request.status === "PENDING" && (
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 text-green-500"
              onClick={() => handleAction(request.id, "approve")}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 text-red-500"
              onClick={() => handleAction(request.id, "reject")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </TableCell>

      <Dialog open={!!actionType} onOpenChange={() => setActionType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve"
                ? "Approve Skill Request"
                : "Reject Skill Request"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve"
                ? "Provide feedback for approval."
                : "Provide a reason for rejection."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitAction)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {actionType === "approve"
                        ? "Feedback"
                        : "Rejection Reason"}
                    </FormLabel>
                    <FormControl>
                      <MDEditor
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
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
                  onClick={() => setActionType(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant={
                    actionType === "approve" ? "secondary" : "destructive"
                  }
                  type="submit"
                >
                  {actionType === "approve"
                    ? "Approve Request"
                    : "Reject Request"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
