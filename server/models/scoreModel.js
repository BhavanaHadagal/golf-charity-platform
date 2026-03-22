import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    score: {type: Number, required: true},
    date: {type: Date, default: Date.now},
  },
  {
    timestamps: true,
  }
);

const scoreModel = mongoose.models.score || mongoose.model("score", scoreSchema);
export default scoreModel;