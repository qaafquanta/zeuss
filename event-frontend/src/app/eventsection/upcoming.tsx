"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  name: string;
  imageUrl: string | null;
  startDate: string;
  location: string;
};

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8099/event/events");
        const json = await res.json();
        setEvents(json.data);
      } catch (err) {
        console.error("Error fetching events", err);
      }
    };

    fetchEvents();
  }, []);

  console.log(events);

  return (
    <section className="py-16 px-5 md:px-20 bg-black font-rethink">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-transparent bg-gradient-to-br from-indigo-300 via-indigo-700 to-indigo-900 bg-clip-text">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {events.length > 0 ? (
          events.map((event: Event) => (
            <div
              key={event.id}
              className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full h-48 md:h-56">
                <Image
                  src={event.imageUrl || "/fallback.jpg"}
                  alt={event.name || "Event image"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-3 py-5">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">
                  {event.name}
                </h3>
                <p className="text-gray-400 text-sm mb-1">
                  {new Date(event.startDate).toLocaleDateString()}
                </p>
                <p className="text-gray-400 text-sm mb-3">{event.location}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No events found</p>
        )}
      </div>
    </section>
  );
}
