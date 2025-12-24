import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Friend", friendSchema);
