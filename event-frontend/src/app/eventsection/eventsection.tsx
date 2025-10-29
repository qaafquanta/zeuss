// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// //import Image from "next/image";

// interface EventType {
//   id?: string;
//   organizerId: string;
//   name: string;
//   description: string;
//   category: string;
//   location: string;
//   city?: string;
//   address?: string;
//   startDate: string;
//   endDate?: string;
//   price: string | number;
//   availableSeats?: number;
//   totalSeats?: number;
//   imageUrl: string;
// }

// export default function EventSection() {
//   const [events, setEvents] = useState<EventType[]>([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch("http://localhost:8099/event/events");
//         console.log(res);
//         const json = await res.json();
//         console.log(`ini console custom2 ${json}`);
//         setEvents(json.data);
//       } catch (error) {
//         console.error("Failed to load events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <section className="p-6 bg-white min-h-screen font-rethink">
//       <h2 className="text-lg font-bold  text-gray-700 mb-4">
//         Menampilkan {events.length} event
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map((event, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
//           >
//             <div className="relative w-full h-52">
//               {
//                 <Image
//                   src={event.imageUrl ? event.imageUrl : "/fallback.jpg"}
//                   alt={event.name}
//                   fill
//                   className="object-cover"
//                 />
//               }
//               <span className="absolute top-3 left-3 bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-2xl">
//                 {event.price}
//               </span>
//             </div>

//             <div className="p-5">
//               <h3 className="text-l text-gray-600 font-serif font-semibold mb-1">
//                 {event.name}
//               </h3>
//               <p className="text-gray-500 text-sm mb-3">{event.description}</p>
//               <p className="text-sm text-gray-600  mb-3">📍 {event.location}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
