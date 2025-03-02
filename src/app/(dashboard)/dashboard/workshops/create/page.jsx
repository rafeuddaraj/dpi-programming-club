"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"

const workshopFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  instructor: z.string().min(2, "Instructor name is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().min(1, "Duration is required"),
  location: z.string().min(2, "Location is required"),
  capacity: z.string().min(1, "Capacity is required"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  prerequisites: z.string().optional(),
  materials: z.string().optional(),
})

export default function CreateWorkshopPage() {
  const form = useForm({
    resolver: zodResolver(workshopFormSchema),
    defaultValues: {
      title: "",
      description: "",
      instructor: "",
      date: "",
      time: "",
      duration: "",
      location: "",
      capacity: "",
      level: "beginner",
      prerequisites: "",
      materials: "",
    },
  })

  async function onSubmit(data) {
    try {
      console.log("Form submitted:", data)
      // Add your API call here
    } catch (error) {
      console.error("Error creating workshop:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/workshops">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workshops
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create New Workshop</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Workshop Information</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workshop Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workshop title" {...field} />
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
                      <Textarea placeholder="Enter workshop description" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instructor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructor</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter instructor name" {...field} />
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (hours)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter duration" {...field} />
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
                        <Input type="number" placeholder="Enter capacity" {...field} />
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
                      <Input placeholder="Enter workshop location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prerequisites"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prerequisites (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter workshop prerequisites" className="min-h-[60px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="materials"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Materials (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter required materials" className="min-h-[60px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Link href="/dashboard/workshops">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">Create Workshop</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

