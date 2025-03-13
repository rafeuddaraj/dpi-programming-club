"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { WorkshopPreview } from "@/components/workshops/workshop-preview"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Define the workshop schema with Zod



export default function AddAndEditForm({ data, onSubmitHandler, typeOfUse }) {
    const formSchema = z.object({
        name: z.string().min(3, { message: `${typeOfUse} name must be at least 3 characters"` }),
        description: z.string().min(10, { message: "Description must be at least 10 characters" }),
        outline: z.array(z.string().min(1, { message: "Outline item cannot be empty" })),
        registrationDeadline: z.date({ message: "Registration deadline must be need." }),
        startingDate: z.date().optional(),
        endingDate: z.date().optional(),
        type: z.enum(["ONLINE", "OFFLINE"]),
        totalSeats: z.number().min(1, { message: "Total seats must be at least 1" }).optional(),
        instructor: z.object({
            name: z.string().min(2, { message: "Instructor name must be at least 2 characters" }),
            bio: z.string().optional(),
            portfolioUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
        }),
        price: z.number().optional(),
        isActive: z.boolean(),
    })
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("form")
    const [newOutlineItem, setNewOutlineItem] = useState("")
    const [error, setError] = useState("")

    // Initialize the form with react-hook-form and zod resolver
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { ...data, totalSeats: 20 } || {
            name: "",
            description: "",
            outline: [],
            type: "ONLINE",
            totalSeats: 20,
            startingDate: undefined,
            endingDate: undefined,
            registrationDeadline: undefined,
            instructor: {
                name: "",
                bio: "",
                portfolioUrl: "",
            },
            isActive: true,
            price: 0
        },
    })

    // Get form values for preview
    const formValues = form.watch()
    // Handle form submission
    const onSubmit = async (data) => {
        const { name, description, startingDate, endingDate, isActive, registrationDeadline, totalSeats, instructor: { name: instructorName, bio, portfolioUrl }, type, price, outline } = data
        const reqData = { name, description, startingDate, endingDate, isActive, registrationDeadline, instructor: instructorName, instructorDetails: bio, instructorUrl: portfolioUrl, outline, type }

        if (type === "OFFLINE") {
            reqData["totalSeats"] = totalSeats
        }
        if (price) {
            reqData['price'] = price
        }

        await onSubmitHandler(reqData)
    }


    console.log(form.formState?.errors);

    // Handle adding a new outline item
    const handleAddOutlineItem = () => {
        if (!newOutlineItem.trim()) return

        const currentItems = form.getValues("outline") || []
        form.setValue("outline", [...currentItems, newOutlineItem])
        setNewOutlineItem("")
    }

    // Handle removing an outline item
    const handleRemoveOutlineItem = (index) => {
        const currentItems = form.getValues("outline")
        form.setValue(
            "outline",
            currentItems.filter((_, i) => i !== index),
        )
    }

    return (

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
                <TabsTrigger value="form">{typeOfUse} Form</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="form">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="md:col-span-1">
                                <CardHeader>
                                    <CardTitle>{typeOfUse} Details</CardTitle>
                                    <CardDescription>Enter the basic information about your {typeOfUse}.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{typeOfUse} Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={`Enter ${typeOfUse} name`} {...field} />
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
                                                    <Textarea placeholder={`Enter ${typeOfUse} description`} className="min-h-[120px]" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="outline"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Outline</FormLabel>
                                                <div className="space-y-2">
                                                    <div className="flex gap-2">
                                                        <Input
                                                            placeholder="Add an outline item"
                                                            value={newOutlineItem}
                                                            onChange={(e) => setNewOutlineItem(e.target.value)}
                                                        />
                                                        <Button type="button" onClick={handleAddOutlineItem} variant="secondary">
                                                            <Plus className="h-4 w-4 mr-1" /> Add
                                                        </Button>
                                                    </div>

                                                    <div className="space-y-2 mt-2">
                                                        {form.watch("outline")?.map((item, index) => (
                                                            <div key={index} className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
                                                                <div className="flex-1">{item}</div>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleRemoveOutlineItem(index)}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {form.watch("outline")?.length === 0 && (
                                                        <p className="text-sm text-muted-foreground">
                                                            Add at least one outline item for your {typeOfUse}.
                                                        </p>
                                                    )}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-1">
                                <CardHeader>
                                    <CardTitle>Schedule & Type</CardTitle>
                                    <CardDescription>Set the dates and type of your {typeOfUse}.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="registrationDeadline"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Registration Deadline</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full justify-start text-left font-normal",
                                                                    !field.value && "text-muted-foreground",
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="startingDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Start Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full justify-start text-left font-normal",
                                                                        !field.value && "text-muted-foreground",
                                                                    )}
                                                                >
                                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

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
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full justify-start text-left font-normal",
                                                                        !field.value && "text-muted-foreground",
                                                                    )}
                                                                >
                                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel>{typeOfUse} Type</FormLabel>
                                                <FormControl>
                                                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-4">
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="ONLINE" id="online" />
                                                            <Label htmlFor="online">Online</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="OFFLINE" id="offline" />
                                                            <Label htmlFor="offline">Offline</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {form.watch("type") === "OFFLINE" && (
                                        <FormField
                                            control={form.control}
                                            name="totalSeats"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Total Seats</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-1">
                                <CardHeader>
                                    <CardTitle>Instructor Details</CardTitle>
                                    <CardDescription>Provide information about the {typeOfUse} instructor.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="instructor.name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Instructor Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter instructor name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="instructor.bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Instructor Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Enter instructor bio" className="min-h-[100px]" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="instructor.portfolioUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Portfolio URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://" type="url" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-1">
                                <CardHeader>
                                    <CardTitle>Status</CardTitle>
                                    <CardDescription>Set the visibility and status of your {typeOfUse}.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="isActive"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>{typeOfUse} is active</FormLabel>
                                                    <FormDescription>
                                                        When a {typeOfUse} is active, it will be visible to participants and they can register for
                                                        it.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" type="button" onClick={() => router.push("/dashboard/workshops")}>
                                        Cancel
                                    </Button>
                                    <Button disabled={form.formState.isSubmitting} type="submit"> {form.formState.isSubmitting && <Loader2 className="animate-spin" />} {" "}{data ? "Update" : "Create"} {" "} {typeOfUse}</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </form>
                </Form>
            </TabsContent>

            <TabsContent value="preview">
                <WorkshopPreview
                    workshop={formValues}
                />
            </TabsContent>
        </Tabs>
    )
}

