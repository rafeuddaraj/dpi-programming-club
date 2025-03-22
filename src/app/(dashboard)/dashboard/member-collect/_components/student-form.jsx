"use client"

import { createRegisteredUser, updateRegisteredUser } from "@/app/actions/registeredUsers"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useMemberCollectState } from "./PageWrapper"
const departments = [
    "Computer Science And Technology",
    "Civil Engineering",
    "Mechanical Technology",
    "Electrical Technology",
    "Electrical Technology",
]

const shifts = ["Morning", "Evening"]

const studentSchema = z.object({
    name: z.string().min(2, {
        message: "Full name must be at least 2 characters.",
    }),
    rollNo: z.string().min(1, {
        message: "Roll number is required.",
    }),
    registrationNo: z.string().min(1, {
        message: "Registration number is required.",
    }),
    session: z.string().min(1, {
        message: "Session is required.",
    }),
    shift: z.string().min(1, {
        message: "Shift is required.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phoneNumber: z.string({
        message: "Phone number must be 11 digits or start with +880 followed by 10 digits.",
    }),
    department: z.string().min(1, {
        message: "Department is required.",
    }),
})


export function StudentForm() {
    const { currentStudent: student, onCloseForm: onCancel, isFormOpen } = useMemberCollectState()
    // Initialize the form with React Hook Form and Zod validation
    const form = useForm({
        resolver: zodResolver(studentSchema),
        defaultValues: student || {
            name: "",
            rollNo: "",
            registrationNo: "",
            session: "",
            shift: "",
            email: "",
            department: "",
            phoneNumber: "",
        },
    })

    useEffect(() => {
        form.reset(student)
    }, [student])

    // Handle form submission
    const handleSubmit = async (values) => {
        try {
            if (student) {
                await updateRegisteredUser(student?.id, values)
                toast.success("Student updated successfully!")
                return onCancel()
            } else {
                // Create student
                const resp = await createRegisteredUser(values)
                if (resp?.error) throw Error()
                toast.success("Student added successfully!")
                return onCancel()
            }
        } catch {
            toast.error("Something went wrong!")
        }
    }

    return (
        <>
            {isFormOpen ? (<Dialog open={isFormOpen} onOpenChange={onCancel}>
                <DialogContent className="sm:max-w-[600px] w-[95vw] max-w-full sm:w-auto" >
                    <DialogHeader>
                        <DialogTitle>{student ? "Edit Student" : "Add New Student"}</DialogTitle>
                        <DialogDescription>
                            {student
                                ? "Update the student information in the form below."
                                : "Fill in the details to add a new student to the system."}
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Full Name <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email Address <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Phone Number <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="rollNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Roll Number <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="registrationNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Registration Number <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="session"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Session</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="shift"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Shift</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select shift" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {shifts.map((shift) => (
                                                        <SelectItem key={shift} value={shift}>
                                                            {shift}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Department</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select department" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {departments.map((department) => (
                                                        <SelectItem key={department} value={department}>
                                                            {department}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={onCancel}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? <span> <Loader2 className="animate-spin" /> Submitting...</span> : student ? "Update Student" : "Add Student"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent >
            </Dialog >) : null}
        </>
    )
}

