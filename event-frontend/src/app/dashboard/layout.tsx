import { Children } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex font-rethink text-white bg-gradient-to-b from-[#05102a] via-[#071033] to-[#0b0920] w-full min-h-screen">
      <nav className="flex flex-col min-h-screen bg-gray-900/20 shadow-lg backdrop-blur-lg w-1/5 gap-15 p-8 pt-25">
        <section className="">
          <h1 className="font-semibold mb-5 text-lg text-gray-500">
            DASHBOARD
          </h1>
          <div className="ml-10 flex flex-col gap-10 text-base">
            <a className="underline-animate">Events</a>
            <a className="underline-animate">Statistics</a>
            <a className="underline-animate">Notification</a>
            <a className="underline-animate">Attendee List</a>
          </div>
        </section>
        <section>
          <h1 className="font-semibold mb-5 text-lg text-gray-500">EVENT</h1>
          <div className="ml-10 flex flex-col gap-10 text-base">
            <a className="underline-animate" href="/dashboard/my-events">
              My Events
            </a>
            <a className="underline-animate" href="/dashboard/create-event">
              Create Event
            </a>
          </div>
        </section>
        <section>
          <h1 className="font-semibold mb-5 text-lg text-gray-500">
            TRANSACTION
          </h1>
          <div className="ml-10 flex flex-col gap-10 text-base">
            <a className="underline-animate">Transaction Logs</a>
            <a className="underline-animate" href="/dashboard/confirm-payment">
              Confirm Payment
            </a>
          </div>
        </section>
      </nav>
      {children}
    </main>
  );
}
