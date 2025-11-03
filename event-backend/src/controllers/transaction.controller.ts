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
        pricePerTicket: event.price,
        subtotal: event.price * quantity
      },
    });

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
      message: "Transaction created successfully"
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const uploadPayment = async(req:Request, res:Response)=>{
  try{
    const {transactionId,paymentProof} = req.body //Payment proof harus di multer
    await prisma.transaction.update({
      where: {id:transactionId},
      data:{
        paymentProof,
        status: "WAITING_CONFIRMATION"
      }
    })
  }catch(error){
    console.error("Error uploading payment proof", error);
    res.status(500).json({success: false, message: "Internal Server Error"})
  }
}

export const verifyPayment = async(req:Request, res:Response)=>{
  try{
    const { confirm,transactionId} = req.body

    prisma.transaction.update({
      where: { id : transactionId},
      data: {
        status: confirm ? "DONE" : "REJECTED"
      }
    })
  }catch(error){
    console.error("Error verifying payment", error);
    res.status(500).json({success: false, message: "Internal Server Error"})
  }
}