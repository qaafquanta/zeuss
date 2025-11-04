"use client";

import Image from "next/image";
import React, { useState,useEffect } from "react";

export default function ConfirmPayment() {

const [proofs,setProofs] = useState([])

const fetchProof = async () => {
      try {
        const res = await fetch("http://localhost:8099/transaction/proof", {
          credentials: "include", // biar dapet cookie
        });
        let proofx=[]
        const json = await res.json();
        console.log(json)
        for (let i of json.data){
          proofx = proofx.concat(i.transactions)
        }
        let proofz = []
        for (let i in proofx){
          const temp = proofx[i]
          if (proofx[i].status=="WAITING_CONFIRMATION"){
            proofz.unshift(temp)
          }else{
            proofz.push(temp)
          }
        }
        setProofs(proofz);
      } catch (err) {
        setProofs([]); // token tidak valid atau belum login
      }
    };

useEffect(() => {
    fetchProof();
    console.log(proofs)
  }, []);

  const handleAccept = async()=>{
    try {
        const res = await fetch("http://localhost:8099/transaction/accept",{
          method:"POST",
          headers:{"content-type":"application/json"},
          body:JSON.stringify({
            transactionId:selectedProof?.id
          })
        });
        const data=await res.json()
        alert(data.message||"Success Accepting Payment")
        fetchProof()
      } catch (err) {
        // alert("Failed to Accept Payment")
        console.error(err)
      }
  }

  const handleReject = async()=>{
    try {
        const res = await fetch("http://localhost:8099/transaction/reject",{
          method:"POST",
          headers:{"content-type":"application/json"},
          body:JSON.stringify({
            transactionId:selectedProof?.id
          })
        });
        const data = await res.json()
        alert(data.message||"Success Rejecting Payment")
        fetchProof()
      } catch (err) {
        alert("Failed to Reject Payment")
      }
  }

  const [selectedProof, setSelectedProof] = useState(null);

  const openModal = (proof) => {
    setSelectedProof(proof);
  };

  const closeModal = () => {
    setSelectedProof(null);
  };
  return (
    <section className="h-fit w-full  gap-0 flex flex-col justify-start items-center border border-white/10 rounded-lg overflow-hidden m-3 mt-19">
        <div className="w-full h-12 grid grid-cols-5 font-bold text-white bg-gradient-to-r from-indigo-700/25 to-indigo-600/10 border-b border-white/10">
            <div className=" flex justify-center items-center backdrop-blur-lg shadow-2xl ">Payment Proof</div>
            <div className=" flex justify-center items-center backdrop-blur-lg shadow-2xl ">Username</div>
            <div className=" flex justify-center items-center backdrop-blur-lg  shadow-2xl ">Event</div>
            <div className=" flex justify-center items-center backdrop-blur-lg  shadow-2xl ">Time</div>
            <div className=" flex justify-center items-center backdrop-blur-lg  shadow-2xl ">Status</div>
        </div>
    {
        (!proofs) ?<div>gaada proofnya</div>:
        proofs.map((proof,index)=>{
            return (
                <div key={index} onClick={() => openModal(proof)} className={`${proof?.status=="WAITING_CONFIRMATION"?"opacity-100":"opacity-40"} transition hover:bg-white/5 hover:cursor-pointer text-sm w-full h-12 grid grid-cols-5 bg-gradient-to-r from-white/2 to-white/1 text-white backdrop-blur-lg shadow-xl`}>
                     <div className=" flex justify-center items-center">
                        <button className="hover:cursor-pointer rounded-sm px-4 py-1 bg-gray-900 hover:bg-gray-800 flex justify-center items-center backdrop-blur-lg border border-gray-700 hover:border-gray-600 shadow-lg text-xs text-white/80 transition">View Payment Proof</button>
                     </div>
                    <div className=" flex justify-start px-5 items-center">{proof?.user.username}</div>
                    <div className="flex justify-start px-5 items-center">{proof?.event.name}</div>
                    <div className="flex justify-start px-5 items-center">{proof?.createdAt}</div>
                    <div className=" flex gap-5  justify-center items-center">
                    {
                      proof?.status == "DONE" ?
                        <div className="rounded-full px-4 py-1 bg-white/10 flex justify-center items-center  text-xs text-green-500 transition">DONE</div>
                      :proof?.status == "REJECTED" || proof?.status == "CANCELED" || proof?.status == "EXPIRED" ?
                        <div className="rounded-full px-4 py-1 bg-white/10 flex justify-center items-center text-xs text-red-500 transition">{proof?.status}</div>
                      :
                        <div className="rounded-full px-4 py-1 bg-white/10 flex justify-center items-center  text-xs text-white transition">{proof?.status}</div>
                    }
                    </div>
                </div>
            )
        })
    }
    {selectedProof && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition">
          <div className="bg-gray-900 rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-700/25 to-indigo-600/10 border-b border-white/10 text-white p-6 flex justify-between items-center rounded-t-lg">
              <div className="flex items-center gap-3">

              </div>
              <button
                onClick={closeModal}
                className="hover:bg-indigo-700 hover:cursor-pointer rounded-full h-10 w-10 flex justify-center items-center p-2 transition-colors"
              >
                <p className="text-2xl font-semibold">x</p>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex p-6 space-x-10">
              <Image src={selectedProof?.paymentProof} height={500} width={500} alt="ini gambar" className="object-cover rounded-lg" />
              <div className="flex flex-col gap-2 text-sm justify-center">
                <p className="text-white/50">Username: <span className="text-white">{selectedProof?.user.username}</span></p>
                <p className="text-white/50">Event: <span className="text-white">{selectedProof?.event.name}</span></p>
                <p className="text-white/50">Total Amount: <span className="text-white">{selectedProof?.totalAmount}</span></p>
                <p className="text-white/50">Transaction Created At: <span className="text-white">{selectedProof?.createdAt}</span></p>
                <p className="text-white/50">Transaction Expires At: <span className="text-white">{selectedProof?.expiresAt}</span></p>
                <p className="text-white/50">Transaction Status: <span className="text-white">{selectedProof?.status}</span></p>
                <div className=" flex gap-5 p-5 justify-center items-center">
                  <button onClick={handleAccept} className="w-25 h-10 hover:cursor-pointer rounded-sm px-4 py-1 bg-gradient-to-r from-green-900/90 to-green-800/70 hover:bg-green-800 flex justify-center items-center backdrop-blur-lg border border-green-700/70 hover:border-green-600 shadow-lg text-md  text-white transition">Accept</button>
                  <button onClick={handleReject} className="w-25 h-10 hover:cursor-pointer rounded-sm px-4 py-1 bg-gradient-to-r from-red-900/90 to-red-800/70 hover:bg-red-800 flex justify-center items-center backdrop-blur-lg border border-red-700/70 hover:border-red-600 shadow-lg text-md text-white transition">Reject</button>
                </div>
              </div>
              
          </div>
        </div>
      </div>
      )}
    </section>
  );
}
