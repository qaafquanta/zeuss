// export default function BookSeatPage() {
//   const event = {
//     name: "Syncronize",
//     city: "Makasar",
//     price: 200000,
//     capacity: 100,
//     remainingSeats: 100,
//   };

//   return (
//     <div className="p-8 text-white bg-[#0f1629] min-h-screen">
//       <h1 className="text-4xl font-extrabold tracking-wide mb-8">Book Seat</h1>

//       <div className="bg-[#101827] p-8 rounded-2xl border border-white/10 mb-8 shadow-xl/20">
//         <h2 className="text-3xl font-bold mb-2 tracking-wide leading-tight">
//           {event.name}
//         </h2>
//         <p className="text-gray-400 italic mb-4">{event.city}</p>

//         <div className="mt-4 space-y-2">
//           <p className="text-lg font-medium">Price</p>
//           <p className="font-extrabold text-2xl tracking-wide">
//             Rp {event.price.toLocaleString("id-ID")}
//           </p>
//         </div>

//         <div className="mt-6 space-y-2">
//           <p className="text-lg font-medium">Capacity</p>
//           <p className="text-gray-300 font-semibold text-lg">
//             {event.remainingSeats} / {event.capacity} seats available
//           </p>
//         </div>
//       </div>

//       <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition font-semibold text-lg tracking-wide shadow-lg hover:shadow-xl">
//         Continue to Booking
//       </button>

//       {/* Seat Selector */}
//       <div className="mt-10 bg-[#101827] p-6 rounded-2xl border border-white/10 inline-flex items-center gap-6">
//         <span className="text-lg font-medium">Jumlah Seat:</span>
//         <div className="flex items-center gap-4">
//           <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition text-xl font-bold">
//             -
//           </button>
//           <span className="text-2xl font-bold w-8 text-center">1</span>
//           <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition text-xl font-bold">
//             +
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
