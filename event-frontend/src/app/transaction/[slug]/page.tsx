// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function TransactionPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const router = useRouter();
//   const { slug } = params;

//   const [seatCount, setSeatCount] = useState(1);
//   const [voucherCode, setVoucherCode] = useState("");
//   const [points, setPoints] = useState(0);
//   const [voucherDiscount, setVoucherDiscount] = useState(0);
//   const [voucherMessage, setVoucherMessage] = useState("");
//   const [isApplying, setIsApplying] = useState(false);

//   // harga dasar
//   const pricePerSeat = 20000;
//   const baseTotal = seatCount * pricePerSeat;

//   // nilai poin: 1 poin = Rp100
//   const redeemValue = points * 100;

//   // total akhir
//   const finalTotal = Math.max(baseTotal - voucherDiscount - redeemValue, 0);

//   //Input voucher
//   const applyVoucher = async () => {
//     setIsApplying(true);
//     setVoucherMessage("");

//     try {
//       const res = await fetch(
//         `http://localhost:8099/transaction/voucher?code=${voucherCode.toUpperCase()}`,
//         {
//           method: "POST",
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) throw new Error(data?.message || "Voucher tidak valid");

//       setVoucherDiscount(data.voucher.discountAmount);
//       setVoucherMessage(
//         `Voucher diterapkan: potongan Rp ${data.voucher.discountAmount.toLocaleString(
//           "id-ID"
//         )}`
//       );
//     } catch (err: any) {
//       setVoucherDiscount(0);
//       setVoucherMessage(err.message || "Voucher tidak valid");
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   //Handle transaction
//   const handleTransaction = async () => {
//     try {
//       const res = await fetch(
//         "http://localhost:8099/transaction/create-transaction",
//         {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             eventId: slug,
//             quantity: seatCount,
//             voucherCode,
//             points,
//             totalPrice: finalTotal,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (res.ok) {
//         router.push(`/transaction-status/${data?.data?.id}`);
//       } else {
//         alert(data?.message ?? "Failed to book seat");
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       alert("Terjadi kesalahan saat memproses booking.");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#0b0920] text-white mt-16 py-16 px-8">
//       <div className="max-w-xl mx-auto space-y-6">
//         <div className="p-6 rounded-lg bg-white/5 border border-white/10">
//           <h2 className="text-2xl font-bold mb-2">Book Seat</h2>
//           <p className="text-sm text-white/60 mb-4">Event ID: {slug}</p>

//           {/* Seat Counter */}
//           <div className="flex items-center gap-4 mb-6 justify-center">
//             <button
//               onClick={() => setSeatCount((c) => Math.max(1, c - 1))}
//               className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition text-xl font-bold"
//             >
//               -
//             </button>
//             <span className="text-2xl font-bold w-8 text-center">
//               {seatCount}
//             </span>
//             <button
//               onClick={() => setSeatCount((c) => c + 1)}
//               className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition text-xl font-bold"
//             >
//               +
//             </button>
//           </div>

//           {/* Voucher Input */}
//           <div className="mb-3">
//             <label className="block text-sm mb-1 text-white/70">
//               Voucher Code
//             </label>
//             <div className="flex gap-2">
//               <input
//                 value={voucherCode}
//                 onChange={(e) => setVoucherCode(e.target.value)}
//                 placeholder="Input voucher code"
//                 className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//               <button
//                 onClick={applyVoucher}
//                 type="button"
//                 disabled={isApplying}
//                 className={`px-4 rounded-lg transition ${
//                   isApplying
//                     ? "bg-gray-500 cursor-not-allowed"
//                     : "bg-indigo-500 hover:bg-indigo-600"
//                 }`}
//               >
//                 {isApplying ? "..." : "Apply"}
//               </button>
//             </div>
//             {voucherMessage && (
//               <p
//                 className={`text-sm mt-1 ${
//                   voucherDiscount > 0 ? "text-green-400" : "text-red-400"
//                 }`}
//               >
//                 {voucherMessage}
//               </p>
//             )}
//           </div>

//           {/* Point Input */}
//           <div className="mb-6">
//             <label className="block text-sm mb-1 text-white/70">
//               Redeem Point
//             </label>
//             <input
//               type="number"
//               value={points}
//               onChange={(e) =>
//                 setPoints(Math.max(0, parseInt(e.target.value) || 0))
//               }
//               placeholder="Masukkan jumlah poin"
//               className="w-full p-2 rounded-lg bg-white/10 border border-white/20 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           {/* Price Summary */}
//           <div className="space-y-2 text-md mb-6">
//             <p>
//               Price:{" "}
//               <span className="text-indigo-400">
//                 Rp {baseTotal.toLocaleString("id-ID")}
//               </span>
//             </p>
//             {voucherDiscount > 0 && (
//               <p>
//                 Voucher Discount:{" "}
//                 <span className="text-green-400">
//                   - Rp {voucherDiscount.toLocaleString("id-ID")}
//                 </span>
//               </p>
//             )}
//             {points > 0 && (
//               <p>
//                 Redeem Points:{" "}
//                 <span className="text-green-400">
//                   - Rp {redeemValue.toLocaleString("id-ID")}
//                 </span>
//               </p>
//             )}
//             <p className="text-xl font-bold">
//               Total Price:{" "}
//               <span className="text-indigo-400">
//                 Rp {finalTotal.toLocaleString("id-ID")}
//               </span>
//             </p>
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleTransaction}
//             className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:scale-[1.02] transition"
//           >
//             Continue To Payment
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const pricePerSeat = 20000;
  const baseTotal = seatCount * pricePerSeat;
  const redeemValue = points * 100;
  const finalTotal = Math.max(baseTotal - voucherDiscount - redeemValue, 0);

  const applyVoucher = async () => {
    setIsApplying(true);
    setVoucherMessage("");

    try {
      const res = await fetch(
        `http://localhost:8099/transaction/voucher?code=${voucherCode.toUpperCase()}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Voucher tidak valid");
      setVoucherDiscount(data.voucher.discountAmount);
      setVoucherMessage(
        `Voucher diterapkan: potongan Rp ${data.voucher.discountAmount.toLocaleString(
          "id-ID"
        )}`
      );
    } catch (err: any) {
      setVoucherDiscount(0);
      setVoucherMessage(err.message || "Voucher tidak valid");
    } finally {
      setIsApplying(false);
    }
  };

  const handleTransaction = async () => {
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
        router.push(`/transaction-status/${data?.data?.id}`);
      } else {
        alert(data?.message ?? "Failed to book seat");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Terjadi kesalahan saat memproses booking.");
    }
  };

  return (
    <main className="min-h-screen relative bg-gradient-to-b from-[#0b0920] via-[#100b30] to-[#0b0920] text-white mt-16 py-16 px-6 overflow-hidden">
      {/* Background efek */}
      <div className="absolute inset-0 bg-[url('/particles.svg')] bg-cover opacity-10 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
          Book Your Seat
        </h2>
        <p className="text-center text-sm text-white/60 mb-8">
          Event ID: {slug}
        </p>

        {/* Seat Counter */}
        <div className="flex items-center justify-center gap-5 mb-8">
          <button
            onClick={() => setSeatCount((c) => Math.max(1, c - 1))}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-indigo-600/30 transition text-xl font-bold"
          >
            −
          </button>
          <span className="text-3xl font-bold w-10 text-center">
            {seatCount}
          </span>
          <button
            onClick={() => setSeatCount((c) => c + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-indigo-600/30 transition text-xl font-bold"
          >
            +
          </button>
        </div>

        {/* Voucher Input */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-white/70">
            Voucher Code
          </label>
          <div className="flex gap-2">
            <input
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              placeholder="Input Voucher Code"
              className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={applyVoucher}
              type="button"
              disabled={isApplying}
              className={`px-5 rounded-xl font-semibold transition ${
                isApplying
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:scale-[1.02]"
              }`}
            >
              {isApplying ? "..." : "Apply"}
            </button>
          </div>
          {voucherMessage && (
            <p
              className={`text-sm mt-2 ${
                voucherDiscount > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {voucherMessage}
            </p>
          )}
        </div>

        {/* Redeem Point */}
        <div className="mb-8">
          <label className="block text-sm mb-2 text-white/70">
            Redeem Point
          </label>
          <input
            type="number"
            value={points}
            onChange={(e) =>
              setPoints(Math.max(0, parseInt(e.target.value) || 0))
            }
            placeholder="Masukkan jumlah poin"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Price Summary */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8 space-y-2 text-md">
          <p>
            Price:{" "}
            <span className="text-indigo-400">
              Rp {baseTotal.toLocaleString("id-ID")}
            </span>
          </p>
          {voucherDiscount > 0 && (
            <p>
              Voucher Discount:{" "}
              <span className="text-green-400">
                - Rp {voucherDiscount.toLocaleString("id-ID")}
              </span>
            </p>
          )}
          {points > 0 && (
            <p>
              Redeem Points:{" "}
              <span className="text-green-400">
                - Rp {redeemValue.toLocaleString("id-ID")}
              </span>
            </p>
          )}
          <hr className="border-white/10 my-3" />
          <p className="text-xl font-bold">
            Total Price:{" "}
            <span className="text-indigo-400">
              Rp {finalTotal.toLocaleString("id-ID")}
            </span>
          </p>
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.03 }}
          onClick={handleTransaction}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold px-6 py-4 rounded-xl shadow-lg shadow-indigo-500/30 transition"
        >
          Continue To Payment
        </motion.button>
      </motion.div>
    </main>
  );
}
