"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TransactionPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const { slug } = params;

  const [seatCount, setSeatCount] = useState(1);
  const pricePerSeat = 20000;
  const totalPrice = seatCount * pricePerSeat;

  const handleBooking = async () => {
    try {
      const res = await fetch(
        "http://localhost:8099/transaction/create-transaction",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: slug,
            quantity: seatCount,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        router.push(`/payment/${data?.data?.transactionId}`);
      } else {
        alert(data?.message ?? "Failed to book seat");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Terjadi kesalahan saat memproses booking.");
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0920] text-white mt-16 py-16 px-8">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-2xl font-bold mb-2">Book Seat</h2>
          <p className="text-sm text-white/60 mb-4">Event ID: {slug}</p>

          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setSeatCount((c) => Math.max(1, c - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition text-xl font-bold"
            >
              -
            </button>
            <span className="text-2xl font-bold w-8 text-center">
              {seatCount}
            </span>
            <button
              onClick={() => setSeatCount((c) => c + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition text-xl font-bold"
            >
              +
            </button>
          </div>

          <div className="text-lg font-semibold mb-6">
            Total Harga:{" "}
            <span className="text-indigo-400">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:scale-[1.02] transition"
          >
            Continue to Booking
          </button>
        </div>
      </div>
    </main>
  );
}
