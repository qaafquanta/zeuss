import type { Request, Response } from "express";

import prisma from "../prisma.js";
import { v4 as uuid } from "uuid";
import { cloudinary } from "../configs/cloudinary.config.js";
import { TransactionStatus } from "@prisma/client";

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
    const transaction = await prisma.transaction.create({
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

    // await prisma.transactionItem.create({
    //   data: {
    //     transactionId,
    //     quantity,
    //     pricePerTicket:20000
    //   },
    // });

    /* --------------------------- update jumlah seat --------------------------- */
    await prisma.event.update({
      where: { id: eventId },
      data: {
        availableSeats: event.availableSeats - quantity,
      },
    });
    //>>>>>>>>> implementasi cron job

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

/* -------------------------- Upload status payment ------------------------- */
export const uploadPayment = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.body;
    const paymentProof = req.file;
    if (!paymentProof) {
      return res.status(400).json({ message: "Profile picture not found" });
    }
    const uploadResult = await cloudinary.uploader.upload(paymentProof?.path);
    await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        paymentProof: uploadResult.secure_url,
        status: "WAITING_CONFIRMATION",
      },
    });
    res.status(201).json({
      success: true,
      message: "Payment proof successfully",
    });
  } catch (error) {
    console.error("Error uploading payment proof:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await prisma.transaction.findUnique({
      where: { id: String(id) },
    });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, data: event });
  } catch (error) {
    console.error("Error uploading payment proof:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/* ---------------------------- Voucher Dan Point --------------------------- */

export async function getDiscountByVoucher(req: Request, res: Response) {
  const vouchers = [
    { code: "DISKON10", discountAmount: 10000 },
    { code: "DISKON20", discountAmount: 20000 },
  ];

  const code = req.query.code;
  const voucher = vouchers.find((v) => v.code == code);

  if (!voucher)
    return res.status(404).json({ message: "Voucher tidak ditemukan" });

  return res.status(200).json({ voucher: voucher });
}
