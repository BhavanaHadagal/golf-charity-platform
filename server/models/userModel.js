import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["user", "admin"], default: "user" },
    selectedCharity: {type: mongoose.Schema.Types.ObjectId, ref: "charity"},
    charityPercentage: {type: Number, default: 10},
    subscription: {type: mongoose.Schema.Types.ObjectId, ref: "subscription"},
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;