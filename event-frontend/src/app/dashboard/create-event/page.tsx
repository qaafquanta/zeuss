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
    form.append("organizerId", formData.organizerId);
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("category", formData.category);
    form.append("location", formData.location);
    form.append("city", formData.city);
    form.append("address", formData.address);
    form.append("startDate", formData.startDate);
    form.append("endDate", formData.endDate);
    form.append("price", formData.price);
    form.append("availableSeats", formData.totalSeats);
    form.append("totalSeats", formData.totalSeats);

    if (imageFile) {
      form.append("imageUrl", imageFile);
    }

    try {
      const res = await fetch("http://localhost:8099/event/create", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Upload gagal");

      alert("Create New Event Successfully");

      // reset form
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
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-gray-200 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-4xl text-gray-800"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">
          Create New Event
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* === Upload File === */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-style"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-full h-48 object-cover rounded-xl border border-white/30"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-blue-600 transition-all duration-300"
        >
          Submit Event
        </button>
      </form>

      <style jsx>{`
        .input-style {
          @apply w-full p-3 rounded-xl border border-white/40 bg-white/30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/60 transition-all duration-200;
        }
      `}</style>
    </main>
  );
}
