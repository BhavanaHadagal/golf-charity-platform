import express from "express";
import { addScore, getMyScores } from "../controllers/scoreController.js";
import authUser from "../middleware/authUser.js";

const scoreRouter = express.Router();

scoreRouter.post("/add", authUser, addScore);
scoreRouter.get("/my", authUser, getMyScores);

export default scoreRouter;