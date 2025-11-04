"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Event {
  id: string;
  name: string;
  startDate: string;
  imageUrl: string;
  description: string;
}

export default function OrganizerPage() {
  const { slug } = useParams(); // slug = organizerId
  const [events, setEvents] = useState<Event[]>([]);
  const [organizer, setOrganizer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchOrganizerEvents = async () => {
      try {
        const res = await fetch(
          `http://localhost:8099/event/organizer/${slug}`
        );
        if (!res.ok) throw new Error("Failed to fetch organizer data");

        const data = await res.json();
        setOrganizer(data.organizer);
        setEvents(data.events || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizerEvents();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        Loading organizer data...
      </div>
    );
  }

  if (!organizer) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        Organizer not found.
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen text-white py-16 px-8 font-rethink">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-500 mb-3">
          {organizer.username}
        </h1>
        <p className="text-white/70">{organizer.email}</p>
        <p className="mt-4 text-sm text-white/60 max-w-xl mx-auto">
          Organizer of unforgettable experiences — here are the events they’ve
          created!
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white/10 border border-white/20 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform"
            >
              <div className="relative w-full h-56">
                {/* Gunakan <img> agar tidak butuh next/image setup */}
                <img
                  src={event.imageUrl || "/default-event.jpg"}
                  alt={event.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-indigo-400 mb-2">
                  {event.name}
                </h2>
                <p className="text-sm text-white/70 mb-3 line-clamp-2">
                  {event.description || "No description provided."}
                </p>
                <p className="text-xs text-white/50">
                  {new Date(event.startDate).toLocaleDateString()}
                </p>
                <Link
                  href={`/events/${event.id}`}
                  className="inline-block mt-3 text-indigo-400 hover:underline text-sm"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-white/60">
            This organizer hasn’t created any events yet.
          </p>
        )}
      </section>
    </main>
  );
}
