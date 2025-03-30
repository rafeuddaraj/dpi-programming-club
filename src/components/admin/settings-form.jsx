"use client";

import { createOrUpdateSettings } from "@/app/actions/settings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Loader2,
  MessageSquare,
  RefreshCw,
  Save,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Form schema
const formSchema = z.object({
  registrationDeadline: z.date().nullable(),
  nextRegistrationDeadline: z.date().nullable(),
  feedbackStatus: z.boolean().default(false),
});

export default function SettingsForm({ settingsData }) {
  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: settingsData || {
      registrationDeadline: null,
      nextRegistrationDeadline: null,
      feedbackStatus: false,
    },
  });
  // Form submission handler
  const onSubmit = async (values) => {
    try {
      delete settingsData?.createdAt;
      delete settingsData?.updatedAt;
      const resp = await createOrUpdateSettings({ ...settingsData, ...values });
      console.log(resp);

      if (resp?.error) throw new Error(resp?.error);
      toast.success("Settings updated", {
        description: `Settings were successfully updated at ${format(
          new Date(),
          "PPP hh:mm aa"
        )}`,
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Registration Deadlines</CardTitle>
            <CardDescription>
              Set the current and upcoming registration deadlines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {form.formState.isSubmitting ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-6 w-[60px]" />
              </div>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="registrationDeadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Current Registration Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP hh:mm aa")
                              ) : (
                                <span>No deadline set</span>
                              )}
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
                      <FormDescription>
                        The date when the current registration period ends
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nextRegistrationDeadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Next Registration Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP hh:mm aa")
                              ) : (
                                <span>No deadline set</span>
                              )}
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
                      <FormDescription>
                        The date when the next registration period will open
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Features</CardTitle>
            <CardDescription>Enable or disable system features</CardDescription>
          </CardHeader>
          <CardContent>
            {form.formState.isSubmitting ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-6 w-[60px]" />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="feedbackStatus"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        <div className="flex items-center">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Feedback System
                        </div>
                      </FormLabel>
                      <FormDescription>
                        Allow users to submit feedback and suggestions
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={form.formState.isSubmitting}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
