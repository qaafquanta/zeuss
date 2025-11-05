"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact-me" },
    { name: "Log in", href: "/login" },
  ];

  interface User {
    username: string;
    email: string;
    role: string;
    profilePicture?: string;
    referralNumber: string;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:8099/auth/me", {
          credentials: "include", // biar dapet cookie
        });
        // if (!res.ok) throw new Error("Not logged in");

        const data = await res.json();
        console.log(data);
        setUser(data.user);
      } catch (err) {
        setUser(null); // token tidak valid atau belum login
      }
    };

    checkLogin();
  }, []);

  

  return (
    <nav className="font-rethink fixed top-0 left-0 w-full z-50 bg-gray-900 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-500">
          Zeuss<span className="text-gray-800"></span>
        </Link>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-indigo-500 underline-animate font-bold transition"
            >
              {link.name}
            </Link>
          ))}
          {
          user ? user.role === "ORGANIZER" && (
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-indigo-500 underline-animate font-bold transition"
            >
              Dashboard
            </Link>
          )
          :<p></p>
        }
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
        {
          user ? 
          (<Link href="/profile" className="flex gap-5 justify-center items-center">
            <span className="bg-white/10 opacity-90 rounded-full text-xs justify-center items-center py-1 px-3">{user.role}</span>
            <span className="hover:underline hover:text-white font-bold text-white/80">{user.username}</span>
            <Image src={user.profilePicture?user.profilePicture:"/photoprofile.png"} alt="pp" height={40} width={40} className="circle-border-animate object-cover rounded-full border-[0.5px] border-white/10 hover:border-indigo-600 hover:border-1 transition"/>
          </Link>
        ) : (
          <p></p>
        )}
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-6 py-3 text-gray-700 "
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
