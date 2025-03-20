"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function RegistrationClosed({ settings }) {
    // Calculate target date (current date + 6 months)
    const [targetDate, setTargetDate] = useState()
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        // Get the target date from settings or use current date if not available
        const targetDate = new Date(settings?.nextRegistrationDeadline || new Date());

        // Update countdown every second
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(interval);  // Stop the interval when countdown ends
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeRemaining({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);  // Cleanup on component unmount
    }, [settings?.nextRegistrationDeadline]);  // Re-run effect if nextRegistrationDeadline changes

    const formatDate = (date) => {
        if (!date) return ""
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl shadow-xl border-0 overflow-hidden">
                <div className="p-6 lg:p-8">
                    <CardHeader className="p-0 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Bell className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold">Registration Currently Closed</CardTitle>
                        <CardDescription className="text-base mt-2">Thank you for your interest in our club</CardDescription>
                    </CardHeader>

                    <CardContent className="p-0 space-y-6">
                        <p className="text-muted-foreground">
                            Our registration process is currently closed. Stay tuned to our club. When the registration starts, it
                            will be announced on the notice board.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3 text-primary">
                                <Calendar className="h-5 w-5" />
                                <span className="font-medium">Maybe Registration Opens On</span>
                            </div>
                            <p className="font-bold text-lg">{formatDate(settings?.nextRegistrationDeadline)}</p>
                        </div>

                        <div className="pt-2">
                            <h3 className="font-medium mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary" />
                                <span>Time Remaining</span>
                            </h3>
                            <div className="grid grid-cols-4 gap-2 text-center">
                                <div className="bg-primary/5 rounded-lg p-3">
                                    <div className="text-2xl sm:text-3xl font-bold text-primary">{timeRemaining.days}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">Days</div>
                                </div>
                                <div className="bg-primary/5 rounded-lg p-3">
                                    <div className="text-2xl sm:text-3xl font-bold text-primary">{timeRemaining.hours}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">Hours</div>
                                </div>
                                <div className="bg-primary/5 rounded-lg p-3">
                                    <div className="text-2xl sm:text-3xl font-bold text-primary">{timeRemaining.minutes}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">Minutes</div>
                                </div>
                                <div className="bg-primary/5 rounded-lg p-3">
                                    <div className="text-2xl sm:text-3xl font-bold text-primary">{timeRemaining.seconds}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">Seconds</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="p-0 mt-6">
                        <Button className="w-full sm:w-auto" size="lg">
                            <Link href={"/notice"}>Check Notice Board</Link>
                        </Button>
                    </CardFooter>
                </div>
            </Card>
        </div>
    )
}
