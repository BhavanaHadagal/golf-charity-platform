import express from "express";
import {
  addCharity,
  listCharities,
  selectCharity,
  updateCharity,
  deleteCharity,
} from "../controllers/charityController.js";
import authUser from "../middleware/authUser.js";
import adminAuth from "../middleware/adminAuth.js";

const charityRouter = express.Router();

charityRouter.post("/add", adminAuth, addCharity);
charityRouter.get("/list", listCharities);
charityRouter.post("/select", authUser, selectCharity);
charityRouter.post("/update", adminAuth, updateCharity);
charityRouter.post("/delete", adminAuth, deleteCharity);

export default charityRouter;