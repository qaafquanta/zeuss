"use client";

import React, { useState } from "react";

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
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:8099/event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          availableSeats: parseInt(formData.totalSeats),
          totalSeats: parseInt(formData.totalSeats),
          price: parseInt(formData.price),
        }),
      });

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
        imageUrl: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to Create New Event");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-gray-200 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-4xl text-gray-800"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">
          Create New Event
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <input
            name="organizerId"
            placeholder="Organizer ID"
            value={formData.organizerId}
            onChange={handleChange}
            className="input-style"
          />
          <input
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
            className="input-style"
          />
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="input-style"
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="input-style"
          />
          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="input-style"
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="input-style"
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="input-style"
          />
          <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={formData.startDate}
            onChange={handleChange}
            className="input-style"
          />
          <input
            type="date"
            name="endDate"
            placeholder="End Date"
            value={formData.endDate}
            onChange={handleChange}
            className="input-style"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="input-style"
          />
          <input
            type="number"
            name="totalSeats"
            placeholder="Total Seat"
            value={formData.totalSeats}
            onChange={handleChange}
            className="input-style"
          />
          <input
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input-style"
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-blue-600 transition-all duration-300"
        >
          Submit Event
        </button>
      </form>

      {/* Tailwind Inline Styles */}
      <style jsx>{`
        .input-style {
          @apply w-full p-3 rounded-xl border border-white/40 bg-white/30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/60 transition-all duration-200;
        }
      `}</style>
    </main>
  );
}
