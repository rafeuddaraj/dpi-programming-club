import { getAllUpcomingEvent } from "@/app/actions/events";
import { auth } from "@/app/auth";
import EventCard from "./_components/EventCard";

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

export default async function EventsPage() {
  const resp = await getAllUpcomingEvent()
  if (resp?.error) {
    throw Error()
  }

  const events = resp?.data

  const { user } = await auth()


  return (
    (<div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.map((event) => (
          <EventCard key={event.id} event={event} userId={user?.id} />
        ))}
      </div>
    </div>)
  );
}



