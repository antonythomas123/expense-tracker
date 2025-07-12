import express from "express";
import {
  addTransactions,
  deleteTransactionById,
  getTransactionByUserId,
  getTransactionSummaryByUserId,
} from "../controllers/transactions.controller.js";

const router = express.Router();

router.get("/:userId", getTransactionByUserId);
router.get("/summary/:userId", getTransactionSummaryByUserId);
router.post("/", addTransactions);
router.delete("/:id", deleteTransactionById);

export default router;
