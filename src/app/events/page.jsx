"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const events = [
  {
    id: 1,
    title: "Web Development Workshop",
    description: "Learn the latest web development technologies and best practices.",
    date: "2023-07-15",
    time: "10:00 AM - 2:00 PM",
    location: "Computer Lab 1",
  },
  {
    id: 2,
    title: "AI Seminar",
    description: "Explore the world of Artificial Intelligence and its applications.",
    date: "2023-07-22",
    time: "2:00 PM - 5:00 PM",
    location: "Auditorium",
  },
  {
    id: 3,
    title: "Hackathon 2023",
    description: "Showcase your coding skills and win exciting prizes!",
    date: "2023-08-05",
    time: "9:00 AM - 9:00 PM",
    location: "Main Hall",
  },
]

export default function EventsPage() {
  return (
    (<div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>)
  );
}

function EventCard({ event }) {
  const [isEnrolled, setIsEnrolled] = useState(false)

  return (
    (<motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>
            {event.date} | {event.time}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{event.description}</p>
          <p className="mt-2 text-sm text-muted-foreground">Location: {event.location}</p>
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
                <Button variant="outline" onClick={() => setIsEnrolled(false)}>
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

