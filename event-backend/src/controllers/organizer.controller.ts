import prisma from "../prisma.js";
import type { Request, Response } from "express";

export const getOrganizerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Cek apakah organizer ada dan rolenya ORGANIZER
    const organizer = await prisma.user.findUnique({
      where: { id },
    });

    if (!organizer || organizer.role !== "ORGANIZER") {
      return res.status(404).json({ message: "Organizer not found" });
    }

    // Ambil semua event yang dibuat oleh organizer ini
    const events = await prisma.event.findMany({
      where: { organizerId: id },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        startDate: true,
        endDate: true,
        city: true,
        availableSeats: true,
        totalSeats: true,
      },
      orderBy: { startDate: "desc" },
    });

    // Pisahkan event berdasarkan status waktu (upcoming / past)
    const now = new Date();
    const upcomingEvents = events.filter((e) => new Date(e.startDate) > now);
    const pastEvents = events.filter((e) => new Date(e.startDate) <= now);

    return res.json({
      organizer,
      upcomingEvents,
      pastEvents,
      events, // kalau frontend mau ambil semua gabung
    });
  } catch (error) {
    console.error("Error fetching organizer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
