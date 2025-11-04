import UpcomingEvents from "./eventsection/upcoming";

export default function Home() {
  return (
    <main className="font-rethink mt-16">
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/vbg.mp4" type="video/mp4" />
        </video>

        {/* Overlay gelap agar teks lebih terbaca */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Konten di atas video */}
        <div className="relative flex items-center justify-center h-full">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex gap-3 md:gap-5">
              <h1 className="text-4xl md:text-6xl font-bold text-white/80">
                Welcome To
              </h1>
              <h1 className="text-4xl md:text-6xl font-bold text-indigo-500">
                Zeuss
              </h1>
              <h1 className="text-4xl md:text-6xl font-bold text-white/80">
                .
              </h1>
            </div>
            <p className="font-bold text-white/80 text-center text-lg md:text-xl">
              We Don’t Just Plan Events — We Create Experiences!
            </p>
          </div>
        </div>
      </div>

      <UpcomingEvents />
    </main>
  );
}
