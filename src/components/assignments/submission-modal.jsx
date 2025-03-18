"use client";

import { submitAssignment } from "@/app/actions/assignments";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, CheckCircle, ExternalLink, Eye, FileText } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const formSchema = z.object({
    liveLink: z.string().url({
        message: "Please enter a valid URL for the live link",
    }),
    documentLink: z.string().url({
        message: "Please enter a valid URL for the document link",
    }),
});

export default function SubmitAssignmentModal({
    assignment,
    userId,
    isAlreadySubmitted
}) {
    console.log(isAlreadySubmitted);

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formValues, setFormValues] = useState(
        isAlreadySubmitted
            ? {
                liveLink: isAlreadySubmitted.liveLink,
                documentLink: isAlreadySubmitted.documentLink,
            }
            : null
    );

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            liveLink: "",
            documentLink: "",
        },
    });

    function onSubmit(values) {
        setFormValues(values);
        setShowConfirmation(true);
    }

    async function handleConfirmedSubmit() {
        if (!formValues) return;

        try {
            setIsSubmitting(true);
            await submitAssignment({
                assignmentId: assignment.id,
                liveLink: formValues.liveLink,
                documentLink: formValues.documentLink,
                userId,
            });

            toast.success(
                "Submission successful", {
                description: "Your assignment has been submitted successfully.",
            });

            // Close confirmation dialog and main form dialog
            setShowConfirmation(false);
            setOpen(false);

            // Show success dialog
            setShowSuccess(true);

            // Reset form
            form.reset();

            // Refresh the page data
            router.refresh();

        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong. Please try again."
            });
            setShowConfirmation(false);
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleViewSubmission() {
        if (isAlreadySubmitted) {
            setFormValues({
                liveLink: isAlreadySubmitted.liveLink,
                documentLink: isAlreadySubmitted.documentLink,
            });
            setShowSuccess(true);
        }
    }

    return (
        <>
            {/* Main Button - Different based on submission status */}
            {isAlreadySubmitted ? (
                <Button
                    className="flex items-center gap-2"
                    variant="outline"
                    onClick={handleViewSubmission}
                >
                    <Eye className="h-4 w-4" />
                    <span>View Submission</span>
                </Button>
            ) : (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>Submit Assignment</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Submit Assignment</DialogTitle>
                            <DialogDescription>
                                Submit your assignment links for {assignment.name}
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="liveLink"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Live Link</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://your-project-url.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Link to your live deployed project
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="documentLink"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Document Link</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://docs.google.com/document/..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Link to your documentation or report
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-between">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        Submit Assignment
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            )}

            {/* Confirmation Dialog */}
            <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            Confirm Submission
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <p className="mb-2">
                                Are you sure you want to submit this assignment?
                            </p>
                            <p className="font-medium text-amber-600 dark:text-amber-400">
                                You will not be able to submit again after this.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowConfirmation(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmedSubmit}
                            disabled={isSubmitting}
                            className="bg-primary"
                        >
                            {isSubmitting ? "Submitting..." : "Yes, Submit"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Success/View Submission Dialog */}
            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            {isAlreadySubmitted ? "Submission Details" : "Submission Successful"}
                        </DialogTitle>
                        <DialogDescription>
                            {isAlreadySubmitted
                                ? "Your submitted assignment details"
                                : "Your assignment has been submitted successfully."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <h4 className="font-medium text-sm">Submitted Information:</h4>

                            <div className="rounded-md border p-4 space-y-3">
                                <div>
                                    <p className="text-sm font-medium mb-1">Live Link:</p>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={formValues?.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-primary hover:underline flex items-center gap-1"
                                        >
                                            {formValues?.liveLink}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium mb-1">Document Link:</p>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={formValues?.documentLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-primary hover:underline flex items-center gap-1"
                                        >
                                            {formValues?.documentLink}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setShowSuccess(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
