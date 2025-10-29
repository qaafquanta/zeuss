"use client";

export default function ButtonEventDetail() {
  return (
    <>
      <button
        onClick={() => {
          // client-side copy link (this will run client JS because onClick only executes in browser)
          if (typeof window !== "undefined") {
            void navigator.clipboard?.writeText(window.location.href);
            // simple visual feedback
            // for server components this doesn't run on server; it's fine here as inline handler
            alert("Link copied to clipboard");
          }
        }}
        className="px-3 py-2 rounded-lg bg-white/6 text-white/90 border border-white/6"
      >
        Copy Link
      </button>
      ;
    </>
  );
}
