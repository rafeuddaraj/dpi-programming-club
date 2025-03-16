"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import MDEditor from "@uiw/react-md-editor"
import { format } from "date-fns"
import { ArrowLeft, CalendarIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

// Define the lesson schema with Zod
const lessonSchema = z.object({
    name: z.string().min(3, { message: "Lesson name must be at least 3 characters" }),
    description: z.string().optional(),
    type: z.enum(["ONLINE", "OFFLINE"]).readonly(),
    liveLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    recordedLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    location: z.string().optional(),
    isActive: z.boolean(),
    startingDate: z.date().optional(),
    endingDate: z.date().optional(),
})

export default function LessonCreateAndEditForm({ data, onSubmitHandler, module }) {
    const router = useRouter()
    // Initialize the form with react-hook-form and zod resolver
    const form = useForm({
        resolver: zodResolver(lessonSchema),
        defaultValues: data || {
            name: "",
            description: "",
            type: module?.type,
            liveLink: "",
            recordedLink: "",
            location: "",
            isActive: true,
            startingDate: undefined,
            endingDate: undefined,
        },
    })
    const { control } = form
    // Watch the type field to conditionally render form elements
    const lessonType = form.watch("type")

    // Handle form submission
    const onSubmit = async (data) => {
        await onSubmitHandler(data)
    }

    console.log(form.formState.errors);


    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">{data ? "Update" : "Create"}{" "} Lesson</h1>
            </div>

            {module && (
                <div className="text-muted-foreground">
                    {data ? "Updating" : "Adding"}{" "} lesson to module: <span className="font-medium text-foreground">{module.name}</span>
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle>Lesson Details</CardTitle>
                            <CardDescription>{data ? "Update" : "Create"}{" "} a new lesson for your module.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Lesson Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter lesson name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Description (Optional)</FormLabel>
                                        <FormControl>
                                            <MDEditor
                                                value={field.value}
                                                onChange={(value) => form.setValue("description", value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Lesson Type</FormLabel>
                                        <FormControl>
                                            <RadioGroup value={field.value} className="flex gap-4">
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

                            {lessonType === "ONLINE" ? (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="liveLink"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel>Live Link (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter live session link" type="url" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="recordedLink"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel>Recorded Link (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter recorded session link" type="url" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            ) : (
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter physical location" {...field} />
                                            </FormControl>
                                            <FormDescription>{lessonType === "OFFLINE" && "Required for offline lessons"}</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={control}
                                name="startingDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Start Date & Time</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                                                            }`}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "PPP p") : <span>Pick a date & time</span>}
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

                            <FormField
                                control={control}
                                name="endingDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>End Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                                                            }`}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "PPP p") : <span>Pick a date</span>}
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

                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel>Lesson is active</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() =>
                                    moduleId && module
                                        ? router.push(`/dashboard/workshops/${module.workshopId}?tab=modules`)
                                        : router.push("/dashboard/workshops")
                                }
                            >
                                Cancel
                            </Button>
                            <Button disabled={form?.formState?.isSubmitting} type="submit">{form.formState.isSubmitting && <Loader2 className="animate-spin" />}{data ? "Update" : "Create"} {" "} Lesson</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    )
}

