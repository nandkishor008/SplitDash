import express from "express";
import {
  getGroupBalances,
  recordPayment
} from "../controllers/balanceController.js";

const router = express.Router();

router.get("/group/:groupId", getGroupBalances);

router.post("/payment", recordPayment);

export default router;
