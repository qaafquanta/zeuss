export default function Dashboard(){
    return(
        <main className="flexfont-rethink text-white bg-[#071029] w-full min-h-screen">
            <nav className="flex flex-col h-screen bg-gray-900/40 w-1/5 gap-15 p-8 pt-25">
                <section className="">
                    <h1 className="font-semibold mb-5 text-lg text-gray-500">DASHBOARD</h1>
                    <div className="ml-10 flex flex-col gap-10 text-lg">
                        <a className="underline-animate">Events</a>
                        
                        <a>Statistics</a>
                        <a>Notification</a>
                        <a>Attendee List</a>
                    </div>
                </section>
                <section>
                    <h1 className="font-semibold mb-5 text-lg text-gray-500">EVENT</h1>
                    <div className="ml-10 flex flex-col gap-10 text-lg">
                        <a>Events</a>
                        <a href="/dashboard/create-event">Create Event</a>
                    </div>
                </section>
                <section>
                    <h1 className="font-semibold mb-5 text-lg text-gray-500">TRANSACTION</h1>
                    <div className="ml-10 flex flex-col gap-10 text-lg">
                        <a>Transaction Logs</a>
                        <a>Transaction Management</a>
                    </div>
                </section>
                
                
            </nav>
        </main>
    )
}