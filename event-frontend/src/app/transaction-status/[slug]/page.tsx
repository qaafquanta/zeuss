"use client";
import React, { useState, useEffect } from "react";

export default function TransactionStatus({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const [transactionData, setTransactionData] = useState({
    id: "",
    userId: "",
    eventId: "",
    status: "WAITING_PAYMENT",
    totalAmount: 0,
    pointUsed: 0,
    discountAmount: 0,
    finalAmount: 0,
    paymentProof: "",
    voucherId: "",
    couponId: "",
    expiresAt: "",
    createdAt: "",
    updateAt: "",
  });

  const handleRefresh = async () => {
    try {
      const res = await fetch(`http://localhost:8099/transaction/${slug}`);
      const tData = await res.json();
      setTransactionData(tData?.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Silakan pilih file terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("paymentProof", file);
    formData.append("transactionId", slug);

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8099/transaction/upload-payment",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Gagal upload bukti pembayaran");
      alert("Bukti pembayaran berhasil diunggah!");
      setFile(null);
      setPreview(null);
      handleRefresh();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat upload!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0b0920] via-[#141132] to-[#1b1842] text-white flex flex-col justify-center items-center px-6 py-16">
      <div className="max-w-lg w-full bg-white/5 p-10 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-md text-center space-y-8 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
          Transaction Status
        </h1>

        {transactionData?.status === "WAITING_PAYMENT" ? (
          <div className="space-y-6">
            <p className="text-white/70 text-lg">
              Upload your proof of payment below
            </p>

            {/* Upload Box */}
            <div className="border-2 border-dashed border-indigo-400/40 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
              />

              {preview && (
                <div className="mt-4">
                  <p className="text-sm text-white/60 mb-2">Preview:</p>
                  <img
                    src={preview}
                    alt="Bukti Pembayaran"
                    className="rounded-xl border border-white/20 max-h-64 mx-auto shadow-lg"
                  />
                </div>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white text-lg transition-all duration-300 
                ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:scale-[1.03] hover:shadow-lg"
                }`}
            >
              {loading ? "Mengunggah..." : "Upload Proof of Payment"}
            </button>
          </div>
        ) : transactionData?.status === "WAITING_CONFIRMATION" ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-14 h-14 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-indigo-300 font-medium">
              PAYMENT PROOF SUBMITTED
            </p>
            <p className="text-sm text-white/60">
              Waiting for admin confirmation...
            </p>
          </div>
        ) : transactionData?.status === "DONE" ? (
          <div className="flex flex-col gap-5 justify-center items-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold text-green-400">
              PAYMENT APPROVED
            </p>
            <p className="text-white/60 text-sm">Transaction Complete </p>
            <a
              href={`/ticket/${slug}`}
              className="mt-3 inline-block bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold text-md px-6 py-3 rounded-xl hover:scale-[1.05] hover:shadow-lg transition-all"
            >
              GET YOUR TICKET
            </a>
          </div>
        ) : transactionData?.status === "REJECTED" ? (
          <div className="flex flex-col items-center gap-3 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-red-400 uppercase">
              PAYMENT PROOF REJECTED
            </p>
            <p className="text-sm text-white/50">
              Please re-upload or contact support.
            </p>
          </div>
        ) : transactionData?.status === "EXPIRED" ? (
          <div className="flex flex-col items-center gap-2 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-orange-400 uppercase">
              TRANSACTION EXPIRED
            </p>
            <p className="text-sm text-white/50">
              Your payment time has run out.
            </p>
          </div>
        ) : transactionData?.status === "CANCELED" ? (
          <div className="flex flex-col items-center gap-2 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-gray-500 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-400 uppercase">
              TRANSACTION CANCELED
            </p>
            <p className="text-sm text-white/50">Order has been canceled.</p>
          </div>
        ) : (
          <p className="text-lg text-white/60 italic">404 — STATUS NOT FOUND</p>
        )}
      </div>
    </main>
  );
}
