
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/card";
import Deadline from "@/components/common/deadline";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EventCard({ event }) {
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

                    <Button>
                        <Link href={`/events/${event?.id}`}>Learn More</Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>)
    );
}