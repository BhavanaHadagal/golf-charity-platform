import scoreModel from "../models/scoreModel.js";

// Add score
const addScore = async (req, res) => {
  try {
    const { score, date } = req.body;
    const userId = req.userId;

    if (score === undefined || score === null) {
      return res.json({
        success: false,
        message: "Score is required",
      });
    }

    const newScore = new scoreModel({
      user: userId,
      score,
      date: date || Date.now(),
    });

    await newScore.save();

    // Keep only latest 5 scores
    const allScores = await scoreModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    if (allScores.length > 5) {
      const scoresToDelete = allScores.slice(5);
      const idsToDelete = scoresToDelete.map((item) => item._id);

      await scoreModel.deleteMany({ _id: { $in: idsToDelete } });
    }

    res.json({
      success: true,
      message: "Score added successfully",
      score: newScore,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get my scores
const getMyScores = async (req, res) => {
  try {
    const userId = req.userId;

    const scores = await scoreModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      scores,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addScore, getMyScores };
