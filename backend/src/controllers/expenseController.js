import Expense from "../models/Expense.js";
import Group from "../models/Group.js";
import { calculateSplits } from "../utils/calculateSplits.js";

export const createExpense = async (req, res) => {
  try {
    const {
      groupId,
      description,
      paidBy,
      totalAmount,
      splitType,
      participantIds,
      exactAmounts,
      percentages
    } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const splits = calculateSplits({
      splitType,
      totalAmount,
      participantIds,
      exactAmounts: exactAmounts || [],
      percentages: percentages || []
    });

    const expense = await Expense.create({
      group: groupId,
      description,
      paidBy,
      totalAmount,
      splitType,
      participants: splits
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getExpensesByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const expenses = await Expense.find({ group: groupId })
      .populate("paidBy", "name")
      .populate("participants.user", "name")
      .sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

