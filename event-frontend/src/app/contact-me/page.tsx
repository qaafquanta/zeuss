"use client";

import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#071029] flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white/80 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Section */}
        <div className="bg-indigo-600 text-white  flex flex-col justify-center p-10">
          <h1 className="text-3xl font-bold mb-4">Contact Our Office</h1>
          <p className="text-indigo-100 mb-6 leading-relaxed">
            We’d love to hear from you! Whether you have a question, want to
            discuss partnerships, or simply say hello — reach out anytime.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <span>+62 812 3456 7890</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span>contact@zeussevent.com</span>
            </div>

            <div className="flex gap-5 mt-6">
              <a href="#" className="hover:text-blue-400 transition">
                <Facebook />
              </a>
              <a href="#" className="hover:text-pink-400 transition">
                <Instagram />
              </a>
              <a href="#" className="hover:text-sky-400 transition">
                <Twitter />
              </a>
              <a href="#" className="hover:text-blue-300 transition">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10 flex flex-col  justify-center bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Send us a Message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
