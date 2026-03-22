import winnerModel from "../models/winnerModel.js";

// Add winner (admin)
const addWinner = async (req, res) => {
  try {
    const { userId, drawId, matchType, winningAmount } = req.body;

    if (!userId || !drawId) {
      return res.json({
        success: false,
        message: "User ID and Draw ID are required",
      });
    }

    const winner = new winnerModel({
      user: userId,
      draw: drawId,
      matchType,
      winningAmount,
    });

    await winner.save();

    res.json({
      success: true,
      message: "Winner added successfully",
      winner,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get all winners (admin)
const listWinners = async (req, res) => {
  try {
    const winners = await winnerModel
      .find({})
      .populate("user")
      .populate("draw")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      winners,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get logged-in user's winnings
const getMyWinnings = async (req, res) => {
  try {
    const userId = req.userId;

    const winners = await winnerModel
      .find({ user: userId })
      .populate("draw")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      winnings: winners,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Verify winner (admin)
const verifyWinner = async (req, res) => {
  try {
    const { winnerId, verificationStatus } = req.body;

    if (!winnerId) {
      return res.json({
        success: false,
        message: "Winner ID is required",
      });
    }

    const winner = await winnerModel.findById(winnerId);

    if (!winner) {
      return res.json({
        success: false,
        message: "Winner not found",
      });
    }

    winner.verificationStatus = verificationStatus || "approved";
    await winner.save();

    res.json({
      success: true,
      message: "Winner verification updated successfully",
      winner,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Mark winner as paid (admin)
const markWinnerPaid = async (req, res) => {
  try {
    const { winnerId } = req.body;

    if (!winnerId) {
      return res.json({
        success: false,
        message: "Winner ID is required",
      });
    }

    const winner = await winnerModel.findById(winnerId);

    if (!winner) {
      return res.json({
        success: false,
        message: "Winner not found",
      });
    }

    winner.paymentStatus = "paid";
    await winner.save();

    res.json({
      success: true,
      message: "Winner marked as paid successfully",
      winner,
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
  addWinner,
  listWinners,
  getMyWinnings,
  verifyWinner,
  markWinnerPaid,
};