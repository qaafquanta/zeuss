import prisma from "../prisma.js";
import type { Request, Response } from "express";

export const getUserTotalPoint = async (req: Request, res: Response) => {
  try {
    const userId  = (req as any).user.id;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Ambil semua point milik user yang belum expired dan belum digunakan
    const validPoints = await prisma.point.findMany({
      where: {
        userId,
        isUsed: false,
        expiresAt: {
          gt: new Date(), // masih berlaku
        },
      },
      select: {
        amount: true,
      },
    });

    // Hitung totalnya
    const totalPoint = validPoints.reduce((sum, p) => sum + p.amount, 0);

    return res.status(200).json({
      userId,
      totalPoint,
    });
  } catch (error) {
    console.error("Error getting user total points:", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};