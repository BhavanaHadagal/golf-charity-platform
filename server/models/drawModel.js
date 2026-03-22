import mongoose from "mongoose";

const drawSchema = new mongoose.Schema(
{
    month: Number,
    year: Number,

    drawNumbers: {
      type: [Number],
      default: [],
    },

    drawType: {
      type: String,
      enum: ["random", "algorithmic"],
      default: "random",
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    prizePool: {
      type: Number,
      default: 0,
    },

    publishedAt: Date,
  },
  {
    timestamps: true,
  }
);

const drawModel = mongoose.models.draw || mongoose.model("draw", drawSchema);
export default drawModel