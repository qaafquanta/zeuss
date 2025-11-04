"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <main className="relative bg-gradient-to-b from-[#050820] via-[#08163a] to-[#050820] text-white min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[180px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full" />
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto text-center px-6 mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            About <span className="text-indigo-400">Zeuss</span>{" "}
            <span className="text-white/90">Event Organizer</span>
          </motion.h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Since 2015,{" "}
            <span className="text-indigo-400 font-semibold">Zeuss</span> has
            been a trailblazer in Indonesia’s event industry — delivering
            unforgettable experiences through creativity, precision, and
            passion.
          </p>
        </section>

        {/* Journey Section */}
        <section className="max-w-6xl mx-auto mt-10 px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-400 mb-4">
              Our Journey
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Starting as a passionate small team, Zeuss has grown into one of
              Indonesia’s premier event organizers. We’ve executed world-class
              concerts, international summits, cultural festivals, and exclusive
              brand activations.
            </p>
            <p className="text-white/80 leading-relaxed">
              With over{" "}
              <span className="font-semibold text-indigo-400">
                500 successful events
              </span>
              , our mission remains simple — to create moments that leave
              lasting impressions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(99,102,241,0.3)]"
          >
            <Image
              src="/journey.jpg"
              alt="Zeuss Journey"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050820]/80 via-transparent to-transparent" />
          </motion.div>
        </section>

        {/* Events Showcase */}
        <section className="max-w-6xl mx-auto mt-24 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-400 mb-10">
            Events We Have Handled
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { title: "Zeuss Music Fest", img: "/music.jpeg" },
              { title: "Tech Innovate 2024", img: "/tech.jpg" },
              { title: "Cultural Harmony Week", img: "/reog.png" },
            ].map((event, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050820]/90 via-[#050820]/30 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white/90">
                    {event.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto mt-28 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-400 mb-10">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Rina Pratama",
                role: "Marketing Director, Astra Group",
                message:
                  "Zeuss made our product launch unforgettable. Their team was incredibly professional and communicative!",
                img: "/client1.jpg",
              },
              {
                name: "Budi Santoso",
                role: "Founder, TechNow Indonesia",
                message:
                  "Our event ran flawlessly thanks to Zeuss’ coordination. They truly understood what we needed.",
                img: "/client2.jpg",
              },
              {
                name: "Sarah Lestari",
                role: "Event Manager, Festival Nusantara",
                message:
                  "Zeuss is a trusted partner. They bring magic and energy into every event they handle!",
                img: "/client3.jpg",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-indigo-400">
                  <Image
                    src={testimonial.img}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-white/80 italic mb-4">
                  “{testimonial.message}”
                </p>
                <h4 className="font-bold text-white">{testimonial.name}</h4>
                <span className="text-sm text-indigo-300">
                  {testimonial.role}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <div className="max-w-6xl mx-auto px-6 mt-20 text-center text-sm text-white/50">
          © {new Date().getFullYear()}{" "}
          <span className="text-indigo-400">Zeuss Event Organizer</span>. All
          rights reserved.
        </div>
      </main>
    </motion.div>
  );
}
