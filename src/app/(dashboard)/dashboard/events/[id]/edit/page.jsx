"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect } from "react"

const eventFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(2, "Location is required"),
  capacity: z.string().min(1, "Capacity is required"),
})

export default function EditEventPage({ params }) {
  const form = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
    },
  })

  // In a real app, you would fetch the event data here
  useEffect(() => {
    // Example data - replace with actual API call
    const eventData = {
      title: "Web Development Workshop",
      description: "Learn the fundamentals of web development in this hands-on workshop.",
      date: "2024-06-15",
      time: "14:00",
      location: "Computer Lab 101",
      capacity: "30",
    }
    form.reset(eventData)
  }, [form])

  async function onSubmit(data) {
    try {
      // Here you would make an API call to update the event
      console.log("Form submitted:", data)
      // Example API call:
      // await fetch(`/api/events/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })
    } catch (error) {
      console.error("Error updating event:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/events/${params.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Event Details
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Event</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
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
                      <Textarea placeholder="Enter event description" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter maximum capacity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Link href={`/dashboard/events/${params.id}`}>
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

