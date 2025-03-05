"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function ParticipantPaymentPage({ params }) {
    // In a real app, you would fetch the event and participant data here
    const event = {
        id: params.id,
        title: "Web Development Workshop",
        fee: 25.0,
    }

    const participant = {
        id: params.participantId,
        name: "John Doe",
        email: "john@example.com",
        paymentStatus: "Pending",
        amount: 25.0,
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            paymentStatus: participant.paymentStatus,
            paymentMethod: "",
            transactionId: "",
            amount: participant.amount.toFixed(2),
            notes: "",
        },
    })

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setError(null)

        try {
            // In a real app, you would send this data to your API
            console.log("Payment data:", data)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            setIsSuccess(true)
        } catch (err) {
            setError("Failed to update payment. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const paymentStatus = watch("paymentStatus")

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Link href={`/events/${event.id}/participants/${participant.id}`}>
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Participant
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">Manage Payment</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Participant Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg">{participant.name}</h3>
                            <p className="text-muted-foreground">{participant.email}</p>
                        </div>

                        <div>
                            <h4 className="font-medium">Event</h4>
                            <p>{event.title}</p>
                        </div>

                        <div>
                            <h4 className="font-medium">Registration Fee</h4>
                            <p className="text-lg font-bold">${participant.amount.toFixed(2)}</p>
                        </div>

                        <div>
                            <h4 className="font-medium">Current Payment Status</h4>
                            <div
                                className={`inline-block px-2 py-1 mt-1 rounded-full text-xs font-medium ${participant.paymentStatus === "Paid"
                                    ? "bg-green-100 text-green-800"
                                    : participant.paymentStatus === "Pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {participant.paymentStatus}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Update Payment Status</CardTitle>
                        <CardDescription>Record payment information or update payment status</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                                    <h3 className="text-xl font-medium text-center">Payment Updated Successfully</h3>
                                    <p className="text-center text-muted-foreground">
                                        The payment status has been updated to {paymentStatus}.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 flex items-start gap-2">
                                            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                                            <p>{error}</p>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="paymentStatus">Payment Status</Label>
                                        <Select
                                            defaultValue={participant.paymentStatus}
                                            onValueChange={(value) => setValue("paymentStatus", value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Paid">Paid</SelectItem>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Failed">Failed</SelectItem>
                                                <SelectItem value="Refunded">Refunded</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="paymentMethod">Payment Method</Label>
                                        <Select onValueChange={(value) => setValue("paymentMethod", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Credit Card">Credit Card</SelectItem>
                                                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                                <SelectItem value="Cash">Cash</SelectItem>
                                                <SelectItem value="Mobile Payment">Mobile Payment</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="transactionId">Transaction ID (Optional)</Label>
                                        <Input id="transactionId" {...register("transactionId")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="amount">Amount ($)</Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            step="0.01"
                                            {...register("amount", {
                                                required: "Amount is required",
                                                min: { value: 0, message: "Amount must be positive" },
                                            })}
                                        />
                                        {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes (Optional)</Label>
                                        <Textarea id="notes" {...register("notes")} />
                                    </div>
                                </>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href={`/events/${event.id}/participants/${participant.id}`}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            {!isSuccess && (
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Updating..." : "Update Payment"}
                                </Button>
                            )}
                            {isSuccess && (
                                <Link href={`/events/${event.id}/participants/${participant.id}`}>
                                    <Button>Back to Participant</Button>
                                </Link>
                            )}
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}

