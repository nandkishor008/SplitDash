import express from "express";
import {
  createExpense,
  getExpensesByGroup,
  deleteExpense
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", createExpense);
router.get("/group/:groupId", getExpensesByGroup);
router.delete("/:id", deleteExpense);

export default router;
