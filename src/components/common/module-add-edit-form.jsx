"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const moduleSchema = z.object({
    name: z.string().min(3, "Module name must be at least 3 characters."),
    description: z.string().optional(),
    isActive: z.boolean(),
})

export default function ModuleAddEditForm({ data, onSubmitHandler, typeOfUse }) {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(moduleSchema),
        defaultValues: data || {
            name: "",
            description: "",
            isActive: false,
        },
    })

    const onSubmit = async (data) => {
        await onSubmitHandler(data)
    }

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
