"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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

  const handleLogout = async () => {
    const res = await fetch("http://localhost:8099/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = res.json();
    console.log(data);
    if (res.ok) {
      setUser(null);
      alert("berhasil logout");
    }
  };

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
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
        {user ? (
          <div className="flex gap-5">
            <span>{user.username}</span>
            <button onClick={handleLogout} className="hover:bg-white/20">
              Logout
            </button>
          </div>
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
              className="block px-6 py-3 text-gray-700 hover:text-indigo-600 underline-animate transition"
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
