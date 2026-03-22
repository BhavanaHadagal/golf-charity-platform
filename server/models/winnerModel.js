import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    draw: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "draw",
    },

    matchType: {
      type: String,
      enum: ["3", "4", "5"],
    },

    winningAmount: {
      type: Number,
    },

    proofImage: {
      type: String,
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const winnerModel = mongoose.models.winner || mongoose.model("winner", winnerSchema);
export default winnerModel