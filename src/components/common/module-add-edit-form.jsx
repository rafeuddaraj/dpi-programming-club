"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const moduleSchema = z.object({
    name: z.string().min(3, "Module name must be at least 3 characters."),
    description: z.string().optional(),
    isActive: z.boolean(),
    startingDate: z.date().optional(),
    endingDate: z.date().optional(),
})

export default function ModuleAddEditForm({ data, onSubmitHandler, typeOfUse }) {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(moduleSchema),
        defaultValues: data || {
            name: "",
            description: "",
            isActive: false,
            startingDate: undefined,
            endingDate: undefined,
        },
    })

    const onSubmit = async (data) => {
        await onSubmitHandler(data)
    }

    const { control } = form

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Module Details</CardTitle>
                        <CardDescription>Create a new module for your {typeOfUse}.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Module Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter module name" {...field} />
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
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter module description" className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                    <FormLabel>Module is active</FormLabel>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button disabled={form.formState.isSubmitting} type="submit"> {form.formState.isSubmitting && <Loader2 className="animate-spin" />} {" "} {data ? "Edit " : "Create "} Module</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
