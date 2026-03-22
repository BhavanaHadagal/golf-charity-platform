import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    planType: {type: String, enum: ["monthly", "yearly"], required: true},
    status: {type: String, enum: ["active", "inactive", "cancelled"], default: "active"},
    amount: {type: Number},
    startDate: {type: Date, default: Date.now},
    renewalDate: {type: Date},
  },
  {
    timestamps: true,
  },
);

const subscriptionModel = mongoose.models.subscription || mongoose.model("subscription", subscriptionSchema);
export default subscriptionModel;
