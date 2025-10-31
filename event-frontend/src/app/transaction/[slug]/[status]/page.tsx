// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// interface TransactionPageProps {
//   params: {
//     slug: string;
//     status: string;
//   };
// }

// export default function TransactionPage({ status }: TransactionPageProps) {
//   const router = useRouter();
//   const [quantity, setQuantity] = useState(1);

//   const handleBooking = async () => {
//     try {
//       const res = await fetch("http://localhost:8099/api/transaction", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           eventId: status.slug,
//           quantity,
//           status: status.status,
//         }),
//       });

//       if (res.ok) {
//         alert("Booking berhasil!");
//         router.push("/success");
//       } else {
//         alert("Gagal melakukan booking");
//       }
//     } catch (error) {
//       console.error("Error booking:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 mt-10">
//       <div className="flex items-center gap-4">
//         <button
//           onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//           className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition text-xl font-bold"
//         >
//           -
//         </button>
//         <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
//         <button
//           onClick={() => setQuantity((prev) => prev + 1)}
//           className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition text-xl font-bold"
//         >
//           +
//         </button>
//       </div>

//       <button
//         onClick={handleBooking}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-4"
//       >
//         Continue to Booking
//       </button>
//     </div>
//   );
// }
