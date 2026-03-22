import charityModel from "../models/charityModel.js";
import userModel from "../models/userModel.js";

const addCharity = async (req, res) => {
  try {
    const { name, description, image, category, featured } = req.body;

    if (!name) {
      return res.json({
        success: false,
        message: "Charity name is required",
      });
    }

    const charity = new charityModel({
      name,
      description,
      image,
      category,
      featured,
    });

    await charity.save();

    res.json({
      success: true,
      message: "Charity added successfully",
      charity,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const listCharities = async (req, res) => {
  try {
    const charities = await charityModel.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      charities,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const selectCharity = async (req, res) => {
  try {
    const { charityId, charityPercentage } = req.body;
    const userId = req.userId;

    if (!charityId) {
      return res.json({
        success: false,
        message: "Charity ID is required",
      });
    }

    const charity = await charityModel.findById(charityId);

    if (!charity) {
      return res.json({
        success: false,
        message: "Charity not found",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      selectedCharity: charityId,
      charityPercentage: charityPercentage || 10,
    });

    res.json({
      success: true,
      message: "Charity selected successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateCharity = async (req, res) => {
  try {
    const { charityId, name, description, image, category, featured } = req.body;

    const charity = await charityModel.findByIdAndUpdate(
      charityId,
      { name, description, image, category, featured },
      { new: true }
    );

    if (!charity) {
      return res.json({
        success: false,
        message: "Charity not found",
      });
    }

    res.json({
      success: true,
      message: "Charity updated successfully",
      charity,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCharity = async (req, res) => {
  try {
    const { charityId } = req.body;

    const charity = await charityModel.findByIdAndDelete(charityId);

    if (!charity) {
      return res.json({
        success: false,
        message: "Charity not found",
      });
    }

    res.json({
      success: true,
      message: "Charity deleted successfully",
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
  addCharity,
  listCharities,
  selectCharity,
  updateCharity,
  deleteCharity,
};