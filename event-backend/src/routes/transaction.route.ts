import { Router } from "express";
import { createTransaction } from "../controllers/transaction.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = Router();

router.post("/transaction", verifyToken, createTransaction);

export default router;
