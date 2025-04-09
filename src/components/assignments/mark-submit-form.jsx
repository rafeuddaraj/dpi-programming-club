"use client";

import { adminAssignmentMarkSubmission } from "@/app/actions/assignments";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  marks: z.coerce
    .number()
    .int()
    .min(0, { message: "Marks cannot be negative" }),
  status: z.enum(["PUBLISHED", "PENDING", "RECHECK", "MARKED"]),
  feedback: z.string().optional(),
});

export default function MarkSubmissionForm({
  submission,
  totalMarks,
  isAdmin,
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      formSchema.refine((data) => data.marks <= totalMarks, {
        message: `Marks cannot exceed the total marks (${totalMarks})`,
        path: ["marks"],
      })
    ),
    defaultValues: {
      marks: submission.marks || 0,
      status: submission.status || "PENDING",
      feedback: submission.feedback || "",
    },
  });

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);
      const resp = await adminAssignmentMarkSubmission(submission?.id, values);
      if (resp?.error) {
        throw Error();
      }

      toast({
        title: "Submission marked",
        description: "The submission has been successfully marked.",
      });
      router.refresh();
      router.push(
        isAdmin
          ? `/dashboard/assignments/submissions?status=all`
          : `/dashboard/assignments?status=all`,
        {
          scroll: true,
        }
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="marks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marks</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={totalMarks} {...field} />
              </FormControl>
              <FormDescription>Out of {totalMarks} total marks</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isAdmin && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="MARKED">Marked</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="RECHECK">Recheck</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <MDEditor
                  className="z-50"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormDescription>
                Optional feedback for the student
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="animate-spin" />}Save Marks
        </Button>
      </form>
    </Form>
  );
}
