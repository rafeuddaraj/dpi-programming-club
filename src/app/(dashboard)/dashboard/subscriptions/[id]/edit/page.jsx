"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function EditSubscriptionPage({ params }) {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      duration: "",
      status: "",
      features: "",
      maxCourses: "",
      maxWorkshops: "",
      hasProjectAccess: false,
      hasCommunityAccess: false,
      hasMentoring: false,
    },
  })

  // In a real app, you would fetch the subscription data here
  useEffect(() => {
    const subscriptionData = {
      name: "Basic Plan",
      description: "Perfect for beginners starting their journey",
      price: "9.99",
      duration: "monthly",
      status: "active",
      features: "Access to basic courses\nCommunity access\nMonthly workshops\nBasic support",
      maxCourses: "5",
      maxWorkshops: "2",
      hasProjectAccess: true,
      hasCommunityAccess: true,
      hasMentoring: false,
    }
    form.reset(subscriptionData)
  }, [form])

  async function onSubmit(data) {
    try {
      console.log("Form submitted:", data)
      // Add your API call here
    } catch (error) {
      console.error("Error updating subscription plan:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/subscriptions/${params.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plan Details
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Subscription Plan</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Plan Information</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter plan name" {...field} />
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
                      <Textarea placeholder="Enter plan description" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="maxCourses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Courses</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter max courses" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxWorkshops"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Workshops</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter max workshops" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features (One per line)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter plan features" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasProjectAccess"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Project Access</FormLabel>
                        <div className="text-sm text-muted-foreground">Allow access to project resources</div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasCommunityAccess"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Community Access</FormLabel>
                        <div className="text-sm text-muted-foreground">Allow access to community features</div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasMentoring"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Mentoring Access</FormLabel>
                        <div className="text-sm text-muted-foreground">Include mentoring sessions</div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Link href={`/dashboard/subscriptions/${params.id}`}>
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

