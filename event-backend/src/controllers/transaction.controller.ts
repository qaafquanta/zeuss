import type { Request, Response } from "express";
import prisma from "../prisma.js";
import { v4 as uuid } from "uuid";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { eventId, quantity } = req.body;

    if (!eventId || !quantity) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    if (event.availableSeats < quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough seats available" });
    }

    const totalPrice = event.price * quantity;

    /* -------------------------- Simpan transaksi baru ------------------------- */
    function getTwoHoursFromNow(): Date {
      const now = new Date();
      const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      return twoHoursLater;
    }

    const pointUsed = 0;
    const discountAmount = 0;
    const userId = (req as any).user.id;
    const transactionId = uuid();
    await prisma.transaction.create({
      data: {
        id: transactionId,
        userId,
        eventId,
        status: "WAITING_PAYMENT",
        totalAmount: totalPrice,
        pointUsed,
        discountAmount,
        finalAmount: totalPrice * (1 - discountAmount) - pointUsed,
        paymentProof: "", //nanti ini dihapus setelah prisma schema paymentProof dibuat opsional
        expiresAt: getTwoHoursFromNow(),
      },
    });

    await prisma.transactionItem.create({
      data: {
        transactionId,
        quantity,
        pricePerTicket,
      },
    });

    /* --------------------------- update jumlah seat --------------------------- */
    await prisma.event.update({
      where: { id: eventId },
      data: {
        availableSeats: event.availableSeats - quantity,
      },
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
