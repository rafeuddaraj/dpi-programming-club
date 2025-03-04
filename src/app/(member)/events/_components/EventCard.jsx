"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";
import Deadline from "@/components/common/deadline";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function EventCard({ event }) {
    const [isEnrolled, setIsEnrolled] = useState(false)

    return (
        (<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>

            <Card>
                <Link href={`/events/${event?.id}`}>
                    <CardHeader>
                        <CardTitle>{event.name}</CardTitle>
                        <CardDescription>
                            {formatDate(event.startTime, { time: true })}
                        </CardDescription>
                    </CardHeader>
                </Link>
                <CardContent>
                    <p>{event.description}</p>
                    <p className="mt-2 text-sm text-muted-foreground">Location: {event.location}</p>
                    <Deadline deadline={event?.registrationDeadline} title={"Registration Deadline"} />
                </CardContent>

                <CardFooter>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={isEnrolled ? "secondary" : "default"}>{isEnrolled ? "Enrolled" : "Enroll Now"}</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enroll in {event.title}</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to enroll in this event? You can cancel your enrollment later if needed.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={(e) => {
                                    e.stopPropagation()
                                    setIsEnrolled(false)
                                }}>
                                    Cancel
                                </Button>
                                <Button onClick={() => setIsEnrolled(true)}>Confirm Enrollment</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </motion.div>)
    );
}