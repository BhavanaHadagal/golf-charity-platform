import subscriptionModel from "../models/subscriptionModel.js";
import userModel from "../models/userModel.js";

const createSubscription = async (req, res) => {
  try {
    const { planType, amount } = req.body;
    const userId = req.userId;

    if (!planType) {
      return res.json({
        success: false,
        message: "Plan type is required",
      });
    }

    if (!["monthly", "yearly"].includes(planType)) {
      return res.json({
        success: false,
        message: "Invalid plan type",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    let renewalDate = new Date();

    if (planType === "monthly") {
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    } else {
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    }

    const subscription = new subscriptionModel({
      user: userId,
      planType,
      status: "active",
      amount: amount || (planType === "monthly" ? 99 : 999),
      renewalDate,
    });

    await subscription.save();

    await userModel.findByIdAndUpdate(userId, {
      subscription: subscription._id,
    });

    res.json({
      success: true,
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getMySubscription = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId).populate("subscription");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      subscription: user.subscription,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const cancelSubscription = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (!user || !user.subscription) {
      return res.json({
        success: false,
        message: "No subscription found",
      });
    }

    const subscription = await subscriptionModel.findByIdAndUpdate(
      user.subscription,
      { status: "cancelled" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Subscription cancelled successfully",
      subscription,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: list all subscriptions
const listAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionModel
      .find({})
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: update subscription status
const updateSubscriptionStatus = async (req, res) => {
  try {
    const { subscriptionId, status } = req.body;

    if (!subscriptionId || !status) {
      return res.json({
        success: false,
        message: "Subscription ID and status are required",
      });
    }

    if (!["active", "inactive", "cancelled"].includes(status)) {
      return res.json({
        success: false,
        message: "Invalid status",
      });
    }

    const subscription = await subscriptionModel.findByIdAndUpdate(
      subscriptionId,
      { status },
      { new: true }
    );

    if (!subscription) {
      return res.json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.json({
      success: true,
      message: "Subscription status updated successfully",
      subscription,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createSubscription,
  getMySubscription,
  cancelSubscription,
  listAllSubscriptions,
  updateSubscriptionStatus,
};