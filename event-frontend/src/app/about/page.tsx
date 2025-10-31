"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <main className="bg-[#071029] text-gray-800 min-h-screen pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-4 font-serif">
            About <span className="text-white/90">Zeuss Event Organizer</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-serif leading-relaxed">
            Zeuss Event Organizer has been a pioneer in the event management
            industry in Indonesia since 2015. We deliver exceptional experiences
            through meticulous planning, high creativity, and full dedication to
            every event we handle.
          </p>
        </section>

        {/* Journey Section */}
        <section className="max-w-6xl mx-auto mt-16 px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-indigo-700 mb-4">
              Our Journey
            </h2>
            <p className="text-white/90 font-serif leading-relaxed mb-4">
              Starting as a small, passionate team, Zeuss has now become one of
              Indonesia`s leading event organizers. We have handled various
              large-scale events, from music concerts and international seminars
              to cultural festivals and high-profile product launches.
            </p>
            <p className="text-white/90 font-serif leading-relaxed">
              With More Than{" "}
              <span className="font-semibold font-serif">
                500 successful events
              </span>
              , We are committed to continuously creating memorable and unique
              moments for each of our clients.
            </p>
          </div>
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/journey.jpg"
              alt="Zeuss Journey"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Events Showcase */}
        <section className="max-w-6xl mx-auto mt-20 px-6 text-center">
          <h2 className="text-3xl font-bold font-serif text-indigo-700 mb-6">
            Events We Have Handled
          </h2>
          <div className="grid sm:grid-cols-2 font-serif md:grid-cols-3 gap-8">
            {[
              { title: "Zeuss Music Fest", img: "/music.jpeg" },
              { title: "Tech Innovate 2024", img: "/tech.jpg" },
              { title: "Cultural Harmony Week", img: "/reog.png" },
            ].map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {event.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto mt-24 px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-10">
            Apa Kata Klien Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rina Pratama",
                role: "Marketing Director, Astra Group",
                message:
                  "Zeuss made our product launch event truly memorable. The team was professional and very communicative!",
                img: "/client1.jpg",
              },
              {
                name: "Budi Santoso",
                role: "Founder, TechNow Indonesia",
                message:
                  "Our event ran flawlessly thanks to the excellent coordination of the Zeuss team. They truly understood the client's needs.",
                img: "/client2.jpg",
              },
              {
                name: "Sarah Lestari",
                role: "Event Manager, Festival Nusantara",
                message:
                  "Zeuss is a reliable partner. They know how to create a magical atmosphere at every event!",
                img: "/client3.jpg",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                  <Image
                    src={testimonial.img}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-600 italic mb-3">
                  “{testimonial.message}”
                </p>
                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                <span className="text-sm text-gray-500">
                  {testimonial.role}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Small footer note to ensure document ends cleanly */}
        <div className="max-w-6xl mx-auto px-6 mt-12 text-center underline text-sm text-gray-500">
          © {new Date().getFullYear()} Zeuss Event Organizer. All rights
          reserved.
        </div>
      </main>
    </motion.div>
  );
}
