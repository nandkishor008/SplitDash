import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: { type: String, required: true },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friend",
        required: true
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Group", groupSchema);
