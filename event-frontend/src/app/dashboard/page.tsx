export default function Dashboard() {
  return (
    <main className="flex font-rethink text-black bg-white mt-15 w-full min-h-screen">
      {/* Sidebar */}
      <nav
        className="
          flex flex-col 
          border-black/20 border-r-2 
          p-6 sm:p-8 
          w-full sm:w-1/3 md:w-1/4 lg:w-1/5 
          min-h-screen
          transition-all
          bg-white
        "
      >
        {/* DASHBOARD SECTION */}
        <section className="mb-10">
          <h1 className="font-semibold mb-4 text-base md:text-lg opacity-60">
            DASHBOARD
          </h1>
          <div className="ml-4 flex flex-col gap-4 md:gap-6 text-base md:text-lg">
            <a href="#" className="underline-animate hover:text-indigo-600">
              Events
            </a>
            <a href="#" className="underline-animate hover:text-indigo-600">
              Statistics
            </a>
            <a href="#" className="underline-animate hover:text-indigo-600">
              Notification
            </a>
            <a href="#" className="underline-animate hover:text-indigo-600">
              Attendee List
            </a>
          </div>
        </section>

        {/* EVENT SECTION */}
        <section className="mb-10">
          <h1 className="font-semibold mb-4 text-base md:text-lg opacity-60">
            EVENT
          </h1>
          <div className="ml-4 flex flex-col gap-4 md:gap-6 text-base md:text-lg">
            <a href="#" className="underline-animate hover:text-indigo-600">
              Events
            </a>
            <a
              href="/dashboard/create-event"
              className="underline-animate hover:text-indigo-600"
            >
              Create Event
            </a>
          </div>
        </section>

        {/* TRANSACTION SECTION */}
        <section>
          <h1 className="font-semibold mb-4 text-base md:text-lg opacity-60">
            TRANSACTION
          </h1>
          <div className="ml-4 flex flex-col gap-4 md:gap-6 text-base md:text-lg">
            <a href="#" className="underline-animate hover:text-indigo-600">
              Transaction Logs
            </a>
            <a href="#" className="underline-animate hover:text-indigo-600">
              Transaction Management
            </a>
          </div>
        </section>
      </nav>

      {/* Content area (kosong untuk sekarang) */}
      <section
        className="
          flex-1 
          p-6 sm:p-10 
          bg-gray-50 
          text-gray-800
        "
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Welcome to Dashboard
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Select a menu from the sidebar to begin.
        </p>
      </section>
    </main>
  );
}
