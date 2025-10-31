"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

interface EventType {
  id?: string | number;
  organizerId?: string;
  name: string;
  description?: string;
  category?: string;
  location?: string;
  city?: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  price?: string | number;
  availableSeats?: number;
  totalSeats?: number;
  imageUrl?: string;
}

export default function EventList() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // debounce state
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 600);
    return () => clearTimeout(t);
  }, [query]);

  // fetch whenever debounced query / location / category change
  useEffect(() => {
    const controller = new AbortController();
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const q = encodeURIComponent(String(debouncedQuery || ""));
        const loc = encodeURIComponent(String(location || ""));
        const cat = encodeURIComponent(String(category || ""));

        const res = await fetch(
          `http://localhost:8099/event/filter?page=1&limit=30&search=${q}&location=${loc}&category=${cat}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          console.error("Fetch failed", res.status);
          setEvents([]);
          setLoading(false);
          return;
        }

        const json = await res.json();
        setEvents(json?.data ?? []);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Error fetching events:", err.message);
        }
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    return () => controller.abort();
  }, [debouncedQuery, location, category]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <section className="h-screen w-full bg-[#071029] mt-16 relative overflow-hidden py-12">
        {/* LIGHT SPOTS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-32 w-[420px] h-[420px] rounded-full bg-indigo-500/30 blur-[160px]"></div>
          <div className="absolute -bottom-28 -right-32 w-[520px] h-[520px] rounded-full bg-blue-500/25 blur-[180px]"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 container mx-auto px-6">
          {/* HEADER + SEARCH BAR */}
          <div className="flex flex-col items-center text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-white/90">
              Explore the Best Events Around You
            </h1>

            <div className="w-full md:w-[820px] mt-6 flex gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events (title / description)"
                className="flex-1 px-4 py-3 rounded-xl bg-white/6 border border-white/6 placeholder:text-white/40 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-36 px-3 py-3 rounded-xl bg-white/6 border border-white/6 placeholder:text-white/40 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="w-36 px-3 py-3 rounded-xl bg-white/6 border border-white/6 placeholder:text-white/40 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          {/* GRID */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-gradient-to-br from-white/4 to-white/2 p-6 animate-pulse"
                  style={{ minHeight: 220 }}
                />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center text-white/60 mt-20">
              <p className="text-lg">No events found</p>
              <p className="mt-2 text-sm">
                Try different keywords or remove filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, idx) => (
                <article
                  key={event.id ?? idx}
                  className="relative group"
                  style={{ perspective: 1200 }}
                >
                  {/* FULL GLASS CARD */}
                  <div
                    className={`rounded-xl border border-white/10 bg-white/6 backdrop-blur-[18px] shadow-lg p-6 flex flex-col justify-between h-full transform transition-all duration-400`}
                  >
                    {/* PRICE BADGE */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center px-3 py-1 rounded-xl text-sm font-semibold  text-white backdrop-blur">
                        Rp.
                        {event.price ?? "Free"}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="mt-4 mb-4">
                      <h3 className="text-lg md:text-xl font-serif font-semibold text-white/95 mb-1">
                        {event.name}
                      </h3>
                      <p className="text-sm text-white/70 mb-3 line-clamp-3">
                        {event.description ?? "No description"}
                      </p>

                      <div className="flex gap-3 items-center text-sm text-white/75 mb-3">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-white/60"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 2C8 2 5 5 5 9c0 6 7 12 7 12s7-6 7-12c0-4-3-7-7-7z"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{event.location ?? "-"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span>
                            {event.startDate
                              ? new Date(event.startDate).toLocaleDateString()
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <span className="inline-block text-xs text-white/90 bg-white/10 px-3 py-1 rounded-xl backdrop-blur">
                        {event.category ?? "General"}
                      </span>

                      <Link href={`/events/${event.id}`}>
                        <button className="px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-transform">
                          View Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
