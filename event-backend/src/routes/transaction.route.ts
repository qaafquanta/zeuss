import { Router } from "express";
import {
  createTransaction,
  uploadPayment,
  getTransactionById,
  getPaymentProofByOrganizerIdFromCookies,
  rejectPayment,
  acceptPayment
} from "../controllers/transaction.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
import { fileUpload } from "../middlewares/file-upload.js";

const router = Router();

router.get("/proof",verifyToken,getPaymentProofByOrganizerIdFromCookies)
router.post("/create-transaction", verifyToken, createTransaction);
router.get("/:id", getTransactionById);
router
  .route("/upload-payment")
  .post(fileUpload.single("paymentProof"), uploadPayment);
router.post("/reject",rejectPayment)
router.post("/accept",acceptPayment)

export default router;
