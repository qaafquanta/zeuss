"use client";

import React, { useState } from "react";

export default function ConfirmPayment() {
const paymentToConfirms = [
    {username: "queen", eventName:"Tenxi Fest",createdAt: new Date()},
    {username: "qaaf",eventName:"MPL ID Playoff",createdAt: new Date()},
    {username: "quency",eventName:"MPL PH Regular Season",createdAt: new Date()},
]
  return (
    <section className="h-fit w-full  gap-0 flex flex-col justify-start items-center border border-white/10 rounded-lg overflow-hidden m-3 mt-19">
        <div className="w-full h-12 grid grid-cols-5 font-bold text-white bg-gradient-to-r from-indigo-700/25 to-indigo-600/10 border-b border-white/10">
            <div className=" flex justify-center items-center backdrop-blur-lg shadow-2xl ">Payment Proof</div>
            <div className=" flex justify-center items-center backdrop-blur-lg shadow-2xl ">Username</div>
            <div className=" flex justify-center items-center backdrop-blur-lg  shadow-2xl ">Event</div>
            <div className=" flex justify-center items-center backdrop-blur-lg  shadow-2xl ">Time</div>
            <div className=" flex justify-center items-center backdrop-blur-lg  shadow-2xl ">Yay or Nay</div>
        </div>
    {
        paymentToConfirms.map((paymentToConfirm,index)=>{
            return (
                <div key={index}className="text-sm w-full h-12 grid grid-cols-5 bg-gradient-to-r from-white/2 to-white/1 text-white backdrop-blur-lg shadow-xl">
                     <div className=" flex justify-center items-center">
                        <button className="hover:cursor-pointer rounded-sm px-4 py-1 bg-gray-900 hover:bg-gray-800 flex justify-center items-center backdrop-blur-lg border border-gray-700 hover:border-gray-600 shadow-lg text-xs text-white/80 transition">View Payment Proof</button>
                     </div>
                    <div className=" flex justify-start px-5 items-center">{paymentToConfirm.username}</div>
                    <div className="flex justify-start px-5 items-center">{paymentToConfirm.eventName}</div>
                    <div className="flex justify-start px-5 items-center">31/10/2025 16:55</div>
                    <div className=" flex gap-5  justify-center items-center">
                        <button className="hover:cursor-pointer rounded-sm px-4 py-1 bg-gradient-to-r from-green-900/90 to-green-800/70 hover:bg-green-800 flex justify-center items-center backdrop-blur-lg border border-green-700/70 hover:border-green-600 shadow-lg text-xs text-white transition">Accept</button>
                        <button className="hover:cursor-pointer rounded-sm px-4 py-1 bg-gradient-to-r from-red-900/90 to-red-800/70 hover:bg-red-800 flex justify-center items-center backdrop-blur-lg border border-red-700/70 hover:border-red-600 shadow-lg text-xs text-white transition">Reject</button>
                       </div>
                </div>
            )
        })
    }
      
    </section>
  );
}
