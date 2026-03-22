import express from "express";
import {
  createSubscription,
  getMySubscription,
  cancelSubscription,
  listAllSubscriptions,
  updateSubscriptionStatus,
} from "../controllers/subscriptionController.js";
import authUser from "../middleware/authUser.js";
import adminAuth from "../middleware/adminAuth.js";

const subscriptionRouter = express.Router();

subscriptionRouter.post("/create", authUser, createSubscription);
subscriptionRouter.get("/my", authUser, getMySubscription);
subscriptionRouter.post("/cancel", authUser, cancelSubscription);

subscriptionRouter.get("/list", adminAuth, listAllSubscriptions);
subscriptionRouter.post("/update-status", adminAuth, updateSubscriptionStatus);

export default subscriptionRouter;