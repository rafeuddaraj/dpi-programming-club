
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";
import Deadline from "@/components/common/deadline";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { MotionDiv } from "../../../../components/common/motion";

export default function EventCard({ event }) {
    const seatsLeft = event?.availableSeat - event?.EventParticipant?.length
    const participationPercentage = (event?.EventParticipant?.length / event?.availableSeat) * 100

    return (
        (<MotionDiv
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

                    {/* Add seats and participants information */}
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>
                                Participants: {event?.EventParticipant?.length}/{event?.availableSeat}
                            </span>
                            <span className={seatsLeft <= 5 ? "text-red-500 font-medium" : ""}>{seatsLeft} seats left</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${participationPercentage > 80
                                    ? "bg-red-500"
                                    : participationPercentage > 60
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                    }`}
                                style={{ width: `${participationPercentage}%` }}
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter>

                    <Button>
                        <Link href={`/events/${event?.id}`}>Learn More</Link>
                    </Button>
                </CardFooter>
            </Card>
        </MotionDiv>)
    );
}