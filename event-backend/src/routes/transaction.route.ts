import { Router } from "express";
import { createTransaction, uploadPayment, verifyPayment } from "../controllers/transaction.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = Router();

router.post("/create", verifyToken, createTransaction);
router.post("/upload-payment",uploadPayment);
router.post("/verify-payment",verifyPayment)

export default router;
