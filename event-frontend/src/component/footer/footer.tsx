import Link from "next/link";

export default function Footer() {
  return (
    <footer className="font-rethink bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-indigo-500 mb-3">
            Zeuss<span className="text-white"></span>
          </h2>
          <p className="text-sm leading-relaxed">
            We are a full-service event organizer helping brands and individuals
            craft unforgettable experiences — from corporate events to private
            celebrations.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="hover:text-indigo-400 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="hover:text-indigo-400 transition"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-indigo-400  transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-indigo-400 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>
          <ul className="space-y-2  text-sm">
            <li>📍 Bandung, Indonesia</li>
            <li>📞 +62 812 3456 7890</li>
            <li>✉️ zeus@mail.com</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold  text-white mb-3">
            Stay Updated
          </h3>
          <p className="text-sm  mb-3">
            Join our newsletter for event updates & special offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-lg text-white w-full outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-500  text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center  text-sm text-gray-500">
        © {new Date().getFullYear()} Zeuss. All rights reserved.
      </div>
    </footer>
  );
}
