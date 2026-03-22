import drawModel from "../models/drawModel.js";
import scoreModel from "../models/scoreModel.js";

// Create draw
const createDraw = async (req, res) => {
  try {
    const { month, year, drawNumbers, drawType, prizePool, status } = req.body;

    if (!month || !year) {
      return res.json({
        success: false,
        message: "Month and year are required",
      });
    }

    const draw = new drawModel({
      month,
      year,
      drawNumbers: drawNumbers || [],
      drawType: drawType || "random",
      prizePool: prizePool || 0,
      status: status || "pending",
      publishedAt: status === "completed" ? new Date() : null,
    });

    await draw.save();

    res.json({
      success: true,
      message: "Draw created successfully",
      draw,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// List draws
const listDraws = async (req, res) => {
  try {
    const draws = await drawModel.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      draws,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update draw
const updateDraw = async (req, res) => {
  try {
    const { drawId, month, year, drawNumbers, drawType, prizePool, status } =
      req.body;

    if (!drawId) {
      return res.json({
        success: false,
        message: "Draw ID is required",
      });
    }

    const updatedDraw = await drawModel.findByIdAndUpdate(
      drawId,
      {
        month,
        year,
        drawNumbers,
        drawType,
        prizePool,
        status,
        publishedAt: status === "completed" ? new Date() : null,
      },
      { new: true }
    );

    if (!updatedDraw) {
      return res.json({
        success: false,
        message: "Draw not found",
      });
    }

    res.json({
      success: true,
      message: "Draw updated successfully",
      draw: updatedDraw,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Delete draw
const deleteDraw = async (req, res) => {
  try {
    const { drawId } = req.body;

    if (!drawId) {
      return res.json({
        success: false,
        message: "Draw ID is required",
      });
    }

    const draw = await drawModel.findById(drawId);

    if (!draw) {
      return res.json({
        success: false,
        message: "Draw not found",
      });
    }

    await drawModel.findByIdAndDelete(drawId);

    res.json({
      success: true,
      message: "Draw deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Run draw
const runDraw = async (req, res) => {
  try {
    const { drawId } = req.body;

    if (!drawId) {
      return res.json({
        success: false,
        message: "Draw ID is required",
      });
    }

    const draw = await drawModel.findById(drawId);

    if (!draw) {
      return res.json({
        success: false,
        message: "Draw not found",
      });
    }

    // generate 5 random numbers between 1 and 45
    const numbers = new Set();
    while (numbers.size < 5) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    draw.drawNumbers = Array.from(numbers);
    draw.status = "completed";
    draw.publishedAt = new Date();

    await draw.save();

    res.json({
      success: true,
      message: "Draw run successfully",
      draw,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// SIMULATE DRAW
const simulateDraw = async (req, res) => {
  try {
    // generate 5 random numbers
    const numbers = new Set();
    while (numbers.size < 5) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const drawNumbers = Array.from(numbers);

    // get all scores
    const scores = await scoreModel.find({}).populate("user");

    let simulatedWinners = [];

    scores.forEach((scoreDoc) => {
      const userNumbers = scoreDoc.numbers || []; // assuming array

      const matches = userNumbers.filter((n) =>
        drawNumbers.includes(n)
      ).length;

      if (matches >= 3) {
        simulatedWinners.push({
          user: scoreDoc.user?.email,
          matches,
        });
      }
    });

    res.json({
      success: true,
      drawNumbers,
      winners: simulatedWinners,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { createDraw, listDraws, updateDraw, deleteDraw, runDraw, simulateDraw };