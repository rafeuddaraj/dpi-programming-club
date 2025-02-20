"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

// Mock data for events (in a real app, this would come from an API or database)
const events = [
  {
    id: "1",
    title: "Web Development Workshop",
    description:
      "Learn the latest web development technologies and best practices.",
    date: "2023-07-15",
    time: "10:00 AM - 2:00 PM",
    location: "Computer Lab 1",
    organizer: "Jane Doe",
    agenda: [
      "Introduction to HTML5 and CSS3",
      "JavaScript fundamentals",
      "Building responsive layouts",
      "Introduction to React",
    ],
  },
  // Add more events as needed
];

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params.id;

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{event.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{event.description}</p>
            <h3 className="text-xl font-semibold mb-2">Agenda</h3>
            <ul className="list-disc list-inside mb-4">
              {event.agenda.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="mb-4">Organized by: {event.organizer}</p>
            <Button>Register for Event</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
