import mongoose from "mongoose";

const charitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const charityModel = mongoose.models.charity || mongoose.model("charity", charitySchema);
export default charityModel;
