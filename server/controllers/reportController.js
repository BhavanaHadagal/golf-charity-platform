import userModel from "../models/userModel.js";
import subscriptionModel from "../models/subscriptionModel.js";
import charityModel from "../models/charityModel.js";
import drawModel from "../models/drawModel.js";
import winnerModel from "../models/winnerModel.js";

const getAdminReports = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalCharities = await charityModel.countDocuments();
    const totalDraws = await drawModel.countDocuments();
    const totalWinners = await winnerModel.countDocuments();

    const activeSubscriptions = await subscriptionModel.countDocuments({
      status: "active",
    });

    const subscriptions = await subscriptionModel.find({});
    const totalSubscriptionRevenue = subscriptions.reduce(
      (sum, item) => sum + (item.amount || 0),
      0
    );

    const winners = await winnerModel.find({});
    const totalPayout = winners.reduce(
      (sum, item) => sum + (item.winningAmount || 0),
      0
    );

    const charityDistribution = await userModel
      .find({ selectedCharity: { $ne: null } })
      .populate("selectedCharity", "name");

    const charityTotals = {};

    charityDistribution.forEach((user) => {
      const charityName = user.selectedCharity?.name || "Unknown";
      const percentage = user.charityPercentage || 0;

      if (!charityTotals[charityName]) {
        charityTotals[charityName] = 0;
      }

      charityTotals[charityName] += percentage;
    });

    res.json({
      success: true,
      reports: {
        totalUsers,
        totalCharities,
        totalDraws,
        totalWinners,
        activeSubscriptions,
        totalSubscriptionRevenue,
        totalPayout,
        charityTotals,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { getAdminReports };