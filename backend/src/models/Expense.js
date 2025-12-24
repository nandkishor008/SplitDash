import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend",
      required: true
    },
    amount: { type: Number, required: true }
  },
  { _id: false }
);

const expenseSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    description: { type: String, required: true },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend",
      required: true
    },
    totalAmount: { type: Number, required: true },
    splitType: {
      type: String,
      enum: ["EQUAL", "EXACT", "PERCENT"],
      required: true
    },
    participants: [participantSchema],
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
