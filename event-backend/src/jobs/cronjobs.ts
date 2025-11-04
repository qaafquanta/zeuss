import cron from "node-cron";
import prisma from "../prisma.js";

export default function expiringTransactions() {
  cron.schedule("*/10 * * * * *", async () => {
    console.log("Checking for expired orders...");
    const now = new Date();

    const expiredTransactions = await prisma.transaction.findMany({
      where: {
        status: "WAITING_PAYMENT",
        expiresAt: { lt: now },
      },
      include: {
        user: true,
        event: true,
        voucher: true,
        coupon: true,
      },
    });

    if (expiredTransactions.length === 0) return;

    console.log(`🔎 Found ${expiredTransactions.length} expired transactions`);

    for (const transaction of expiredTransactions) {
      try {
        console.log(`Expiring transaction ID: ${transaction.id}`);

        await prisma.$transaction(async (tx) => {
          // Update status transaction → EXPIRED
          await tx.transaction.update({
            where: { id: transaction.id },
            data: { status: "EXPIRED" },
          });

          // Kembalikan seat event (berdasarkan quantity item)
          const totalSeats = await tx.transactionItem.aggregate({
            where: { transactionId: transaction.id },
            _sum: { quantity: true },
          });

          const seatToReturn = totalSeats._sum.quantity || 1;

          await tx.event.update({
            where: { id: transaction.eventId },
            data: {
              availableSeats: {
                increment: seatToReturn,
              },
            },
          });

          // 3️⃣ Refund point user (jika pointUsed > 0)
          if (transaction.pointUsed > 0) {
            await tx.point.create({
              data: {
                userId: transaction.userId,
                amount: transaction.pointUsed,
                expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // valid 30 hari lagi
                isUsed: false,
              },
            });
            console.log(
              `Refunded ${transaction.pointUsed} points to user ${transaction.userId}`
            );
          }

          // Kembalikan voucher usage (jika voucher digunakan)
          if (transaction.voucherId) {
            await tx.voucher.update({
              where: { id: transaction.voucherId },
              data: {
                currentUsage: {
                  decrement: 1,
                },
              },
            });
            console.log(
              `Restored voucher usage for voucher ${transaction.voucherId}`
            );
          }

          //Kembalikan coupon usage (jika coupon digunakan)
          if (transaction.couponId) {
            await tx.coupon.update({
              where: { id: transaction.couponId },
              data: { isUsed: false },
            });
            console.log(`Restored coupon ${transaction.couponId}`);
          }
        });

        console.log(
          `Transaction ${transaction.id} successfully expired & refunded.`
        );
      } catch (err) {
        console.error(`Failed to expire transaction ${transaction.id}:`, err);
      }
    }
  });
}
