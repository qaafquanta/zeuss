import { Router } from "express";
import {
  createTransaction,
  uploadPayment,
  getTransactionById,
  getDiscountByVoucher,
} from "../controllers/transaction.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
import { fileUpload } from "../middlewares/file-upload.js";

const router = Router();

router.post("/create-transaction", verifyToken, createTransaction);
router.post("/voucher", getDiscountByVoucher);
router.get("/:id", getTransactionById);
router
  .route("/upload-payment")
  .post(fileUpload.single("paymentProof"), uploadPayment);

export default router;
