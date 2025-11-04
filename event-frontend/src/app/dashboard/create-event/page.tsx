"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function EventForm() {
  const [formData, setFormData] = useState({
    organizerId: "",
    name: "",
    description: "",
    category: "",
    location: "",
    city: "",
    address: "",
    startDate: "",
    endDate: "",
    price: "",
    totalSeats: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    form.append("availableSeats", formData.totalSeats);
    if (imageFile) form.append("imageUrl", imageFile);

    try {
      const res = await fetch("http://localhost:8099/event/create", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("Upload gagal");

      alert("Create New Event Successfully");
      setFormData({
        organizerId: "",
        name: "",
        description: "",
        category: "",
        location: "",
        city: "",
        address: "",
        startDate: "",
        endDate: "",
        price: "",
        totalSeats: "",
      });
      setImageFile(null);
      setPreview("");
    } catch (error) {
      console.error(error);
      alert("Failed to Create New Event");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-700 via-slate-900 to-black flex justify-center items-center p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-5xl text-gray-100"
      >
        <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-lg">
          Create New Event
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "organizerId",
            "name",
            "description",
            "category",
            "location",
            "city",
            "address",
          ].map((field) => (
            <div key={field}>
              <label className="text-sm font-semibold text-gray-300 capitalize tracking-wide">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                placeholder={field}
                className="input-style mt-1"
              />
            </div>
          ))}

          <div>
            <label className="text-sm font-semibold text-gray-300">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input-style mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-300">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="input-style mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-300">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ticket Price"
              className="input-style mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-300">
              Total Seats
            </label>
            <input
              type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              placeholder="Total Seats"
              className="input-style mt-1"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-300">
              Event Image
            </label>
            <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-indigo-400/60 rounded-2xl p-6 hover:border-indigo-300 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/80 file:text-white hover:file:bg-indigo-600/80 cursor-pointer"
              />
              {preview && (
                <motion.img
                  src={preview}
                  alt="Preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 w-full md:w-1/2 h-56 object-cover rounded-xl shadow-lg border border-white/20"
                />
              )}
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 w-full py-4 rounded-2xl bg-indigo-600  text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/40 transition-all duration-300"
        >
          Submit Event
        </motion.button>
      </motion.form>

      <style jsx>{`
        .input-style {
          @apply w-full p-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 transition-all duration-200;
        }
      `}</style>
    </main>
  );
}
