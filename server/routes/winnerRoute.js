import express from "express";
import {
  addWinner,
  listWinners,
  getMyWinnings,
  verifyWinner,
  markWinnerPaid,
} from "../controllers/winnerController.js";
import authUser from "../middleware/authUser.js";
import adminAuth from "../middleware/adminAuth.js";

const winnerRouter = express.Router();

winnerRouter.post("/add", adminAuth, addWinner);
winnerRouter.get("/list", adminAuth, listWinners);
winnerRouter.get("/my", authUser, getMyWinnings);
winnerRouter.post("/verify", adminAuth, verifyWinner);
winnerRouter.post("/pay", adminAuth, markWinnerPaid);

export default winnerRouter;