"use client";

import { createQuiz, updateQuiz } from "@/app/actions/quizzes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Switch } from "@/components/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const formSchema = z.object({
  name: z.string({ required_error: "Name is Required." }).min(4),
  description: z.string({ required_error: "Description is Required." }).min(4),
  startingDate: z.date({ required_error: "Staring Date is Required." }),
  endingDate: z.date({ required_error: "Ending Date is Required." }),
  isActive: z.boolean().default(false),
});

export default function QuizForm({ quizData }) {
  const params = useParams();
  const parentId = params.id;
  const childId = params.childId;
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: quizData || {
      description: "",
      endingDate: undefined,
      startingDate: undefined,
      name: "",
      isActive: false,
    },
  });
  const handleSubmit = async (formData) => {
    try {
      console.log(formData);

      if (quizData) {
        // Updating
        await toast.promise(updateQuiz(params?.quizId, formData), {
          loading: "Updating quiz...",
          success: "Quiz updated successfully",
          error: "Failed to update quiz",
        });
      } else {
        await toast.promise(createQuiz(parentId, childId, formData), {
          loading: "Creating quiz...",
          success: "Quiz created successfully",
          error: "Failed to create quiz",
        });
        console.log("Done", formData);
      }
    } catch {
      //
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details for your quiz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Quiz Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter quiz name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Quiz Description</FormLabel>
                        <FormControl>
                          <MDEditor
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2 flex gap-2">
                  <FormField
                    control={form.control}
                    name="startingDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date & Time</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${
                                  !field.value && "text-muted-foreground"
                                }`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP p")
                                ) : (
                                  <span>Pick a date & time</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-2">
                            <DatePicker
                              selected={field.value}
                              onChange={field.onChange}
                              showTimeSelect
                              timeFormat="hh:mm aa"
                              timeIntervals={1}
                              inline
                              dateFormat="Pp"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 flex gap-2">
                  <FormField
                    control={form.control}
                    name="endingDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${
                                  !field.value && "text-muted-foreground"
                                }`}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP p")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-2">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Quiz is active</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Creating..." : "Create Quiz"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/quizzes")}
                  className="w-full"
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </Form>
    </>
  );
}
