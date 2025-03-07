import { getAllUpcomingEvent } from "@/app/actions/events";
import EventCard from "./_components/EventCard";

export default async function EventsPage() {
  const resp = await getAllUpcomingEvent()
  if (resp?.error) {
    throw Error()
  }

  const events = resp?.data



  return (
    (<div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>)
  );
}



