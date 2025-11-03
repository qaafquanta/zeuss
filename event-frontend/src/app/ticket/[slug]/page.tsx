import Link from "next/link";

type Params = {
  slug: string;
};

type EventDetail = {
  id: string;
  organizerId?: string;
  name: string;
  description?: string;
  category?: string;
  location?: string;
  city?: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  price?: number;
  availableSeats?: number;
  totalSeats?: number;
  imageUrl?: string | null;
};

async function fetchEvent(id: string): Promise<EventDetail | null> {
  try {
    const res = await fetch(`http://localhost:8099/event/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    // backend expected shape: { success: true, data: {...} }
    return json?.data ?? null;
  } catch (err) {
    console.error("Failed fetching event detail:", err);
    return null;
  }
}

function formatIDR(value?: number) {
  if (value == null) return "Free";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date?: string) {
  if (!date) return "-";
  try {
    return new Date(date).toLocaleString("id-ID", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return date;
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  const res = await fetch(`http://localhost:8099/transaction/${slug}`);
  const tData = await res.json();
  const event = await fetchEvent(tData.data.eventId);

  console.log(event);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#05102a] via-[#071033] mt-16 to-[#0b0920] text-white py-12">
      {tData.data.status == "DONE" ? (
        <div className="container mx-auto px-6">
          {/* Breadcrumb / header small */}
          <div className="mb-6 text-sm text-white/60">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/event" className="hover:underline">
              Events
            </Link>{" "}
            / <span className="text-white/80">{event.name}</span>
          </div>

          {/* Main layout: left image, right card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: big poster / placeholder */}
            <div className="lg:col-span-6">
              <div className="w-full rounded-xl overflow-hidden shadow-2xl">
                {event.imageUrl ? (
                  // next/image could be used if image domains configured; use img fallback for simplicity
                  // If you prefer next/image, replace <img> with <Image ... />
                  <div
                    className="w-full h-[420px] bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-800 flex items-end"
                    style={{
                      backgroundImage: `url("${event?.imageUrl}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h1 className="text-2xl md:text-3xl font-semibold text-white">
                        {event.name}
                      </h1>
                      <p className="text-sm text-white/70 mt-1">
                        {formatDate(event.startDate)} •{" "}
                        {event.location ?? event.city ?? "-"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-[420px] bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-800 flex items-center justify-center">
                    <div className="text-center px-6">
                      <div className="text-3xl font-semibold mb-3">
                        {event.name}
                      </div>
                      <div className="text-sm text-white/70">
                        {formatDate(event.startDate)} •{" "}
                        {event.location ?? event.city ?? "-"}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* small details row */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <span className="inline-block bg-white/6 text-white/90 px-3 py-1 rounded-xl text-sm">
                    {event.category ?? "General"}
                  </span>
                  <span className="text-sm text-white/60">
                    Organizer: {event.organizerId ?? "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: glass detail card */}
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-white/10 bg-white/6 backdrop-blur-[14px] p-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {event.name}
                    </h2>
                    <p className="text-sm text-white/70 mb-4">
                      {event.location ?? event.city ?? "-"}
                    </p>

                    {/* long description */}
                    <div className="prose prose-invert max-w-none text-white/80 mb-4">
                      <p>
                        {event.description ?? "No long description available."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* extra meta */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <div className="font-medium text-white/90">When</div>
                    <div>
                      {formatDate(event.startDate)} -{" "}
                      {formatDate(event.endDate)}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-white/90">Venue</div>
                    <div>{event.address ?? "-"}</div>
                  </div>
                </div>

                {/* tag / category badges */}
                <div className="mt-6 flex flex-wrap gap-2 items-center">
                  <span className="text-xs bg-white/8 text-white/90 px-3 py-1 rounded-full">
                    #{event.category ?? "general"}
                  </span>
                  <span className="text-xs bg-white/8 text-white/90 px-3 py-1 rounded-full">
                    {event.city ?? event.location ?? "-"}
                  </span>
                  <span className="text-xs bg-white/8 text-white/90 px-3 py-1 rounded-full">
                    Seats: {event.availableSeats ?? 0}/{event.totalSeats ?? 0}
                  </span>
                </div>

                {/* small footer */}
                <div className="mt-6 text-sm text-white/60">
                  <div>Posted: {new Date().toLocaleDateString()}</div>
                  <div className="mt-2">
                    Need help?{" "}
                    <a href="regagiya@gmail.com" className="underline">
                      Contact support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <p className="text-2xl font-semibold text-gray-800">
            LU BELUM BAYAR KOCAK😅
          </p>
        </div>
      )}
    </main>
  );
}
