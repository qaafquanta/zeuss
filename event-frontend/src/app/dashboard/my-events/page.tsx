"use client";

import Image from "next/image";
import React, { useState,useEffect } from "react";

export default function ConfirmPayment() {

const [events,setEvents] = useState([])

const fetchEvent = async () => {
      try {
        const res = await fetch("http://localhost:8099/event/organizer-cookie", {
          credentials: "include", // biar dapet cookie
        });
        const json = await res.json();
        console.log(json)
        
        setEvents(json.events);
        console.log(events)
      } catch (err) {
        setEvents([]); // token tidak valid atau belum login
      }
    };

useEffect(() => {
    fetchEvent();
  }, []);
  

  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };
  return (
    <section className="h-fit w-full  gap-0 flex flex-col justify-start items-center border border-white/10 rounded-lg overflow-hidden m-3 mt-19">
        <div className="w-full h-12 grid grid-cols-5 font-bold text-white bg-gradient-to-r from-indigo-700/25 to-indigo-600/10 border-b border-white/10">
            <div className=" flex justify-center items-center backdrop-blur-lg shadow-2xl ">Event</div>
            <div className=" flex justify-center items-center backdrop-blur-lg shadow-2xl ">Total Seats</div>
            <div className=" flex justify-center items-center backdrop-blur-lg  shadow-2xl ">Avaiable Seats</div>
            <div className=" flex justify-center items-center backdrop-blur-lg  shadow-2xl ">Category</div>
            <div className=" flex justify-center items-center backdrop-blur-lg  shadow-2xl ">Description</div>
        </div>
    {
        (!events) ?<div>gaada proofnya</div>:
        events.map((event,index)=>{
            return (
                <div key={index} onClick={() => openModal(event)} className={` transition hover:bg-white/5 hover:cursor-pointer text-sm w-full h-12 grid grid-cols-5 bg-gradient-to-r from-white/2 to-white/1 text-white backdrop-blur-lg shadow-xl`}>
                    <div className=" flex justify-start px-5 items-center">{event?.name}</div>
                    <div className=" flex justify-start px-5 items-center">{event?.totalSeats}</div>
                    <div className="flex justify-start px-5 items-center">{event?.availableSeats}</div>
                    <div className="flex justify-start px-5 items-center">{event?.category}</div>
                    <div className=" flex justify-start px-5 items-center">desc</div>                   
                </div>
            )
        })
    }
    
    </section>
  );
}
