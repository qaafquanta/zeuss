"use client";
import React, { useState, useEffect } from "react";

export default function TransactionStatus({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

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
    const res = await fetch(`http://localhost:8099/transaction/${slug}`);
    const tData = await res.json();
    console.log(tData);
    setTransactionData(tData?.data);
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
      console.log("reset data form berjalan");
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
    handleRefresh(); // dipanggil pertama kali
    console.log("use effect berjalan");
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#0b0920] text-white flex flex-col justify-center items-center px-6 py-16">
      <div className="max-w-lg w-full bg-white/5 p-8 rounded-2xl shadow-xl border border-white/10 text-center">
        <h1 className="text-3xl font-bold mb-6 tracking-wide">
          Transaction Status
        </h1>

        {transactionData?.status === "WAITING_PAYMENT" ? (
          <div className="space-y-6">
            <p className="text-white/70 text-lg">Upload transaction file</p>

            {/* Upload Box */}
            <div className="border-2 border-dashed border-indigo-400/40 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
              />

              {preview && (
                <div className="mt-4">
                  <p className="text-sm text-white/60 mb-2">Preview:</p>
                  <img
                    src={preview}
                    alt="Bukti Pembayaran"
                    className="rounded-lg border border-white/20 max-h-64 mx-auto"
                  />
                </div>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white text-lg transition 
                ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:scale-[1.02]"
                }`}
            >
              {loading ? "Mengunggah..." : "Upload Proof of Payment"}
            </button>
          </div>
        ) : transactionData?.status === "WAITING_CONFIRMATION" ? (
          <p className="text-lg text-yellow-400">
            PAYMENT PROOF SUBMITTED — WAITING CONFIRMATION
          </p>
        ) : transactionData?.status === "DONE" ? (
          <div className="flex flex-col gap-5 justify-center items-center">
            <p className="text-lg text-green-400">
              PAYMENT PROOF APPROVED, TRANSACTION DONE
            </p>
            <a
              href={`/ticket/${slug}`}
              className="text-md text-white bg-white/50 rounded-lg px-5 py-2 hover:bg-white/80"
            >
              GET YOUR TICKET
            </a>
          </div>
        ) : transactionData?.status === "REJECTED" ? (
          <p className="text-lg text-red-400">PAYMENT PROOF REJECTED</p>
        ) : transactionData?.status === "EXPIRED" ? (
          <p className="text-lg text-orange-400">TRANSACTION EXPIRED</p>
        ) : transactionData?.status === "CANCELED" ? (
          <p className="text-lg text-gray-400">TRANSACTION CANCELED</p>
        ) : (
          <p className="text-lg text-white/60">404 NOT FOUND</p>
        )}
      </div>
    </main>
  );
}
