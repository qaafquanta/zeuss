// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";

// interface OrganizerType {
//   id: string;
//   username: string;
//   email?: string;
// }

// interface EventType {
//   id?: string | number;
//   organizerId?: string;
//   name: string;
//   description?: string;
//   category?: string;
//   location?: string;
//   city?: string;
//   address?: string;
//   startDate?: string;
//   endDate?: string;
//   price?: string | number;
//   availableSeats?: number;
//   totalSeats?: number;
//   imageUrl?: string;
//   organizer?: OrganizerType;
// }

// export default function EventList() {
//   const [events, setEvents] = useState<EventType[]>([]);
//   const [query, setQuery] = useState("");
//   const [location, setLocation] = useState("");
//   const [category, setCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [debouncedQuery, setDebouncedQuery] = useState(query);

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedQuery(query), 600);
//     return () => clearTimeout(t);
//   }, [query]);

//   useEffect(() => {
//     const controller = new AbortController();
//     const fetchEvents = async () => {
//       setLoading(true);
//       try {
//         const q = encodeURIComponent(String(debouncedQuery || ""));
//         const loc = encodeURIComponent(String(location || ""));
//         const cat = encodeURIComponent(String(category || ""));

//         const res = await fetch(
//           `http://localhost:8099/event/filter?page=1&limit=30&search=${q}&location=${loc}&category=${cat}`,
//           { signal: controller.signal }
//         );

//         if (!res.ok) {
//           console.error("Fetch failed", res.status);
//           setEvents([]);
//           setLoading(false);
//           return;
//         }

//         const json = await res.json();
//         setEvents(json?.data ?? []);
//       } catch (err: unknown) {
//         if (err instanceof Error && err.name !== "AbortError") {
//           console.error("Error fetching events:", err.message);
//         }
//         setEvents([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//     return () => controller.abort();
//   }, [debouncedQuery, location, category]);

//   return (
//     <motion.main
//       className="min-h-screen bg-[#050820] pt-28 pb-20 relative overflow-hidden"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.7 }}
//     >
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/30 blur-[180px] rounded-full -translate-x-1/3 -translate-y-1/3" />
//         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px] rounded-full translate-x-1/3 translate-y-1/3" />
//       </div>

//       {/* Header */}
//       <div className="relative z-10 text-center mb-12 px-6">
//         <motion.h1
//           className="text-4xl md:text-5xl font-bold text-white mb-3"
//           initial={{ y: 40, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           Discover <span className="text-indigo-500">Unforgettable</span> Events
//         </motion.h1>
//         <p className="text-white/60 max-w-2xl mx-auto">
//           Find and experience amazing moments near you — from concerts,
//           workshops, to exclusive meetups.
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="relative z-10 container mx-auto px-6 mb-12">
//         <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="🔍 Search events..."
//             className="flex-1 px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="Location"
//             className="w-full md:w-48 px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             placeholder="Category"
//             className="w-full md:w-48 px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//       </div>

//       {/* Event Cards */}
//       <div className="relative z-10 container mx-auto px-6">
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-white/5 rounded-xl h-80 border border-white/10"
//               />
//             ))}
//           </div>
//         ) : events.length === 0 ? (
//           <div className="text-center text-white/60 py-24">
//             <p className="text-lg">No events found.</p>
//             <p className="text-sm mt-2">
//               Try adjusting your search or filters.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {events.map((event, idx) => (
//               <motion.div
//                 key={event.id ?? idx}
//                 className="relative group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500 backdrop-blur-md"
//                 whileHover={{ scale: 1.03 }}
//               >
//                 {/* Image */}
//                 <div className="relative h-52 w-full overflow-hidden">
//                   <img
//                     src={
//                       event.imageUrl ||
//                       "https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=1200&q=80"
//                     }
//                     alt={event.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#050820]/90 via-[#050820]/40 to-transparent" />
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold text-white mb-1 line-clamp-1">
//                     {event.name}
//                   </h3>

//                   {/* Organizer info */}
//                   <p className="text-sm italic text-indigo-300 mb-3">
//                     Organized by{" "}
//                     <span className="font-semibold">
//                       {event.organizer?.username || "Unknown Organizer"}
//                     </span>
//                   </p>

//                   <p className="text-white/60 text-sm mb-4 line-clamp-2">
//                     {event.description || "No description available."}
//                   </p>

//                   <div className="flex justify-between items-center text-sm text-white/70 mb-4">
//                     <div className="flex items-center gap-2">
//                       <svg
//                         className="w-4 h-4 text-indigo-400"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="1.5"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M12 2C8 2 5 5 5 9c0 6 7 12 7 12s7-6 7-12c0-4-3-7-7-7z"
//                         />
//                       </svg>
//                       <span>{event.location ?? "-"}</span>
//                     </div>
//                     <span className="text-xs text-white/50">
//                       {event.startDate
//                         ? new Date(event.startDate).toLocaleDateString()
//                         : "-"}
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <span className="inline-block text-xs font-medium text-white/90 bg-indigo-500/20 px-3 py-1 rounded-full">
//                       {event.category ?? "General"}
//                     </span>

//                     <Link href={`/events/${event.id}`}>
//                       <button className="px-4 py-2 text-sm rounded-xl font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:scale-[1.03] transition-transform">
//                         View Details
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.main>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface OrganizerType {
  id: string;
  username: string;
  email?: string;
}

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
  organizer?: OrganizerType;
}

export default function EventList() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 600);
    return () => clearTimeout(t);
  }, [query]);

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
        console.log(json);
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
    <motion.main
      className="min-h-screen bg-[#050820] pt-28 pb-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/30 blur-[180px] rounded-full -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px] rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12 px-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Discover <span className="text-indigo-500">Unforgettable</span> Events
        </motion.h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Find and experience amazing moments near you — from concerts,
          workshops, to exclusive meetups.
        </p>
      </div>

      {/* Filters */}
      <div className="relative z-10 container mx-auto px-6 mb-12">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search events..."
            className="flex-1 px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full md:w-48 px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full md:w-48 px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Event Cards */}
      <div className="relative z-10 container mx-auto px-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-xl h-80 border border-white/10"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-white/60 py-24">
            <p className="text-lg">No events found.</p>
            <p className="text-sm mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <motion.div
                key={event.id ?? idx}
                className="relative group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500 backdrop-blur-md"
                whileHover={{ scale: 1.03 }}
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={
                      event.imageUrl ||
                      "https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050820]/90 via-[#050820]/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-1 line-clamp-1">
                    {event.name}
                  </h3>

                  {/* Organizer clickable */}
                  {event.organizer ? (
                    <Link
                      href={`/organizer/${event.organizer.id}`}
                      className="text-sm italic text-indigo-300 hover:text-indigo-400 hover:underline transition-colors mb-3 block"
                    >
                      Organized by{" "}
                      <span className="font-semibold">
                        {event.organizer.username}
                      </span>
                    </Link>
                  ) : (
                    <p className="text-sm italic text-white/40 mb-3">
                      Organizer Unknown
                    </p>
                  )}

                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {event.description || "No description available."}
                  </p>

                  <div className="flex justify-between items-center text-sm text-white/70 mb-4">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 2C8 2 5 5 5 9c0 6 7 12 7 12s7-6 7-12c0-4-3-7-7-7z"
                        />
                      </svg>
                      <span>{event.location ?? "-"}</span>
                    </div>
                    <span className="text-xs text-white/50">
                      {event.startDate
                        ? new Date(event.startDate).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="inline-block text-xs font-medium text-white/90 bg-indigo-500/20 px-3 py-1 rounded-full">
                      {event.category ?? "General"}
                    </span>

                    <Link href={`/events/${event.id}`}>
                      <button className="px-4 py-2 text-sm rounded-xl font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:scale-[1.03] transition-transform">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.main>
  );
}
