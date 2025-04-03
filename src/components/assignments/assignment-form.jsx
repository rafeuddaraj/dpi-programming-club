"use client";

import { createAssignment, updateAssignment } from "@/app/actions/assignments";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  assignableType: z.enum(["WORKSHOP"]).readonly(),
  totalMarks: z.coerce.number().int().min(1).max(1000),
  deuDate: z.date({
    required_error: "Due date is required.",
  }),
});

export default function AssignmentForm({ lessonId, assignment }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: assignment
      ? {
          ...assignment,
          deuDate: new Date(assignment.deuDate),
        }
      : {
          name: "",
          description: "",
          assignableType: "WORKSHOP",
          totalMarks: 100,
          deuDate: new Date(),
        },
  });

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);
      if (assignment) {
        const resp = await updateAssignment(assignment?.id, values);
        if (resp?.error) {
          throw Error();
        }
        toast.success("Assignment updated", {
          description: "The assignment has been successfully updated.",
        });
      } else {
        const resp = await createAssignment({ ...values, lessonId });
        if (resp?.error) {
          throw Error();
        }
        toast.success("Assignment created", {
          description: "The assignment has been successfully created.",
        });
      }
      router.back();
      router.refresh();
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Assignment name" {...field} />
              </FormControl>
              <FormDescription>The name of the assignment.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <MDEditor
                  value={field.value}
                  onChange={(value) => form.setValue("description", value)}
                />
              </FormControl>
              <FormDescription>
                Detailed instructions for the assignment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="assignableType"
            disabled={true}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem disabled={true} value="COURSE">
                      Course
                    </SelectItem>
                    <SelectItem value="WORKSHOP">Workshop</SelectItem>
                    <SelectItem disabled={true} value="PROJECT">
                      Project
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The type of assignment.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalMarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Marks</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={1000} {...field} />
                </FormControl>
                <FormDescription>
                  Maximum marks for this assignment.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="deuDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP hh:mm aa")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="Pp"
                      showTimeSelect
                      timeFormat="hh:mm aa"
                      timeIntervals={1}
                      inline
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>The deadline for submission.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Saving...
              </>
            ) : assignment ? (
              "Update Assignment"
            ) : (
              "Create Assignment"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
