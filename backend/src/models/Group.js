import mongoose from "mongoose";
import crypto from "crypto";

const groupSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friend",
        required: true,
      },
    ],

    // 🔗 Share system
    shareToken: {
      type: String,
      default: () => crypto.randomBytes(16).toString("hex"),
      index: true,
    },

    shareEnabled: {
      type: Boolean,
      default: true,
    },

    sharePermission: {
      type: String,
      enum: ["viewer", "editor"],
      default: "editor",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Group", groupSchema);
