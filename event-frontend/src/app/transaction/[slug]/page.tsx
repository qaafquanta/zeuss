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
  const [voucherCode, setVoucherCode] = useState("");
  const [points, setPoints] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const pricePerSeat = 20000;
  const baseTotal = seatCount * pricePerSeat;
  const finalTotal = Math.max(baseTotal - discountAmount, 0);

  const applyDiscount = () => {
    let discount = 0;

    // contoh logika sederhana
    if (voucherCode.toUpperCase() === "DISKON10") {
      discount += baseTotal * 0.1; // 10%
    }

    if (points > 0) {
      discount += points * 100; // 1 poin = Rp100
    }

    setDiscountAmount(discount);
  };

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
            voucherCode,
            points,
            totalPrice: finalTotal,
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

          {/* Seat Counter */}
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

          {/* Voucher Input */}
          <div className="mb-3">
            <label className="block text-sm mb-1 text-white/70">
              Voucher Code
            </label>
            <div className="flex gap-2">
              <input
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Masukkan kode voucher"
                className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={applyDiscount}
                type="button"
                className="px-4 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Point Input */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-white/70">
              Gunakan Poin
            </label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
              placeholder="Masukkan jumlah poin"
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Price Summary */}
          <div className="text-lg font-semibold mb-2">
            Total Harga Awal:{" "}
            <span className="text-indigo-400">
              Rp {baseTotal.toLocaleString("id-ID")}
            </span>
          </div>

          {discountAmount > 0 && (
            <div className="text-md text-green-400 mb-2">
              Diskon: -Rp {discountAmount.toLocaleString("id-ID")}
            </div>
          )}

          <div className="text-xl font-bold mb-6">
            Total Bayar:{" "}
            <span className="text-indigo-400">
              Rp {finalTotal.toLocaleString("id-ID")}
            </span>
          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:scale-[1.02] transition"
          >
            Continue To Payment
          </button>
        </div>
      </div>
    </main>
  );
}
