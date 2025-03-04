"use client";

import { createEvent, getEventById, updateEvent } from "@/app/actions/events";
import CurriculumFields from "@/components/common/curriculums-fields";
import Loader from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
const eventFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  registrationDeadline: z.string().min(1, "End time is required"),
  location: z.string().min(2, "Location is required"),
  type: z.string().min(2, "Type is required"),
  curriculums: z
    .array(z.string())
    .nonempty("At least one curriculum is required"),
  author: z.string().min(2, "Author name is required"),
  price: z.union([z.string(), z.number()]).optional(),
  availableSeat: z.union([z.string(), z.number()]).optional(),
});

function formatDateToLocalDatetime(dateString) {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
}

export default function EventForm({ isEdit = false, id }) {
  const form = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: isEdit && id ? async () => {
      const data = await getEventById(id)
      const defaultValue = data?.data

      defaultValue["startTime"] = formatDateToLocalDatetime(defaultValue["startTime"])
      defaultValue["endTime"] = formatDateToLocalDatetime(defaultValue["endTime"])
      defaultValue["registrationDeadline"] = formatDateToLocalDatetime(defaultValue["registrationDeadline"])

      console.log(defaultValue);


      return defaultValue;
    } : {
      name: "",
      description: "",
      startTime: "",
      endTime: "",
      location: "",
      type: "",
      curriculums: ["OK", "Test"],
      registrationDeadline: "",
      author: "",
      price: "",
      availableSeat: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data) {
    try {
      if (isEdit) {
        const resp = await updateEvent(id, data);
        if (resp.error) {
          throw new Error(resp.message);
        }
        toast.success("Event Update Successfully.");
        return router.push("/dashboard/events");
      } else {
        const resp = await createEvent(data);
        if (resp.error) {
          throw new Error(resp.message);
        }
        toast.success("Event Create Successfully.");
        return router.push("/dashboard/events");
      }

    } catch (error) {
      toast.error(error?.message);
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/events">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{isEdit ? "Update Event" : "Create New Event"}</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Event Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter event description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date & Time Fields */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registrationDeadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Deadline</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Event Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      >
                        <option value="">Select event type</option>
                        <option value="ONLINE">Online</option>
                        <option value="OFFLINE">Offline</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Available Seats */}
              <FormField
                control={form.control}
                name="availableSeat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Seats</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter maximum capacity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter event price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dynamic Curriculums Field */}
              <div>
                <FormLabel>Curriculums</FormLabel>
                <CurriculumFields form={form} />
              </div>
            </CardContent>

            {/* Form Buttons */}
            <CardFooter className="flex justify-end gap-2">
              <Link href="/dashboard/events">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {isEdit ? "Update" : "Create"} Event {form.formState.isSubmitting && <Loader />}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
