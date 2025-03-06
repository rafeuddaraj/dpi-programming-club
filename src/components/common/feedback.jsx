"use client"

import MDEditor from "@uiw/react-md-editor";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

export default function Feedback({ data, title, description, onFeedback }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            score: data.score || 0,
            complete: data.complete || false,
            certificate: data.certificate || "",
            feedback: data.feedback || "",
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const resp = await onFeedback(data)
            if (resp?.error) {
                throw Error()
            }
            setIsSuccess(true);
            router.back()
        } catch (err) {
            setError("Failed to update. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-6 space-y-4">
                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                            <h3 className="text-xl font-medium text-center">
                                Update Successful
                            </h3>
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
                                <Label htmlFor="score">Score</Label>
                                <Slider
                                    id="score"
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={[watch("score")]}
                                    onValueChange={(value) => setValue("score", value[0])}
                                />
                                <Input
                                    id="score"
                                    type="number"
                                    step="1"
                                    {...register("score")}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="complete">Completion Status</Label>
                                <Select
                                    defaultValue={data.complete ? "true" : "false"}
                                    onValueChange={(value) => setValue("complete", value === "true")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Completed</SelectItem>
                                        <SelectItem value="false">Not Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="certificate">Certificate Link</Label>
                                <input id="certificate" {...register("certificate")} className="w-full p-2 border rounded-md" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="feedback">Feedback</Label>
                                <MDEditor
                                    value={watch("feedback")}
                                    onChange={(value) => setValue("feedback", value)}
                                />
                            </div>
                        </>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div>
                        <Button variant="outline" type="button" onClick={() => {
                            setIsSuccess(false)
                            setError(false)
                        }}>Cancel</Button>
                    </div>
                    {!isSuccess && (
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Updating..." : "Update"}
                        </Button>
                    )}
                    {isSuccess && (
                        <Link href={`/dashboard/events/${event.id}/participants/${data?.participant.id}`}>
                            <Button>Back to Participant</Button>
                        </Link>
                    )}
                </CardFooter>
            </form>
        </Card>
    );
}
